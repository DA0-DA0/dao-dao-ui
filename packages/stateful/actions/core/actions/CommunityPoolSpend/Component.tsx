import { ComponentType } from 'react'

import { Coin, StatefulPayEntityDisplayProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type CommunityPoolSpendData = {
  authority: string
  recipient: string
  funds: Coin[]
}

export type CommunityPoolSpendOptions = {
  PayEntityDisplay: ComponentType<StatefulPayEntityDisplayProps>
}

export const CommunityPoolSpendComponent: ActionComponent<
  CommunityPoolSpendOptions
> = ({ options: { PayEntityDisplay }, data }) => (
  <PayEntityDisplay coins={data.funds} recipient={data.recipient} />
)
