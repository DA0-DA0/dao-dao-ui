# @dao-dao/utils

A collection of simple utility functions used across packages.

## Miscellaneous

### Log Code IDs

To log the Code IDs from their config object in
[`constants/chains.ts`](./constants/chains.ts) in a format to put into a
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
  if (!chainA || !chainB) {
    throw new Error('Invalid chain pair')
  }
  console.log(`
  ${chainIdA}:

  # polytone to ${chainIdB} (note)
  ["wasm.${chainA.note}", "${chainA.localChannel}"],
  # polytone from ${chainIdB} (voice)
  ["wasm.${chainB.voice}", "${chainB.remoteChannel}"],

  ${chainIdB}:

  # polytone to ${chainIdA} (note)
  ["wasm.${chainB.note}", "${chainB.localChannel}"],
  # polytone from ${chainIdA} (voice)
  ["wasm.${chainA.voice}", "${chainA.remoteChannel}"],
  `)
}

output('chain-id-A', 'chain-id-B')
```
