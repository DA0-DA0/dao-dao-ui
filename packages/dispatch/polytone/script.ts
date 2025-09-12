import fs from 'fs'
import path from 'path'

import { IbcClient, Link, Logger } from '@confio/relayer'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { stringToPath as stringToHdPath } from '@cosmjs/crypto'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import chalk from 'chalk'
import { Command } from 'commander'
import toml from 'toml'

import { chainQueries, makeGetSignerOptions, skipQueries } from '@dao-dao/state'
import { MsgUpdateInstantiateConfig } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import { AccessType } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/types'
import {
  Order,
  State,
  stateToJSON,
} from '@dao-dao/types/protobuf/codegen/ibc/core/channel/v1/channel'
import {
  CHAIN_GAS_MULTIPLIER,
  cosmwasmProtoRpcClientRouter,
  getIbcTransferInfoBetweenChains,
  getNativeTokenForChainId,
  getRpcForChainId,
  ibcProtoRpcClientRouter,
  isErrorWithSubstring,
  makeDependencyTrackedQueryClient,
  maybeGetChainForChainId,
} from '@dao-dao/utils'

import { getBlockMaxGas, instantiateContract } from '../utils'
import { chains } from './config'
import { PolytoneConfig } from './PolytoneConfig'

const { log } = console

/**
 * Path to the config file.
 */
const configPath = path.join(__dirname, '../config.toml')

if (!fs.existsSync(configPath)) {
  log(chalk.red(`Config file not found at ${configPath}`))
  process.exit(1)
}

let config: any
try {
  config = toml.parse(fs.readFileSync(configPath, 'utf8'))
} catch (err) {
  log(chalk.red(`Error parsing ${configPath}: ${err}`))
  process.exit(1)
}

const { mnemonics } = config

const program = new Command()
program.requiredOption('-s, --src <chain ID>', 'source chain ID')
program.requiredOption('-d, --dest <chain ID>', 'destination chain ID')
program.option(
  '-m, --mnemonic <name>',
  'use this configured mnemonic name for signing transactions',
  'default'
)
program.option(
  '-c, --existing-connection <connection ID>',
  'existing source connection ID that connects to the destination. if not provided, will attempt to resolve this automatically if a transfer channel exists between the chains, failing otherwise.'
)
program.option(
  '-n, --new-connection',
  'create a new IBC connection. you probably do not want to use this if a connection already exists. creating your own connection increases the risk that the IBC clients expire and need to be reset, since activity keeps connections alive. using an existing connection means there is a higher chance others will be using the connection, which is a good thing.'
)
program.option(
  '-e, --existing-channel <channel ID>',
  'existing source channel ID. if provided, will not create a new channel and instead attempt to fetch the existing channel pair.'
)
program.option(
  '--note <contract address>',
  'note contract to use, instead of creating a new one. you may use this if the script errored before.'
)
program.option(
  '--listener <contract address>',
  'listener contract to use, instead of creating a new one. you may use this if the script errored before.'
)
program.option(
  '--voice <contract address>',
  'voice contract to use, instead of creating a new one. you may use this if the script errored before.'
)

program.parse(process.argv)
const {
  src: srcChainId,
  dest: destChainId,
  existingConnection,
  newConnection,
  existingChannel,
  note: _note,
  listener: _listener,
  voice: _voice,
  mnemonic: mnemonicName,
} = program.opts()

const mnemonic = mnemonics[mnemonicName]
if (!mnemonic) {
  log(chalk.red(`Mnemonic with name "${mnemonicName}" not found in config.`))
  process.exit(1)
}

