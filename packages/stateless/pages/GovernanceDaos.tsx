import { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import {
  DaoCardInfo,
  GridCardContainer,
  Loader,
  RightSidebarContent,
} from '../components'

export type GovernanceDaosProps = {
  daos: LoadingData<DaoCardInfo[]>
  DaoCard: ComponentType<DaoCardInfo>
  rightSidebarContent: ReactNode
}

export const GovernanceDaos = ({
  daos,
  DaoCard,
  rightSidebarContent,
}: GovernanceDaosProps) => {
  const { t } = useTranslation()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8">
        <p className="title-text">{t('title.governanceDaos')}</p>

        {daos.loading ? (
          <Loader />
        ) : (
          <GridCardContainer>
            {daos.data.map((props) => (
              <DaoCard key={props.coreAddress} {...props} />
            ))}
          </GridCardContainer>
        )}
      </div>
    </>
  )
}
