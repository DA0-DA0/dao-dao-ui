import { Command } from 'commander'

import { getChainForChainId } from '../chain'
import { ibcProtoRpcClientRouter } from '../client'
import { SUPPORTED_CHAINS } from '../constants/chains'

// Parse arguments.
const program = new Command()
program.description(
  'dump Polytone relayer entries for one or multiple chains. passing no arguments will dump entries for all chains'
)
program.option('-s, --src <string>', 'source chain(s)')
program.option('-d, --dest <string>', 'destination chain(s)')
program.parse(process.argv)
const { src, dest } = program.opts()

const failed: {
  srcChainId: string
  destChainId: string
  error: unknown
}[] = []

const dumpAll = async (chainIds: string[], destChainIds?: string[]) => {
  const chains = SUPPORTED_CHAINS.filter((c) => chainIds.includes(c.chainId))
  if (chains.length === 0) {
    throw new Error('no chains')
  }

  console.log('paths:')
  for (const srcChain of chains) {
    try {
      await dumpChain(srcChain.chainId, destChainIds)
    } catch (error) {
      failed.push({
        srcChainId: srcChain.chainId,
        destChainId: 'ALL',
        error,
      })
    }
  }
}

const dumpChain = async (srcChainId: string, destChainIds?: string[]) => {
  const srcChain = SUPPORTED_CHAINS.find((c) => c.chainId === srcChainId)
  if (!srcChain) {
    throw new Error(`unknown src chain ${srcChainId}`)
  }

  const polytoneConnections = Object.entries(srcChain.polytone || {}).filter(
    ([chainId]) => !destChainIds?.length || destChainIds.includes(chainId)
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

          const srcChainName = getChainForChainId(srcChainId).chainName
          const destChainName = getChainForChainId(destChainId).chainName

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

  const srcChains: string[] | undefined = src?.split(',')
  const destChains: string[] | undefined = dest?.split(',')

  await dumpAll(
    srcChains?.length
      ? srcChains
      : SUPPORTED_CHAINS.flatMap((c) => (c.polytone ? c.chainId : [])),
    destChains
  )

  if (failed.length > 0) {
    console.log('\nFAILED:')
    console.table(failed)
  }

  process.exit(0)
}

main()
