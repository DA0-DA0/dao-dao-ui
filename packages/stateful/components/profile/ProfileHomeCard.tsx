import { useWalletProposalsQuery } from '@dao-dao/state'
import {
  ProfileHomeCard as StatelessProfileHomeCard,
  useAppLayoutContext,
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
  const { updateProfileNft, inbox } = useAppLayoutContext()

  const query = useWalletProposalsQuery(walletAddress)
  const data = query.data || query.previousData

  return (
    <StatelessProfileHomeCard
      inboxProposalCount={inbox.proposalCount}
      lazyData={
        !data ||
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
                proposalsCreated: data.proposalsCreated.totalCount,
                votesCast: data.proposalVotes.totalCount,
              },
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
