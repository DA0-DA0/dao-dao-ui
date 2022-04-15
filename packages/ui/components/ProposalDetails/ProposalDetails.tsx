import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { FC } from 'react'
import { MarkdownPreview } from '../MarkdownPreview'
import { CosmosMessageDisplay } from '../CosmosMessageDisplay'
import { decodedMessagesString, decodeMessages } from '@dao-dao/utils'

export interface ProposalDetailsProps {
  proposal: ProposalResponse
}

export const ProposalDetails: FC<ProposalDetailsProps> = ({ proposal }) => {
  const decodedMessages = decodeMessages(proposal.msgs)

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="header-text">{proposal.title}</h1>
      </div>
      <div className="mt-6">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      <div className="mt-9 mb-3 font-mono caption-text">Messages</div>
      {decodedMessages?.length ? (
        <CosmosMessageDisplay value={decodedMessagesString(proposal.msgs)} />
      ) : (
        <pre>[]</pre>
      )}
    </div>
  )
}
