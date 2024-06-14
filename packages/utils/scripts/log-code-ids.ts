import { Command } from 'commander'

import { SUPPORTED_CHAINS } from '../constants/chains'

// Parse arguments.
const program = new Command()
program.requiredOption('-c, --chain-id <string>', 'chain ID')
program.parse(process.argv)
const { chainId } = program.opts()

const chain = SUPPORTED_CHAINS.find((c) => c.chainId === chainId)
if (!chain) {
  console.error(`Invalid chain ID: ${chainId}`)
  process.exit(1)
}

console.log(
  Object.entries(chain.codeIds)
    .map(([key, value]) => {
      const convertedKey = [...Array(key.length)]
        .map((_, idx) => {
          const c = key.charAt(idx)
          // Convert capital letter to lowercase with a hyphen before.
          if (/[A-Z]/.test(c)) {
            return `${idx > 0 ? '-' : ''}${c.toLowerCase()}`
          }
          return c
        })
        .join('')
      return `${convertedKey}: ${value}`
    })
    .join('\n')
)
