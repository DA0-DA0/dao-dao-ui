import { ComponentType, FC } from 'react'

import { TemplateRendererComponentProps } from '@dao-dao/templates'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { decodeMessages, VotingModuleType } from '@dao-dao/utils'

import { SuspenseLoaderProps } from '../../..'

interface V1ProposalMessageTemplateListProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  msgs: CosmosMsgFor_Empty[]
  TemplateRendererComponent: ComponentType<TemplateRendererComponentProps>
  SuspenseLoader: ComponentType<
    Omit<SuspenseLoaderProps, 'ErrorBoundaryComponent'>
  >
}

export const V1ProposalMessageTemplateList: FC<
  V1ProposalMessageTemplateListProps
> = ({
  coreAddress,
  votingModuleType,
  msgs,
  TemplateRendererComponent,
  SuspenseLoader,
}) => (
  <>
    {msgs.map((msg, index) => (
      <div key={index}>
        <TemplateRendererComponent
          SuspenseLoader={SuspenseLoader}
          coreAddress={coreAddress}
          message={decodeMessages([msg])[0]}
          votingModuleType={votingModuleType}
        />
      </div>
    ))}
  </>
)
