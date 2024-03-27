import { ComponentType } from 'react'

import { LoadingData } from '../misc'
import { GenericToken } from '../token'
import { ButtonLinkProps } from './Buttonifier'
import { Entity } from './EntityDisplay'

export type DaoMemberCardProps = {
  address: string
  balanceLabel: string
  balance: LoadingData<{
    amount: number
    token?: GenericToken
  }>
  votingPowerPercent: LoadingData<number>
  loadingEntity: LoadingData<Entity>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulDaoMemberCardProps = Omit<
  DaoMemberCardProps,
  'loadingEntity' | 'ButtonLink'
>
