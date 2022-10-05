// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWalletProfile, useWalletProposalsQuery } from '@dao-dao/state'
import {
  ProfileHomeCard as StatelessProfileHomeCard,
  useAppLayoutContext,
} from '@dao-dao/ui'
import { NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { useDAppContext } from '../DAppContext'

export const ProfileHomeCard = () => {
  const {
    walletAddress = '',
    walletProfile,
    walletBalance,
    walletStakedBalance,
  } = useWalletProfile()
  const { updateProfile } = useAppLayoutContext()

  const { inbox } = useDAppContext()

  const query = useWalletProposalsQuery(walletAddress)
  const data = query.data || query.previousData

  return (
    <StatelessProfileHomeCard
      established={
        // TODO: Retrieve.
        new Date()
      }
      inboxProposalCount={inbox.proposalCount}
      lazyData={
        !data ||
        walletBalance === undefined ||
        walletStakedBalance === undefined
          ? { loading: true }
          : {
              loading: false,
              data: {
                unstakedBalance: walletBalance,
                stakedBalance: walletStakedBalance,
                proposalsCreated: data.proposalsCreated.totalCount,
                votesCast: data.proposalVotes.totalCount,
              },
            }
      }
      showUpdateProfile={updateProfile.toggle}
      tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
      walletAddress={walletAddress}
      walletProfile={walletProfile}
    />
  )
}
