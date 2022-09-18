import { PlusIcon } from '@heroicons/react/solid'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import { DaoCardInfo, LoaderProps, LoadingData } from '@dao-dao/tstypes'
import { Loader as DefaultLoader } from '@dao-dao/ui'

import { ButtonLink } from '../../Button'
import { GridCardContainer } from '../../GridCardContainer'

export interface SubDaosTabProps {
  DaoCard: ComponentType<DaoCardInfo>
  subDaos: LoadingData<DaoCardInfo[]>
  isMember: boolean
  daoInfo: DaoInfo
  Loader?: ComponentType<LoaderProps>
}

// TODO: Add upgrade info if DAO does not yet support subDAOs.
export const SubDaosTab = ({
  DaoCard,
  subDaos: subdaos,
  isMember,
  daoInfo,
  Loader = DefaultLoader,
}: SubDaosTabProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-row gap-8 justify-between items-center pb-6 mb-6 border-b border-b-border-secondary">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
          <p className="text-text-body title-text">
            {t('title.createASubDao')}
          </p>
          <p className="secondary-text">{t('info.subDaoExplanation')}</p>
        </div>

        <ButtonLink
          className="shrink-0"
          disabled={!isMember}
          href={`/dao/${daoInfo.coreAddress}/subdaos/create`}
        >
          <PlusIcon className="w-4 h-4" />
          {t('button.newSubDao')}
        </ButtonLink>
      </div>

      {subdaos.loading ? (
        <Loader fill={false} />
      ) : (
        <>
          <p className="mb-6 text-text-body title-text">
            {t('title.numSubDaos', { count: subdaos.data.length })}
          </p>

          {subdaos.data.length ? (
            <GridCardContainer>
              {subdaos.data.map((props, index) => (
                <DaoCard {...props} key={index} />
              ))}
            </GridCardContainer>
          ) : (
            <p className="secondary-text">{t('info.noSubDaos')}</p>
          )}
        </>
      )}
    </>
  )
}
