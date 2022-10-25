import { ComponentType } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface ProposalCardProps {
  dao: {
    coreAddress: string
    imageUrl: string | undefined | null
  }
  id: string
  title: string
  description: string
  info: ProfileCardInfoLine[]

  className?: string
  onMouseOver?: () => void
  onMouseLeave?: () => void
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export interface ProfileCardInfoLine {
  Icon: ComponentType<{ className: string }>
  label: string
}
