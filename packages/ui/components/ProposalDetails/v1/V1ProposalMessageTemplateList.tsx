import { ComponentType, FC } from 'react'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { decodeMessages } from '@dao-dao/utils'

interface V1ProposalMessageTemplateListProps {
  msgs: CosmosMsgFor_Empty[]
  TemplateRendererComponent: ComponentType<{
    message: { [key: string]: any }
  }>
}

export const V1ProposalMessageTemplateList: FC<
  V1ProposalMessageTemplateListProps
> = ({ msgs, TemplateRendererComponent }) => (
  <>
    {msgs.map((msg, index) => (
      <div key={index}>
        <TemplateRendererComponent message={decodeMessages([msg])[0]} />
      </div>
    ))}
  </>
)
