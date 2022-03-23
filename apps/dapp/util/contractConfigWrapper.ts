import { selectorFamily, useRecoilValue, waitForAll } from 'recoil'

import { ConfigResponse as DaoConfig } from '@dao-dao/types/contracts/cw3-dao'
import { ConfigResponse as SigConfig } from '@dao-dao/types/contracts/cw3-flex-multisig'

import { daoSelector, tokenConfig } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'

export type Config = SigConfig | DaoConfig

/*
 * Wrapper hooks for unifying some behavior between Dao and Multisig
 * configs. See `ProposalEditor` for example usage.
 */

const useContractConfigGovToken = (base: Config) =>
  'gov_token' in base ? (base.gov_token as string) : undefined

export const useContractConfigGovTokenSymbol = (base: Config) => {
  const govToken = useContractConfigGovToken(base)
  // Must call hooks the same number of times every render so we do
  // this little maneuver. I age ten years every time I have to do
  // this.
  const tokenInfo = useRecoilValue(
    waitForAll(
      (govToken ? [govToken] : []).map((address) => tokenConfig(address))
    )
  )
  return tokenInfo.length ? tokenInfo[0].symbol : ''
}

export const useContractConfigGovTokenDecimals = (base: Config) => {
  const govToken = useContractConfigGovToken(base)
  // Must call hooks the same number of times every render so we do
  // this little maneuver. I age ten years every time I have to do
  // this.
  const tokenInfo = useRecoilValue(
    waitForAll(
      (govToken ? [govToken] : []).map((address) => tokenConfig(address))
    )
  )
  return tokenInfo.length ? tokenInfo[0].decimals : 0
}

export const contractConfigSelector = selectorFamily<
  Config,
  { contractAddress: string; multisig: boolean }
>({
  key: 'contractConfigSelector',
  get:
    ({
      contractAddress,
      multisig,
    }: {
      contractAddress: string
      multisig: boolean
    }) =>
    async ({ get }) => {
      return multisig
        ? get(sigSelector(contractAddress))
        : get(daoSelector(contractAddress))
    },
})
