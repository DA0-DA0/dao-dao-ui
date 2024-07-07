import fs from 'fs'
import path from 'path'

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1HdWallet, EncodeObject } from '@cosmjs/proto-signing'
import chalk from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'

import {
  chainQueries,
  makeGetSignerOptions,
  makeReactQueryClient,
  skipQueries,
} from '@dao-dao/state'
import { SupportedChainConfig, cwMsgToEncodeObject } from '@dao-dao/types'
import { MsgExec } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/tx'
import { MsgStoreCode } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import {
  CHAIN_GAS_MULTIPLIER,
  encodeJsonToBase64,
  findEventsAttributeValue,
  getRpcForChainId,
  gzipCompress,
  maybeGetChainForChainId,
} from '@dao-dao/utils'

const { parsed: { MNEMONIC, DAO_CONTRACTS_DIR, POLYTONE_CONTRACTS_DIR } = {} } =
  dotenv.config()

if (!MNEMONIC) {
  console.error('MNEMONIC not set')
  process.exit(1)
}
if (!DAO_CONTRACTS_DIR) {
  console.error('DAO_CONTRACTS_DIR not set')
  process.exit(1)
}
if (!POLYTONE_CONTRACTS_DIR) {
  console.error('POLYTONE_CONTRACTS_DIR not set')
  process.exit(1)
}

const program = new Command()
program.requiredOption('-c, --chain <ID>', 'chain ID')
program.option('-p, --polytone', 'only deploy polytone contracts')
program.option(
  '-a, --authz <granter>',
  'upload contracts via authz exec as this granter'
)
program.option(
  '-x, --exclude <substrings>',
  'ignore contracts containing any of these comma-separated substrings (e.g. cw721)'
)

program.parse(process.argv)
const { chain: chainId, polytone, authz, exclude: _exclude } = program.opts()

const exclude: string[] | undefined = _exclude?.split(',')

const { log } = console

const main = async () => {
  const queryClient = await makeReactQueryClient()

  const chain =
    maybeGetChainForChainId(chainId) ||
    // Fetch from Skip API if doesn't exist locally.
    (await queryClient.fetchQuery(
      skipQueries.chain(queryClient, {
        chainId,
      })
    ))
  const chainName = chain.chain_name
  const bech32Prefix = chain.bech32_prefix

  await queryClient.prefetchQuery(
    chainQueries.dynamicGasPrice({ chainId: chainId })
  )

  const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
    prefix: bech32Prefix,
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
        permission: AccessType.ACCESS_TYPE_EVERYBODY,
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

  const instantiateContract = async ({
    id,
    codeId,
    msg,
    label,
    prefixLength,
  }: {
    id: string
    codeId: number
    msg: Record<string, unknown>
    label: string
    prefixLength: number
  }) => {
    const { events, transactionHash } = await client.signAndBroadcast(
      sender,
      [
        cwMsgToEncodeObject(
          chainId,
          {
            wasm: {
              instantiate: {
                code_id: codeId,
                msg: encodeJsonToBase64(msg),
                funds: [],
                label,
                admin: undefined,
              },
            },
          },
          sender
        ),
      ],
      CHAIN_GAS_MULTIPLIER
    )

    const contractAddress = findEventsAttributeValue(
      events,
      'instantiate',
      '_contract_address'
    )

    log(
      chalk.greenBright(
        `[${id}.TX]${' '.repeat(
          prefixLength - id.length - 5
        )}${transactionHash}`
      )
    )

    if (!contractAddress) {
      log(
        chalk.red(
          `[${id}.CONTRACT]${' '.repeat(
            prefixLength - id.length - 11
          )}not found`
        )
      )
      process.exit(1)
    }

    log(
      chalk.green(
        `[${id}.CONTRACT]${' '.repeat(
          prefixLength - id.length - 11
        )}${contractAddress}`
      )
    )

    return contractAddress
  }

  log()

  // Upload polytone contracts only.
  if (polytone) {
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

  // Upload DAO contracts.

  // List files in the contracts directory.
  const contracts = fs
    .readdirSync(DAO_CONTRACTS_DIR)
    .filter((file) => file.endsWith('.wasm'))
    .sort()

  // Set console prefix length to the max file length plus space for brackets
  // and longest ID suffix (CONTRACT).
  const consolePrefixLength =
    Math.max(...contracts.map((file) => file.length)) + 10

  const codeIdMap: Record<string, number | undefined> = {}

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
          `[${id}.CODE_ID]${' '.repeat(consolePrefixLength - id.length - 10)}${
            codeIdMap[id]
          }`
        )
      )
    }
  }

  // Instantiate admin factory.
  const cwAdminFactoryCodeId = codeIdMap['cw_admin_factory']
  if (!cwAdminFactoryCodeId) {
    log(chalk.red('cw_admin_factory.CODE_ID not found'))
    process.exit(1)
  }

  const adminFactoryAddress = await instantiateContract({
    id: 'cw_admin_factory',
    codeId: cwAdminFactoryCodeId,
    msg: {},
    label: 'daodao_admin_factory',
    prefixLength: consolePrefixLength,
  })

  log()
  log(chalk.green('Done! UI config entry:'))

  const config: SupportedChainConfig = {
    chainId,
    name: chainName,
    mainnet:
      'is_testnet' in chain
        ? !chain.is_testnet
        : chain.network_type === 'mainnet',
    accentColor: 'ACCENT_COLOR',
    factoryContractAddress: adminFactoryAddress,
    explorerUrlTemplates: {
      tx: `https://ping.pub/${chainName}/tx/REPLACE`,
      gov: `https://ping.pub/${chainName}/gov`,
      govProp: `https://ping.pub/${chainName}/gov/REPLACE`,
      wallet: `https://ping.pub/${chainName}/account/REPLACE`,
    },
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
