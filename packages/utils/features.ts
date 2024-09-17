import semverGte from 'semver/functions/gte'
import semverLt from 'semver/functions/lt'

import { ContractVersion, Feature, SupportedFeatureMap } from '@dao-dao/types'

/**
 * Checks if a specific feature is supported by a given contract version.
 *
 * @param {Feature} feature - The feature to check.
 * @param {ContractVersion} version - The contract version to check against.
 * @return {boolean} Returns true if the feature is supported by the version,
 * false otherwise.
 */
export const isFeatureSupportedByVersion = (
  feature: Feature,
  version: ContractVersion
): boolean => {
  switch (feature) {
    case Feature.StorageItemValueKey:
      return versionGte(version, ContractVersion.V2Beta)
    case Feature.MultipleChoiceProposals:
    case Feature.SubDaos:
    case Feature.PrePropose:
    case Feature.StaticProposalModulePrefixes:
    case Feature.VoteUntilExpiration:
      return versionGte(version, ContractVersion.V2Alpha)
    case Feature.DaoVotingCw721StakedNoOwner:
    case Feature.ModuleInstantiateFunds:
      return versionGte(version, ContractVersion.V230)
    case Feature.VotingModuleTokenTypeFix:
    case Feature.Approval:
    case Feature.Veto:
      return versionGte(version, ContractVersion.V240)
    case Feature.GranularSubmissionPolicy:
      return versionGte(version, ContractVersion.V250)
    default:
      return true
  }
}

/**
 * Pre-computes supported features based on the given contract version.
 *
 * @param {ContractVersion} version - The contract version to check.
 * @return {SupportedFeatureMap} - A map of supported features where the key is
 * the feature name and the value is a boolean indicating if the feature is
 * supported.
 */
export const getSupportedFeatures = (
  version: ContractVersion
): SupportedFeatureMap =>
  Object.values(Feature).reduce(
    (acc, feature) => ({
      ...acc,
      [feature]: isFeatureSupportedByVersion(feature as Feature, version),
    }),
    {} as SupportedFeatureMap
  )

/**
 * Checks if a given version is greater than or equal to a specified version.
 *
 * @param {ContractVersion} version - The version to check.
 * @param {ContractVersion} gteThis - The version to compare with.
 * @return {boolean} Returns true if the given version is greater than or equal
 * to the specified version.
 */
export const versionGte = (
  version: ContractVersion,
  gteThis: ContractVersion
): boolean => {
  try {
    return semverGte(version, gteThis)
  } catch {
    // If throws an error, one of the versions was invalid (likely not a
    // version, like ContractVersion.Gov), so just return false.
    return false
  }
}

/**
 * Checks if a given version is less than a specified version.
 *
 * @param {ContractVersion} version - The version to check.
 * @param {ContractVersion} ltThis - The version to compare with.
 * @return {boolean} Returns true if the given version is less than the
 * specified version.
 */
export const versionLt = (
  version: ContractVersion,
  ltThis: ContractVersion
): boolean => {
  try {
    return semverLt(version, ltThis)
  } catch {
    // If throws an error, one of the versions was invalid (likely not a
    // version, like ContractVersion.Gov), so just return false.
    return false
  }
}
