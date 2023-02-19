import { walletProposalStatsSelector } from '@dao-dao/state/recoil'
import {
  ProfileHomeCard as StatelessProfileHomeCard,
  useAppContext,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { NATIVE_DECIMALS, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { useWalletInfo } from '../../hooks'

export const ProfileHomeCard = () => {
  const {
    walletAddress = '',
    walletProfile,
    walletBalance,
    walletStakedBalance,
    dateBalancesFetched,
    updateProfileName,
  } = useWalletInfo()
  const { updateProfileNft, inbox } = useAppContext()

  const walletProposalStatsLoadable = useCachedLoadable(
    walletAddress
      ? walletProposalStatsSelector({
          address: walletAddress,
        })
      : undefined
  )

  return (
    <StatelessProfileHomeCard
      inboxProposalCount={inbox?.itemCount ?? 0}
      lazyData={
        walletBalance === undefined ||
        walletStakedBalance === undefined ||
        dateBalancesFetched === undefined
          ? { loading: true }
          : {
              loading: false,
              data: {
                unstakedBalance: walletBalance,
                stakedBalance: walletStakedBalance,
                dateBalancesFetched,
              },
            }
      }
      loadingStats={
        walletProposalStatsLoadable.state === 'loading'
          ? { loading: true }
          : {
              loading: false,
              data:
                walletProposalStatsLoadable.state === 'hasValue' &&
                walletProposalStatsLoadable.contents
                  ? {
                      proposalsCreated:
                        walletProposalStatsLoadable.contents.created,
                      votesCast: walletProposalStatsLoadable.contents.votesCast,
                    }
                  : undefined,
            }
      }
      showUpdateProfileNft={updateProfileNft.toggle}
      tokenDecimals={NATIVE_DECIMALS}
      tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
      updateProfileName={updateProfileName}
      walletProfile={walletProfile}
    />
  )
}
