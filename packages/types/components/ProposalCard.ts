import { ComponentType } from 'react'

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
}

export interface ProfileCardInfoLine {
  Icon: ComponentType<{ className: string }>
  label: string
}
