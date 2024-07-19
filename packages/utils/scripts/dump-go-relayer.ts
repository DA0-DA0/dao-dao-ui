import { Command } from 'commander'

import { getChainForChainId } from '../chain'
import { ibcProtoRpcClientRouter } from '../client'
import { SUPPORTED_CHAINS } from '../constants/chains'

// Parse arguments.
const program = new Command()
program.description(
  'dump Polytone relayer entries for one or multiple chains. passing no arguments will dump entries for all chains'
)
program.option('-a, --chain-a <string>', 'chain A')
program.option('-b, --chain-b <string>', 'chain B')
program.option('-m, --many <string>', 'comma-separated list of chains to dump')
program.parse(process.argv)
const { chainA, chainB, many } = program.opts()

const failed: {
  srcChainId: string
  destChainId: string
  error: unknown
}[] = []

const dumpAll = async (chainIds: string[]) => {
  const chains = SUPPORTED_CHAINS.filter((c) => chainIds.includes(c.chainId))
  if (chains.length === 0) {
    throw new Error('no chains')
  }

  for (const srcChain of chains) {
    try {
      await dumpChain(srcChain.chainId)
    } catch (error) {
      failed.push({
        srcChainId: srcChain.chainId,
        destChainId: 'ALL',
        error,
      })
    }
  }
}

const dumpChain = async (srcChainId: string, chainIdFilter?: string[]) => {
  const srcChain = SUPPORTED_CHAINS.find((c) => c.chainId === srcChainId)
  if (!srcChain) {
    throw new Error(`unknown src chain ${srcChainId}`)
  }

  const polytoneConnections = Object.entries(srcChain.polytone || {}).filter(
    ([chainId]) => !chainIdFilter?.length || chainIdFilter.includes(chainId)
  )
  if (polytoneConnections.length === 0) {
    throw new Error('no polytone connections')
  }

  const srcIbc = await ibcProtoRpcClientRouter.connect(srcChainId)

  const results = await Promise.all(
    polytoneConnections.map(
      async ([destChainId, polytone]): Promise<string | undefined> => {
        try {
          const srcClientId = (
            await srcIbc.core.connection.v1.connection({
              connectionId: polytone.localConnection,
            })
          )?.connection?.clientId
          if (!srcClientId) {
            throw new Error(
              `no src client ID for ${polytone.localConnection} on chain ${srcChainId}`
            )
          }

          const destClientId = (
            await (
              await ibcProtoRpcClientRouter.connect(destChainId)
            ).core.connection.v1.connection({
              connectionId: polytone.remoteConnection,
            })
          )?.connection?.clientId
          if (!destClientId) {
            throw new Error(
              `no dest client ID for ${polytone.remoteConnection} on chain ${destChainId}`
            )
          }

          const srcChainName = getChainForChainId(srcChainId).chain_name
          const destChainName = getChainForChainId(destChainId).chain_name

          return `    ${srcChainName}-${destChainName}:
        src:
            chain-id: ${srcChainId}
            client-id: ${srcClientId}
            connection-id: ${polytone.localConnection}
        dst:
            chain-id: ${destChainId}
            client-id: ${destClientId}
            connection-id: ${polytone.remoteConnection}
        src-channel-filter:
            rule: allowlist
            channel-list:
                - ${polytone.localChannel}`
        } catch (error) {
          failed.push({
            srcChainId,
            destChainId,
            error,
          })
        }
      }
    )
  )

  console.log(results.filter(Boolean).sort().join('\n'))
}

const main = async () => {
  console.log()

  if (chainA && chainB) {
    await dumpChain(chainA, [chainB])
  } else if (chainA) {
    await dumpAll(chainA.split(','))
  } else if (chainB) {
    await dumpAll(chainB.split(','))
  } else if (many) {
    await dumpAll(many.split(','))
  } else {
    await dumpAll(
      SUPPORTED_CHAINS.flatMap((c) => (c.polytone ? c.chainId : []))
    )
  }

  if (failed.length > 0) {
    console.log('\nFAILED:')
    console.table(failed)
  }

  process.exit(0)
}

main()
