import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import {
  Loader,
  ProposalDetails as OriginalProposalDetails,
  StakingMode,
} from '@dao-dao/ui'

import { BaseProposalDetailsProps } from '../../../types'

export const ProposalDetails = (props: BaseProposalDetailsProps) => (
  <OriginalProposalDetails
    {...props}
    stakingModal={
      <StakingModal
        connectWalletButton={<ConnectWalletButton className="!w-auto" />}
        coreAddress={props.coreAddress}
        loader={<Loader />}
        mode={StakingMode.Stake}
        onClose={() => props.setShowStaking(false)}
      />
    }
  />
)
