import { constSelector, waitForAny } from 'recoil'

import { accountsSelector } from '@dao-dao/state/recoil'
import {
  ProfileWallet as StatelessProfileWallet,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'

import { useProfile } from '../../hooks'
import {
  hiddenBalancesSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { WalletTokenLine } from '../wallet/WalletTokenLine'
import { ProfileAddChains } from './ProfileAddChains'

export const ProfileWallet = () => {
  const { chains, uniquePublicKeys } = useProfile()
  const accounts = useCachedLoadingWithError(
    chains.loading
      ? undefined
      : waitForAny(
          chains.data.map(({ chainId, address }) =>
            accountsSelector({
              chainId,
              address,
            })
          )
        ),
    (chainLoadables) => chainLoadables.flatMap((l) => l.valueMaybe() || [])
  )

  const tokens = useCachedLoadingWithError(
    chains.loading
      ? undefined
      : chains.data.length > 0
      ? waitForAny(
          chains.data.map(({ chainId, address }) =>
            walletTokenCardInfosSelector({
              chainId,
              walletAddress: address,
            })
          )
        )
      : constSelector([]),
    (chainLoadables) => chainLoadables.flatMap((l) => l.valueMaybe() || [])
  )

  const hiddenTokens = useCachedLoadingWithError(
    uniquePublicKeys.loading
      ? undefined
      : uniquePublicKeys.data.length > 0
      ? waitForAny(
          uniquePublicKeys.data.map(({ publicKey }) =>
            hiddenBalancesSelector(publicKey)
          )
        )
      : constSelector([]),
    (chainLoadables) => chainLoadables.flatMap((l) => l.valueMaybe() || [])
  )

  return (
    <StatelessProfileWallet
      ProfileAddChains={ProfileAddChains}
      TokenLine={WalletTokenLine}
      accounts={accounts}
      hiddenTokens={hiddenTokens}
      tokens={tokens}
    />
  )
}
