import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import {
  ProposalDetails as OriginalProposalDetails,
  StakingMode,
} from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseProposalDetailsProps } from '../../../types'

export const ProposalDetails = (props: BaseProposalDetailsProps) => {
  const { coreAddress, Loader } = useVotingModuleAdapterOptions()

  return (
    <OriginalProposalDetails
      {...props}
      Loader={Loader}
      coreAddress={coreAddress}
      stakingModal={
        <StakingModal
          connectWalletButton={<ConnectWalletButton />}
          coreAddress={coreAddress}
          loader={<Loader />}
          mode={StakingMode.Stake}
          onClose={() => props.setShowStaking(false)}
        />
      }
    />
  )
}
