import fs from 'fs'
import path from 'path'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { stringToPath as stringToHdPath } from '@cosmjs/crypto'
import { DirectSecp256k1HdWallet, EncodeObject } from '@cosmjs/proto-signing'
import chalk from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'

import {
  chainQueries,
  makeGetSignerOptions,
  makeReactQueryClient,
} from '@dao-dao/state'
import { ContractVersion, SupportedChainConfig } from '@dao-dao/types'
import { MsgExec } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/tx'
import { MsgStoreCode } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import {
  CHAIN_GAS_MULTIPLIER,
  findEventsAttributeValue,
  getChainForChainId,
  getRpcForChainId,
  gzipCompress,
} from '@dao-dao/utils'

import { instantiateContract } from './utils'

const { log } = console

const { parsed: { MNEMONIC, DAO_CONTRACTS_DIR, POLYTONE_CONTRACTS_DIR } = {} } =
  dotenv.config()

if (!MNEMONIC) {
  log(chalk.red('MNEMONIC not set'))
  process.exit(1)
}
if (!DAO_CONTRACTS_DIR) {
  log(chalk.red('DAO_CONTRACTS_DIR not set'))
  process.exit(1)
}
if (!POLYTONE_CONTRACTS_DIR) {
  log(chalk.red('POLYTONE_CONTRACTS_DIR not set'))
  process.exit(1)
}

enum Mode {
  Dao = 'dao',
  Polytone = 'polytone',
  Factory = 'factory',
}

const program = new Command()
program.requiredOption('-c, --chain <ID>', 'chain ID')
program.option(
  '-m, --mode <mode>',
  'deploy mode (dao = deploy DAO contracts and instantiate admin factory, polytone = deploy Polytone contracts, factory = instantiate admin factory)',
  'dao'
)
program.option(
  '-a, --authz <granter>',
  'upload contracts via authz exec as this granter'
)
program.option(
  '-x, --exclude <substrings>',
  'ignore contracts containing any of these comma-separated substrings (e.g. cw721)'
)

program.parse(process.argv)
const { chain: chainId, mode, authz, exclude: _exclude } = program.opts()

const exclude: string[] | undefined = _exclude?.split(',')

if (!Object.values(Mode).includes(mode)) {
  log(
    chalk.red('Invalid mode. Must be one of: ' + Object.values(Mode).join(', '))
  )
  process.exit(1)
}

const codeIdMap: Record<string, number | undefined> = {}