const main = async () => {
  const queryClient = await makeDependencyTrackedQueryClient()

  const { noteCodeId, listenerCodeId } =
    chains[srcChainId as keyof typeof chains] || {}
  if (!noteCodeId || !listenerCodeId) {
    throw new Error(
      `Source chain ${srcChainId} note and/or listener code IDs not configured`
    )
  }

  const polytoneConfig = new PolytoneConfig()

  const {
    voiceCodeId,
    proxyCodeId,
    addrLen: destAddrLen,
  } = chains[destChainId as keyof typeof chains] || {}
  if (!voiceCodeId || !proxyCodeId) {
    throw new Error(
      `Destination chain ${destChainId} voice and/or proxy code IDs not configured`
    )
  }

  const [srcChain, destChain] = await Promise.all([
    maybeGetChainForChainId(srcChainId) ||
      // Fetch from Skip API if doesn't exist locally.
      queryClient.fetchQuery(
        skipQueries.chain({
          chainId: srcChainId,
        })
      ),
    maybeGetChainForChainId(destChainId) ||
      // Fetch from Skip API if doesn't exist locally.
      queryClient.fetchQuery(
        skipQueries.chain({
          chainId: destChainId,
        })
      ),
    queryClient.prefetchQuery(
      chainQueries.dynamicGasPrice({ chainId: srcChainId })
    ),
    queryClient.prefetchQuery(
      chainQueries.dynamicGasPrice({ chainId: destChainId })
    ),
  ])

  const srcSigner = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: srcChain.bech32Prefix,
    hdPaths: srcChain.chainRegistry?.slip44
      ? [stringToHdPath(`m/44'/${srcChain.chainRegistry.slip44}'/0'/0/0`)]
      : undefined,
  })
  const srcSender = (await srcSigner.getAccounts())[0].address

  const destSigner = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: destChain.bech32Prefix,
    hdPaths: destChain.chainRegistry?.slip44
      ? [stringToHdPath(`m/44'/${destChain.chainRegistry.slip44}'/0'/0/0`)]
      : undefined,
  })
  const destSender = (await destSigner.getAccounts())[0].address

  log()
  log(
    chalk.underline(
      `Connecting ${srcChain.chainName} to ${destChain.chainName} with ${srcSender} and ${destSender}...`
    )
  )

  const ibcLogger: Logger = {
    error: (msg) => {
      log(chalk.red(msg))
      return ibcLogger
    },
    warn: (msg) => {
      log(chalk.yellow(msg))
      return ibcLogger
    },
    info: (msg) => {
      log(chalk.green(msg))
      return ibcLogger
    },
    verbose: (msg) => {
      log(chalk.blue(msg))
      return ibcLogger
    },
    debug: (msg) => {
      log(chalk.cyan(msg))
      return ibcLogger
    },
  }

  const [
    srcClient,
    srcIbcQueryClient,
    srcIbcClient,
    srcBlockMaxGas,
    destClient,
    destIbcQueryClient,
    destIbcClient,
    destBlockMaxGas,
  ] = await Promise.all([
    SigningCosmWasmClient.connectWithSigner(
      getRpcForChainId(srcChainId),
      srcSigner,
      makeGetSignerOptions(queryClient)(srcChain.chainName)
    ),
    ibcProtoRpcClientRouter.connect(srcChainId),
    IbcClient.connectWithSigner(
      getRpcForChainId(srcChainId),
      srcSigner,
      srcSender,
      {
        gasPrice: makeGetSignerOptions(queryClient)(srcChain.chainName)
          .gasPrice!,
        // How long it waits in between checking for a new block.
        estimatedBlockTime: 3000,
        // How long it waits until looking for acks.
        estimatedIndexerTime: 3000,
        logger: ibcLogger,
      }
    ),
    getBlockMaxGas({ chainId: srcChainId }),
    SigningCosmWasmClient.connectWithSigner(
      getRpcForChainId(destChainId),
      destSigner,
      makeGetSignerOptions(queryClient)(destChain.chainName)
    ),
    ibcProtoRpcClientRouter.connect(destChainId),
    IbcClient.connectWithSigner(
      getRpcForChainId(destChainId),
      destSigner,
      destSender,
      {
        gasPrice: makeGetSignerOptions(queryClient)(destChain.chainName)
          .gasPrice!,
        // How long it waits in between checking for a new block.
        estimatedBlockTime: 3000,
        // How long it waits until looking for acks.
        estimatedIndexerTime: 3000,
        logger: ibcLogger,
      }
    ),
    getBlockMaxGas({ chainId: destChainId }),
  ])

  /**
   * Get the connection ID from the source to the destination chain, by reverse
   * engineering the transfer channel for the fee denom.
   */
  const getSrcConnectionId = async () => {
    let trace: string | undefined
    try {
      trace = (
        await queryClient.fetchQuery(
          skipQueries.recommendedAsset({
            fromChainId: destChainId,
            denom: getNativeTokenForChainId(destChainId).denomOrAddress,
            toChainId: srcChainId,
          })
        )
      ).trace
    } catch (error) {
      if (isErrorWithSubstring(error, 'No Skip recommended asset found')) {
        // If not found, try to get existing IBC transfer channel.
        const { sourceChain } = getIbcTransferInfoBetweenChains(
          srcChainId,
          destChainId
        )
        return sourceChain.connection_id
      } else {
        throw error
      }
    }

    if (!trace) {
      throw new Error('No trace found')
    }

    const parts = trace.split('/')
    if (parts.length !== 2) {
      throw new Error('Expected 2 parts in trace. Got: ' + trace)
    }
    if (parts[0] !== 'transfer') {
      throw new Error('Expected transfer port in trace. Got: ' + trace)
    }

    const srcChannelId = parts[1]

    const srcConnectionHops = (
      await srcIbcQueryClient.core.channel.v1.channel({
        channelId: srcChannelId,
        portId: 'transfer',
      })
    ).channel?.connectionHops
    if (!srcConnectionHops || srcConnectionHops.length !== 1) {
      throw new Error('Expected 1 connection hop. Got: ' + srcConnectionHops)
    }

    return srcConnectionHops[0]
  }

  let srcConnectionId: string | undefined
  let destConnectionId: string | undefined

  if (!newConnection) {
    log()
    log(chalk.underline('Verifying existing connection...'))

    let _srcConnectionId: string | undefined = existingConnection

    // add `connection-` prefix if just a number is provided
    if (
      _srcConnectionId &&
      !_srcConnectionId.startsWith('connection-') &&
      !isNaN(Number(_srcConnectionId))
    ) {
      _srcConnectionId = 'connection-' + _srcConnectionId
    }

    try {
      _srcConnectionId ||= await getSrcConnectionId()
    } catch (err) {
      throw new Error(
        `Failed to get source connection ID: ${err}. Set with --existing-connection or create a new connection with --new-connection.`
      )
    }

    const srcConnection = (
      await srcIbcQueryClient.core.connection.v1.connection({
        connectionId: _srcConnectionId,
      })
    ).connection
    if (!srcConnection) {
      throw new Error('No source connection found for ID: ' + _srcConnectionId)
    }

    const srcClientStatus = (
      await srcIbcQueryClient.core.client.v1.clientStatus({
        clientId: srcConnection.clientId,
      })
    ).status
    if (srcClientStatus !== 'Active') {
      throw new Error(
        `Source connection client ${srcConnection.clientId} is not active: ${srcClientStatus}`
      )
    }

    const _destConnectionId = srcConnection.counterparty?.connectionId
    if (!_destConnectionId) {
      throw new Error('No destination connection ID found')
    }

    // Ensure connections are for each other.
    const destConnection = (
      await destIbcQueryClient.core.connection.v1.connection({
        connectionId: _destConnectionId,
      })
    ).connection
    if (!destConnection) {
      throw new Error(
        'No destination connection found for ID: ' + _destConnectionId
      )
    }

    if (destConnection.counterparty?.connectionId !== _srcConnectionId) {
      throw new Error(
        'Destination connection client ID does not match source connection client ID. Is the source connection ID correct?'
      )
    }

    const destClientStatus = (
      await destIbcQueryClient.core.client.v1.clientStatus({
        clientId: destConnection.clientId,
      })
    ).status
    if (destClientStatus !== 'Active') {
      throw new Error(
        `Destination connection client ${destConnection.clientId} is not active: ${destClientStatus}`
      )
    }

    srcConnectionId = _srcConnectionId
    destConnectionId = _destConnectionId
  }

  // Create note and listener on source chain.

  log()
  log(chalk.underline('Instantiating contracts...'))

  const consolePrefixLength = 24

  const note = await instantiateContract({
    client: srcClient,
    sender: srcSender,
    chainId: srcChainId,
    id: 'note',
    codeId: noteCodeId,
    msg: {
      block_max_gas: srcBlockMaxGas,
    },
    label: `polytone_note_to_${destChainId}`,
    logPrefixLength: consolePrefixLength,
    override: _note,
  })

  const listener = await instantiateContract({
    client: srcClient,
    sender: srcSender,
    chainId: srcChainId,
    id: 'listener',
    codeId: listenerCodeId,
    msg: {
      note,
    },
    label: `polytone_listener_from_${destChainId}`,
    logPrefixLength: consolePrefixLength,
    override: _listener,
  })

  // Create voice on destination chain.

  const voice = await instantiateContract({
    client: destClient,
    sender: destSender,
    chainId: destChainId,
    id: 'voice',
    codeId: voiceCodeId,
    msg: {
      proxy_code_id: `${proxyCodeId}`,
      block_max_gas: destBlockMaxGas,
      ...(destAddrLen && {
        contract_addr_len: `${destAddrLen}`,
      }),
    },
    label: `polytone_voice_from_${srcChainId}`,
    logPrefixLength: consolePrefixLength,
    override: _voice,
  })

  // Query existing proxy instantiate config, since the destination chain may
  // restrict instantiation to specific addresses, and thus we need to update
  // the proxy code ID instantiation permissions to allow the voice to
  // instantiate new proxies.
  const { codeInfo: existingProxyCodeInfo } = await (
    await cosmwasmProtoRpcClientRouter.connect(destChainId)
  ).wasm.v1.code({
    codeId: BigInt(proxyCodeId),
  })
  if (!existingProxyCodeInfo) {
    throw new Error(
      `Proxy code ID ${proxyCodeId} info not found on destination chain ${destChainId}.`
    )
  }

  if (existingProxyCodeInfo.instantiatePermission) {
    switch (existingProxyCodeInfo.instantiatePermission.permission) {
      case AccessType.Unspecified:
        throw new Error(
          `Proxy code ID ${proxyCodeId} has unspecified instantiate permission.`
        )
      case AccessType.Nobody:
        throw new Error(
          `Proxy code ID ${proxyCodeId} does not allow anybody to instantiate.`
        )
      case AccessType.Everybody:
        break
      case AccessType.AnyOfAddresses: {
        if (
          existingProxyCodeInfo.instantiatePermission.addresses.includes(voice)
        ) {
          log(
            chalk.green(
              `\nVoice ${voice} already has permission to instantiate proxy code ID ${proxyCodeId}.`
            )
          )
        } else {
          log(
            chalk.yellow(
              '\nAdding voice to proxy code ID instantiate permissions...'
            )
          )

          await destClient.signAndBroadcast(
            destSender,
            [
              {
                typeUrl: MsgUpdateInstantiateConfig.typeUrl,
                value: MsgUpdateInstantiateConfig.fromPartial({
                  sender: destSender,
                  codeId: BigInt(proxyCodeId),
                  newInstantiatePermission: {
                    permission: AccessType.AnyOfAddresses,
                    addresses: [
                      ...existingProxyCodeInfo.instantiatePermission.addresses,
                      voice,
                    ],
                  },
                }),
              },
            ],
            CHAIN_GAS_MULTIPLIER
          )

          log(chalk.green('Voice now has permission to instantiate proxy.'))
        }
      }
    }
  }

  // Connect note and voice over IBC.

  log()
  log(
    chalk.underline(
      `Opening IBC ${newConnection ? 'connection and ' : ''}channels...`
    )
  )

  let link: Link

  if (newConnection) {
    // replace auto fee with larger chain multiplier to cover gas
    const srcOriginalSignAndBroadcast = srcIbcClient.sign.signAndBroadcast.bind(
      srcIbcClient.sign
    )
    srcIbcClient.sign.signAndBroadcast = (
      signerAddress,
      messages,
      fee,
      memo,
      timeoutHeight
    ) =>
      srcOriginalSignAndBroadcast(
        signerAddress,
        messages,
        fee === 'auto' ? 2 : fee,
        memo,
        timeoutHeight
      )
    const destOriginalSignAndBroadcast =
      destIbcClient.sign.signAndBroadcast.bind(destIbcClient.sign)
    destIbcClient.sign.signAndBroadcast = (
      signerAddress,
      messages,
      fee,
      memo,
      timeoutHeight
    ) =>
      destOriginalSignAndBroadcast(
        signerAddress,
        messages,
        fee === 'auto' ? 2 : fee,
        memo,
        timeoutHeight
      )

    link = await Link.createWithNewConnections(
      srcIbcClient,
      destIbcClient,
      ibcLogger
    )

    srcConnectionId = link.endA.connectionID
    destConnectionId = link.endB.connectionID

    log(
      chalk.green(
        `created source (${srcChainId}) IBC client: ${link.endA.clientID}`
      )
    )
    log(
      chalk.green(
        `created destination (${destChainId}) IBC client: ${link.endB.clientID}`
      )
    )
  } else {
    // should never happen
    if (!srcConnectionId || !destConnectionId) {
      throw new Error(
        'Expected source and destination connection IDs to be set. Got: ' +
          srcConnectionId +
          ' and ' +
          destConnectionId
      )
    }

    link = await Link.createWithExistingConnections(
      srcIbcClient,
      destIbcClient,
      srcConnectionId,
      destConnectionId,
      ibcLogger
    )
  }

  const srcPort = `wasm.${note}`
  const destPort = `wasm.${voice}`

  let sourceChannelId: string | undefined
  let destChannelId: string | undefined
  if (existingChannel && typeof existingChannel === 'string') {
    const { channel: sourceChannel } =
      await link.endA.client.query.ibc.channel.channel(srcPort, existingChannel)
    if (!sourceChannel) {
      throw new Error(
        `Existing channel ${existingChannel} (port ${srcPort}) not found`
      )
    }
    sourceChannelId = existingChannel
    destChannelId = sourceChannel.counterparty.channelId

    if (
      sourceChannel.connectionHops.length !== 1 ||
      sourceChannel.connectionHops[0] !== srcConnectionId
    ) {
      throw new Error(
        `Existing channel ${existingChannel} does not match source connection ID ${srcConnectionId}`
      )
    }
    if (sourceChannel.counterparty.portId !== destPort) {
      throw new Error(
        `Existing channel ${existingChannel} (port ${srcPort})'s counterparty channel ID ${sourceChannel.counterparty.channelId} (port ${sourceChannel.counterparty.portId}) does not match destination port ${destPort}`
      )
    }
    if (sourceChannel.state !== State.STATE_OPEN) {
      throw new Error(
        `Existing channel ${existingChannel} is not open: ${stateToJSON(sourceChannel.state)}`
      )
    }
    const { channel: destChannel } =
      await link.endB.client.query.ibc.channel.channel(destPort, destChannelId)
    if (!destChannel) {
      throw new Error(
        `Existing destination channel ${existingChannel} (port ${destPort}) not found`
      )
    }
    if (destChannel.state !== State.STATE_OPEN) {
      throw new Error(
        `Existing destination channel ${existingChannel} is not open: ${stateToJSON(destChannel.state)}`
      )
    }
  } else {
    try {
      const channelPair = await link.createChannel(
        'A',
        srcPort,
        destPort,
        Order.ORDER_UNORDERED,
        'polytone-1'
      )
      sourceChannelId = channelPair.src.channelId
      destChannelId = channelPair.dest.channelId
    } catch (err) {
      log(
        chalk.yellow(
          `Failed to create channel. Run with ${chalk.bold(
            `\`-s ${srcChainId} -d ${destChainId} --note ${note} --listener ${listener} --voice ${voice} --existing-channel EXISTING_CHANNEL_ID\``
          )} to add it to the config anyway.`
        )
      )
      throw err
    }
  }

  const entry = await polytoneConfig.set({
    srcChainId,
    destChainId,
    entry: {
      note,
      listener,
      voice,
      localConnection: srcConnectionId,
      remoteConnection: destConnectionId,
      localChannel: sourceChannelId,
      remoteChannel: destChannelId,
    },
  })

  log()
  log(chalk.green('Done! UI config entry:'))
  log(JSON.stringify(entry, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    if (error instanceof Error) {
      console.error(chalk.red(error.stack))
    } else {
      log(chalk.red(error))
    }
    log()
    process.exit(1)
  })

process.on('SIGINT', () => {
  log(chalk.yellow('\nSIGINT received. Exiting...'))
  process.exit(0)
})
