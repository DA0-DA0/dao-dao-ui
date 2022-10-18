import { ContractVersion } from '@dao-dao/tstypes'

export const parseContractVersion = (
  version: string
): ContractVersion | undefined =>
  version === ContractVersion.V0_1_0
    ? ContractVersion.V0_1_0
    : version === ContractVersion.V0_2_0
    ? ContractVersion.V0_2_0
    : undefined

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
