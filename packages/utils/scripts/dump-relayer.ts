import { Command } from 'commander'

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

const dumpAll = (...chainIds: string[]) => {
  const chainLines: Record<string, Set<string>> = {}

  chainIds.forEach((chainId) => {
    // get the polytone connections out of this chain
    const chainPolytonesOut = Object.entries(
      SUPPORTED_CHAINS.find((chain) => chain.chainId === chainId)?.polytone ||
        {}
    )

    // get the polytone connections into this chain
    const chainPolytonesInto = SUPPORTED_CHAINS.flatMap((chain) =>
      chain.polytone?.[chainId]
        ? {
            chainId: chain.chainId,
            polytone: chain.polytone[chainId],
          }
        : []
    )

    chainLines[chainId] ||= new Set()

    // notes out
    chainPolytonesOut.forEach(([inChainId, polytone]) =>
      chainLines[chainId].add(
        `  # polytone to ${inChainId} (note)\n  ["wasm.${polytone.note}", "${polytone.localChannel}"],`
      )
    )

    // voices in
    chainPolytonesInto.forEach(({ chainId: outChainId, polytone }) =>
      chainLines[chainId].add(
        `  # polytone from ${outChainId} (voice)\n  ["wasm.${polytone.voice}", "${polytone.remoteChannel}"],`
      )
    )

    chainPolytonesOut.forEach(([intoChainId, polytone]) => {
      chainLines[intoChainId] ||= new Set()
      // voices in
      chainLines[intoChainId].add(
        `  # polytone from ${chainId} (voice)\n  ["wasm.${polytone.voice}", "${polytone.remoteChannel}"],`
      )
    })
  })

  Object.entries(chainLines).forEach(([chainId, lines]) => {
    console.log('\n' + chainId + ':')
    lines.forEach((line) => console.log(line))
  })

  console.log()
}

const dumpBidirectional = (chainIdA: string, chainIdB: string) => {
  const chainA = SUPPORTED_CHAINS.find((chain) => chain.chainId === chainIdA)
    ?.polytone?.[chainIdB]
  const chainB = SUPPORTED_CHAINS.find((chain) => chain.chainId === chainIdB)
    ?.polytone?.[chainIdA]
  if (!chainA && !chainB) {
    console.error('Invalid chain pair')
    return
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

if (chainA && chainB) {
  dumpBidirectional(chainA, chainB)
} else if (chainA) {
  dumpAll(...chainA.split(','))
} else if (chainB) {
  dumpAll(...chainB.split(','))
} else if (many) {
  dumpAll(...many.split(','))
} else {
  dumpAll(...SUPPORTED_CHAINS.flatMap((c) => (c.polytone ? c.chainId : [])))
}
