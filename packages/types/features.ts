/**
 * The various supported versions of the DAO contracts.
 */
export enum ContractVersion {
  // Used when referring to gov module. Placeholder to force into DaoInfo shape.
  Gov = 'gov',

  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v1.0.0
  V1 = '0.1.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-alpha
  V2Alpha = '0.2.0',
  // https://github.com/neutron-org/neutron-dao/releases/tag/v0.5.0
  V2AlphaNeutron = '0.2.1',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.0-beta
  V2Beta = '2.0.0-beta',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.1
  V201 = '2.0.1',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.2
  V202 = '2.0.2',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.0.3
  V203 = '2.0.3',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.1.0
  V210 = '2.1.0',
  // https://github.com/DA0-DA0/dao-contracts/releases/tag/v2.3.0
  V230 = '2.3.0',
}

/**
 * Feature flags that are supported by specific `ContractVersion`s.
 *
 * After adding a feature to this enum, update the `isFeatureSupportedByVersion`
 * function in `@dao-dao/utils/features.ts` with the corresponding feature
 * versioning logic.
 */
export enum Feature {
  /** The `set_item` message on a DAO responsible for setting storage items was
   * updated from using `addr` to using `value` for the key holding the value.
   */
  StorageItemValueKey,
  /**
   * Multiple choice proposals were added.
   */
  MultipleChoiceProposals,
  /**
   * SubDAOs were added.
   */
  SubDaos,
  /** Pre-propose was added. */
  PrePropose,
  /**
   * Proposal modules were changed to have statically-assigned prefixes, as
   * opposed to being dynamic based on the order of the active proposal modules.
   */
  StaticProposalModulePrefixes,
  /**
   * Voting was updated to be allowed up until expiration, even if a proposal
   * outcome has already been determined.
   */
  VoteUntilExpiration,
  /**
   * A `funds` field was added to module instantiate messages (such as when
   * adding proposal modules).
   */
  ModuleInstantiateFunds,
}

/**
 * Map each feature to whether or not it is supported.
 */
export type SupportedFeatureMap = Record<Feature, boolean>
