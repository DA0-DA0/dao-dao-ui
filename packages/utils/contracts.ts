import { ContractVersion } from '@dao-dao/types'

const CONTRACT_VERSIONS = Object.values(ContractVersion)

// If version is defined, returns it. Otherwise, returns `undefined`.
// Essentially just filters version by its presence in the `ContractVersion`
// enum.
export const parseContractVersion = (
  version: string
): ContractVersion | undefined => CONTRACT_VERSIONS.find((v) => v === version)

export const indexToProposalModulePrefix = (index: number) => {
  index += 1
  let prefix = ''
  while (index > 0) {
    const letterIndex = (index - 1) % 26
    // capital A = 65, Z = 90
    prefix = String.fromCharCode(65 + letterIndex) + prefix
    index = ((index - letterIndex) / 26) | 0
  }

  return prefix
}

// Normalize for comparisons.
export const normalizeContractName = (contractName: string) =>
  contractName.replace('crates.io:', '').trim()
