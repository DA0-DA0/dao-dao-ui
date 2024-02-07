import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo, LoadingData } from '@dao-dao/types'

import { DaoCardLoader, GridCardContainer } from '../components'

export type GovernanceDaosProps = {
  daos: LoadingData<DaoCardInfo[]>
  DaoCard: ComponentType<DaoCardInfo>
}

export const GovernanceDaos = ({ daos, DaoCard }: GovernanceDaosProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-start gap-8">
      <p className="title-text">{t('title.governanceDaos')}</p>

      <GridCardContainer>
        {daos.loading
          ? [...Array(3)].map((_, i) => <DaoCardLoader key={i} />)
          : daos.data.map((props) => (
              <DaoCard key={props.coreAddress} {...props} />
            ))}
      </GridCardContainer>
    </div>
  )
}
