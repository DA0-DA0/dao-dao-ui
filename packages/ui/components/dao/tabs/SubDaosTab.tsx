import { PlusIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'

import { ButtonLink } from '../../Button'
import { GridCardContainer } from '../../GridCardContainer'
import { DaoCard, DaoCardProps } from '../DaoCard'

export interface SubDaosTabProps {
  subdaos: DaoCardProps[]
  isMember: boolean
  daoInfo: DaoInfo
}

export const SubDaosTab = ({ subdaos, isMember, daoInfo }: SubDaosTabProps) => {
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

      <p className="mb-6 text-text-body title-text">
        {t('title.numSubDaos', { count: subdaos.length })}
      </p>

      {subdaos.length ? (
        <GridCardContainer>
          {subdaos.map((props, index) => (
            <DaoCard {...props} key={index} />
          ))}
        </GridCardContainer>
      ) : (
        <p className="secondary-text">{t('info.noSubDaos')}</p>
      )}
    </>
  )
}
