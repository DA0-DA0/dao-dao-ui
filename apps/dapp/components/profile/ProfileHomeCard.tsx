// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'

import { useWalletBalance } from '@dao-dao/state'
import { ProfileHomeCard as StatelessProfileHomeCard } from '@dao-dao/ui'
import { NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

export const ProfileHomeCard = () => {
  const { address, name } = useWallet()
  const { walletBalance, walletStakedBalance } = useWalletBalance()

  return (
    <StatelessProfileHomeCard
      // TODO: Retrieve.
      established={new Date()}
      // TODO: Retrieve.
      inboxProposalCount={0}
      // TODO: Retrieve.
      numDaos={0}
      // TODO: Retrieve.
      numVotes={0}
      // TODO: Retrieve.
      profileImgUrl={undefined}
      stakedBalance={walletStakedBalance ?? 0}
      tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
      unstakedBalance={walletBalance ?? 0}
      walletAddress={address ?? ''}
      walletName={name ?? ''}
    />
  )
}
