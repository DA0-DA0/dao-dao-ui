import { PlusIcon } from '@heroicons/react/solid'
import { EscalatorWarning, Upgrade } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ContractVersion,
  DaoCardInfo,
  DaoInfo,
  LoaderProps,
  LoadingData,
} from '@dao-dao/tstypes'
import { Loader as DefaultLoader, NoContent } from '@dao-dao/ui'

import { ButtonLink } from '../../Button'
import { GridCardContainer } from '../../GridCardContainer'

export interface SubDaosTabProps {
  DaoCard: ComponentType<DaoCardInfo>
  subDaos: LoadingData<DaoCardInfo[]>
  isMember: boolean
  daoInfo: DaoInfo
  createSubDaoHref?: string
  upgradeToV2Href?: string
  Loader?: ComponentType<LoaderProps>
}

export const SubDaosTab = ({
  DaoCard,
  subDaos: subdaos,
  isMember,
  daoInfo,
  createSubDaoHref,
  upgradeToV2Href,
  Loader = DefaultLoader,
}: SubDaosTabProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-row gap-8 justify-between items-center pb-6">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
          <p className="text-text-body title-text">
            {t('title.createASubDao')}
          </p>
          <p className="secondary-text">{t('info.subDaoExplanation')}</p>
        </div>

        <ButtonLink
          className="shrink-0"
          // Disabled for v1 DAOs, not supported.
          disabled={!isMember || daoInfo.coreVersion === ContractVersion.V0_1_0}
          href={`/dao/${daoInfo.coreAddress}/create`}
        >
          <PlusIcon className="w-4 h-4" />
          {t('button.newSubDao')}
        </ButtonLink>
      </div>

      {daoInfo.coreVersion === ContractVersion.V0_1_0 ? (
        <NoContent
          Icon={Upgrade}
          actionNudge={t('info.submitUpgradeProposal')}
          body={t('error.daoFeatureUnsupported', {
            name: daoInfo.name,
            feature: t('title.subDaos'),
          })}
          buttonLabel={t('button.proposeUpgrade')}
          href={isMember ? upgradeToV2Href : undefined}
        />
      ) : subdaos.loading ? (
        <div className="pt-6 border-t border-border-secondary">
          <Loader fill={false} />
        </div>
      ) : subdaos.data.length > 0 ? (
        <>
          <p className="pt-6 mb-6 text-text-body border-t border-border-secondary title-text">
            {t('title.numSubDaos', { count: subdaos.data.length })}
          </p>

          <GridCardContainer>
            {subdaos.data.map((props, index) => (
              <DaoCard {...props} key={index} />
            ))}
          </GridCardContainer>
        </>
      ) : (
        <NoContent
          Icon={EscalatorWarning}
          actionNudge={t('info.createFirstOneQuestion')}
          body={t('info.noSubDaosYet')}
          buttonLabel={t('button.newSubDao')}
          href={isMember ? createSubDaoHref : undefined}
        />
      )}
    </>
  )
}