const main = async () => {
  const queryClient = await makeReactQueryClient()

  const {
    chain_name: chainName,
    bech32_prefix: bech32Prefix,
    network_type: networkType,
    slip44,
  } = getChainForChainId(chainId)

  await queryClient.prefetchQuery(chainQueries.dynamicGasPrice({ chainId }))

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
    prefix: bech32Prefix,
    hdPaths: [stringToHdPath(`m/44'/${slip44}'/0'/0/0`)],
  })
  const sender = (await signer.getAccounts())[0].address

  log()
  log(
    chalk.underline(
      `Deploying on ${chainName} from ${sender}${
        authz ? ` as ${authz}` : ''
      }...`
    )
  )

  const client = await SigningCosmWasmClient.connectWithSigner(
    getRpcForChainId(chainId),
    signer,
    makeGetSignerOptions(queryClient)(chainName)
  )

  const uploadContract = async ({
    id,
    file,
    prefixLength,
  }: {
    id: string
    file: string
    prefixLength: number
  }) => {
    const wasmData = new Uint8Array(fs.readFileSync(file).buffer)
    const compressedWasmData = await gzipCompress(wasmData)

    const msgStoreCode = MsgStoreCode.fromPartial({
      sender: authz || sender,
      wasmByteCode: compressedWasmData,
      instantiatePermission: {
        permission: AccessType.Everybody,
        addresses: [],
      },
    })

    const msg: EncodeObject = authz
      ? {
          typeUrl: MsgExec.typeUrl,
          value: MsgExec.fromPartial({
            grantee: sender,
            msgs: [MsgStoreCode.toProtoMsg(msgStoreCode)],
          }),
        }
      : {
          typeUrl: MsgStoreCode.typeUrl,
          value: msgStoreCode,
        }

    let transactionHash
    try {
      transactionHash = await client.signAndBroadcastSync(
        sender,
        [msg],
        CHAIN_GAS_MULTIPLIER
      )
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes('authorization not found')
      ) {
        log(
          chalk.red(
            `[${id}.CODE_ID]${' '.repeat(
              prefixLength - id.length - 10
            )}no authz permission granted`
          )
        )
        process.exit(1)
      } else {
        log(
          chalk.red(
            `[${id}.CODE_ID]${' '.repeat(prefixLength - id.length - 10)}failed`
          )
        )
        throw err
      }
    }

    log(
      chalk.greenBright(
        `[${id}.TX]${' '.repeat(
          prefixLength - id.length - 5
        )}${transactionHash}`
      )
    )

    // Poll for TX.
    let events
    let tries = 15
    while (tries > 0) {
      try {
        events = (await client.getTx(transactionHash))?.events
        if (events) {
          break
        }
      } catch {}

      tries--
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    if (!events) {
      log(
        chalk.red(
          `[${id}.CODE_ID]${' '.repeat(
            prefixLength - id.length - 10
          )}TX not found`
        )
      )
      process.exit(1)
    }

    const codeId = findEventsAttributeValue(events, 'store_code', 'code_id')

    if (!codeId) {
      log(
        chalk.red(
          `[${id}.CODE_ID]${' '.repeat(prefixLength - id.length - 10)}not found`
        )
      )
      process.exit(1)
    }

    log(
      chalk.green(
        `[${id}.CODE_ID]${' '.repeat(prefixLength - id.length - 10)}${codeId}`
      )
    )

    return Number(codeId)
  }

  log()

  // Upload polytone contracts only.
  if (mode === Mode.Polytone) {
    const contracts = [
      'polytone_listener',
      'polytone_note',
      'polytone_proxy',
      'polytone_voice',
    ]

    for (const contract of contracts) {
      const file = path.join(POLYTONE_CONTRACTS_DIR, `${contract}.wasm`)

      await uploadContract({
        id: contract,
        file,
        prefixLength: 32,
      })
    }

    log()
    process.exit(0)
  }

  let consolePrefixLength = 32

  // Upload DAO contracts.
  if (mode === Mode.Dao) {
    // List files in the contracts directory.
    const contracts = fs
      .readdirSync(DAO_CONTRACTS_DIR)
      .filter((file) => file.endsWith('.wasm'))
      .sort()

    // Set console prefix length to the max file length plus space for brackets
    // and longest ID suffix (CONTRACT).
    consolePrefixLength = Math.max(...contracts.map((file) => file.length)) + 10

    for (const contract of contracts) {
      const id = contract.slice(0, -5)
      if (exclude?.some((substring) => id.includes(substring))) {
        continue
      }

      const file = path.join(DAO_CONTRACTS_DIR, contract)

      if (!(id in codeIdMap)) {
        codeIdMap[id] = await uploadContract({
          id,
          file,
          prefixLength: consolePrefixLength,
        })
      } else {
        log(
          chalk.green(
            `[${id}.CODE_ID]${' '.repeat(
              consolePrefixLength - id.length - 10
            )}${codeIdMap[id]}`
          )
        )
      }
    }
  }

  // Upload just admin factory if needed.
  else if (mode === Mode.Factory && !codeIdMap['cw_admin_factory']) {
    const file = path.join(DAO_CONTRACTS_DIR, 'cw_admin_factory.wasm')
    if (!fs.existsSync(file)) {
      log(chalk.red('cw_admin_factory.wasm not found'))
      process.exit(1)
    }

    codeIdMap['cw_admin_factory'] = await uploadContract({
      id: 'cw_admin_factory',
      file,
      prefixLength: consolePrefixLength,
    })
  }

  // Instantiate admin factory.
  const cwAdminFactoryCodeId = codeIdMap['cw_admin_factory']
  if (!cwAdminFactoryCodeId) {
    log(chalk.red('cw_admin_factory.CODE_ID not found'))
    process.exit(1)
  }

  const adminFactoryAddress = await instantiateContract({
    client,
    sender,
    chainId,
    id: 'cw_admin_factory',
    codeId: cwAdminFactoryCodeId,
    msg: {},
    label: 'daodao_admin_factory',
    prefixLength: consolePrefixLength,
  })

  log()
  log(chalk.green('Done! UI config entry:'))

  const mainnet = networkType === 'mainnet'
  const explorerUrlDomain = mainnet ? 'ping.pub' : 'testnet.ping.pub'

  const config: SupportedChainConfig = {
    chainId,
    name: chainName,
    mainnet,
    accentColor: 'ACCENT_COLOR',
    factoryContractAddress: adminFactoryAddress,
    explorerUrlTemplates: {
      tx: `https://${explorerUrlDomain}/${chainName}/tx/REPLACE`,
      gov: `https://${explorerUrlDomain}/${chainName}/gov`,
      govProp: `https://${explorerUrlDomain}/${chainName}/gov/REPLACE`,
      wallet: `https://${explorerUrlDomain}/${chainName}/account/REPLACE`,
    },
    codeIdsVersion: ContractVersion.Unknown,
    codeIds: {
      Cw1Whitelist: codeIdMap['cw1_whitelist'] ?? -1,
      Cw4Group: codeIdMap['cw4_group'] ?? -1,
      Cw721Base: codeIdMap['cw721_base'] ?? -1,
      CwPayrollFactory: codeIdMap['cw_payroll_factory'] ?? -1,
      CwTokenSwap: codeIdMap['cw_token_swap'] ?? -1,
      CwTokenfactoryIssuerMain: codeIdMap['cw_tokenfactory_issuer'] ?? -1,
      CwVesting: codeIdMap['cw_vesting'] ?? -1,
      DaoCore: codeIdMap['dao_dao_core'] ?? -1,
      DaoMigrator: -1,
      DaoPreProposeApprovalSingle:
        codeIdMap['dao_pre_propose_approval_single'] ?? -1,
      DaoPreProposeApprover: codeIdMap['dao_pre_propose_approver'] ?? -1,
      DaoPreProposeMultiple: codeIdMap['dao_pre_propose_multiple'] ?? -1,
      DaoPreProposeSingle: codeIdMap['dao_pre_propose_single'] ?? -1,
      DaoProposalMultiple: codeIdMap['dao_proposal_multiple'] ?? -1,
      DaoProposalSingle: codeIdMap['dao_proposal_single'] ?? -1,
      DaoRewardsDistributor: codeIdMap['dao_rewards_distributor'] ?? -1,
      DaoVotingCw4: codeIdMap['dao_voting_cw4'] ?? -1,
      DaoVotingCw721Staked: codeIdMap['dao_voting_cw721_staked'] ?? -1,
      DaoVotingTokenStaked: codeIdMap['dao_voting_token_staked'] ?? -1,
    },
  }

  log(JSON.stringify(config, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
