import { walletProposalStatsSelector } from '@dao-dao/state/recoil'
import {
  ProfileHomeCard as StatelessProfileHomeCard,
  useAppContext,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import { useWalletInfo } from '../../hooks'

export const ProfileHomeCard = () => {
  const {
    walletAddress = '',
    walletProfileData,
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
      inboxPendingCount={inbox?.pendingItemCount ?? 0}
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
      tokenDecimals={NATIVE_TOKEN.decimals}
      tokenSymbol={NATIVE_TOKEN.symbol}
      updateProfileName={updateProfileName}
      walletProfileData={walletProfileData}
    />
  )
}
