import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Coin,
  Entity,
  EntityType,
  LoadingData,
  StatefulPayEntityDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type CommunityPoolTransferData = {
  authority: string
  recipient: string
  funds: Coin[]
}

export type CommunityPoolTransferOptions = {
  entity: LoadingData<Entity>
  PayEntityDisplay: ComponentType<StatefulPayEntityDisplayProps>
}

export const CommunityPoolTransferComponent: ActionComponent<
  CommunityPoolTransferOptions
> = ({ options: { entity, PayEntityDisplay }, data }) => {
  const { t } = useTranslation()

  return (
    <>
      <PayEntityDisplay coins={data.funds} recipient={data.recipient} />

      {/* If transferring to x/gov module from community pool, explain why. */}
      {!entity.loading &&
        entity.data.type === EntityType.Module &&
        entity.data.name === 'gov' && (
          <p className="caption-text max-w-prose italic">
            {t('info.communityPoolTransferExplanation')}
          </p>
        )}
    </>
  )
}
