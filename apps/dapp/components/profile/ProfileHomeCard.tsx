// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'

import { useWalletBalance, useWalletProposalsQuery } from '@dao-dao/state'
import { ProfileHomeCard as StatelessProfileHomeCard } from '@dao-dao/ui'
import { NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { useDAppContext } from '../DAppContext'

export const ProfileHomeCard = () => {
  const { address = '', name = '' } = useWallet()
  const { walletBalance, walletStakedBalance } = useWalletBalance()

  const { inbox } = useDAppContext()

  const query = useWalletProposalsQuery(address)
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
      profileImgUrl={
        // TODO: Retrieve.
        undefined
      }
      tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
      walletAddress={address}
      walletName={name}
    />
  )
}
