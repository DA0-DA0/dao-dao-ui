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
