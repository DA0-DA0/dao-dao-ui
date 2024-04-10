# @dao-dao/utils

A collection of simple utility functions used across packages.

## Miscellaneous

### Log Code IDs

To log the Code IDs from their config object in
[`src/constants/chains.ts`](./src/constants/chains.ts) in a format to put into a
[dao-contracts](https://github.com/DA0-DA0/dao-contracts/releases) tagged
release:

```js
let output = (obj) =>
  console.log(Object.entries(obj).map(([key, value]) => {
    const convertedKey = [...Array(key.length)].map((_, idx) => {
      const c = key.charAt(idx)
      // Convert capital letter to lowercase with a hyphen before.
      if (/[A-Z]/.test(c)) {
        return `${idx > 0 ? '-' : ''}${c.toLowerCase()}`
      }
      return c
    }).join('')
    return `${convertedKey}: ${value}`
  }).join('\n'))

output({
  ...
  DaoCore: 1,
  ...
})
```

### Log Polytone Hermes Packet Filter

To retrieve the Hermes packet filter entries for a given chain pair connected
via Polytone:

```js
import { SUPPORTED_CHAINS } from '@dao-dao/utils/constants/chains'

let output = (chainIdA: string, chainIdB: string) => {
  const chainA = SUPPORTED_CHAINS.find((chain) => chain.chainId === chainIdA)
    ?.polytone?.[chainIdB]
  const chainB = SUPPORTED_CHAINS.find((chain) => chain.chainId === chainIdB)
    ?.polytone?.[chainIdA]
  if (!chainA && !chainB) {
    throw new Error('Invalid chain pair')
  }

  console.log(chainIdA + ':')
  if (chainA) {
    console.log(`
  # polytone to ${chainIdB} (note)
  ["wasm.${chainA.note}", "${chainA.localChannel}"],`)
  }
  if (chainB) {
    console.log(`
  # polytone from ${chainIdB} (voice)
  ["wasm.${chainB.voice}", "${chainB.remoteChannel}"],`)
  }

  console.log('\n\n' + chainIdB + ':')
  if (chainB) {
    console.log(`
  # polytone to ${chainIdA} (note)
  ["wasm.${chainB.note}", "${chainB.localChannel}"],`)
  }
  if (chainA) {
    console.log(`
  # polytone from ${chainIdA} (voice)
  ["wasm.${chainA.voice}", "${chainA.remoteChannel}"],`)
  }
}

output('chain-id-A', 'chain-id-B')
```

To retrieve the Hermes packet filter entries for a single chain's Polytone
connections:

```js
import { SUPPORTED_CHAINS } from '@dao-dao/utils/constants/chains'

let output = (chainId: string) => {
  const chainPolytonesTo = Object.entries(
    SUPPORTED_CHAINS.find((chain) => chain.chainId === chainId)?.polytone || {}
  )
  const chainPolytonesFrom = SUPPORTED_CHAINS.flatMap((chain) =>
    chain.polytone?.[chainId]
      ? {
          chainId: chain.chainId,
          polytone: chain.polytone[chainId],
        }
      : []
  )

  const isolatedFroms = chainPolytonesFrom.filter(
    ({ chainId }) =>
      !chainPolytonesTo.some((polytoneTo) => polytoneTo[0] === chainId)
  )

  const lines = [
    ...chainPolytonesTo.flatMap(([chainId, to]) => {
      const toLine = `  # polytone to ${chainId} (note)\n  ["wasm.${to.note}", "${to.localChannel}"]`

      const from = chainPolytonesFrom.find(
        (from) => from.chainId === chainId
      )?.polytone
      const fromLine =
        from &&
        `  # polytone from ${chainId} (voice)\n  ["wasm.${from.voice}", "${from.remoteChannel}"]`

      return [toLine, ...(fromLine ? [fromLine] : [])]
    }),
    ...isolatedFroms.map(
      ({ chainId, polytone }) =>
        `  # polytone from ${chainId} (voice)\n  ["wasm.${polytone.voice}", "${polytone.remoteChannel}"]`
    ),
    ...isolatedFroms.map(
      (from) =>
        `\n${from.chainId}:\n  # polytone to ${chainId} (note)\n  ["wasm.${from.polytone.note}", "${from.polytone.localChannel}"]`
    ),
  ]

  console.log('\n' + chainId + ':')
  console.log(lines.join(',\n'))
}

output('chain-id')
```
