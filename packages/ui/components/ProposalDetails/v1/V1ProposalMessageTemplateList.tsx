import { FC } from 'react'

import { TemplateRenderer } from '@dao-dao/templates'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { decodeMessages, VotingModuleType } from '@dao-dao/utils'

interface V1ProposalMessageTemplateListProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  msgs: CosmosMsgFor_Empty[]
}

export const V1ProposalMessageTemplateList: FC<
  V1ProposalMessageTemplateListProps
> = ({ coreAddress, votingModuleType, msgs }) => (
  <>
    {msgs.map((msg, index) => (
      <div key={index}>
        <TemplateRenderer
          coreAddress={coreAddress}
          message={decodeMessages([msg])[0]}
          votingModuleType={votingModuleType}
        />
      </div>
    ))}
  </>
)
