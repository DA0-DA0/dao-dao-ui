import { ProposalDetails as OriginalProposalDetails } from '@dao-dao/ui'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import { BaseProposalDetailsProps } from '../../../types'

export const ProposalDetails = (props: BaseProposalDetailsProps) => {
  const { coreAddress, Loader } = useVotingModuleAdapterOptions()

  return (
    <OriginalProposalDetails
      {...props}
      Loader={Loader}
      coreAddress={coreAddress}
    />
  )
}
