import { ComponentType } from 'react'

import { LoadingData } from '../misc'
import { ButtonLinkProps } from './Buttonifier'
import { Entity } from './EntityDisplay'

export type DaoMemberCardProps = {
  address: string
  balance: {
    label: string
    unit?: string
    value: LoadingData<string>
  }
  votingPowerPercent: LoadingData<number>
  loadingEntity: LoadingData<Entity>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulDaoMemberCardProps = Omit<
  DaoMemberCardProps,
  'loadingEntity' | 'ButtonLink'
>
