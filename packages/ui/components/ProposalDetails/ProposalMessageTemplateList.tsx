import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { FC, ReactNode } from 'react'
import { decodeMessages } from '@dao-dao/utils'

interface ProposalMessageTemplateListProps {
  msgs: CosmosMsgFor_Empty[]
  messageToDisplay: (message: { [key: string]: any }) => ReactNode
}

export const ProposalMessageTemplateList: FC<
  ProposalMessageTemplateListProps
> = ({ msgs, messageToDisplay }: ProposalMessageTemplateListProps) => {
  const components: ReactNode[] = msgs.map((msg, index) => {
    const decoded = decodeMessages([msg])[0]
    return <div key={index}>{messageToDisplay(decoded)}</div>
  })

  return <>{components}</>
}
