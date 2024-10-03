import { WarningRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoSplashHeaderProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { DaoHeader } from './DaoHeader'

export const DaoSplashHeader = ({
  dao,
  follow,
  ButtonLink,
  LinkWrapper,
  parentProposalRecognizeSubDaoHref,
  proposeUpdateAdminToParentHref,
}: DaoSplashHeaderProps) => {
  const { t } = useTranslation()

  return (
    <>
      {!dao.info.isActive && dao.info.activeThreshold && (
        <div className="mb-10 -mt-4 flex flex-row items-center justify-center gap-3 rounded-md bg-background-interactive-warning p-3 md:gap-2">
          <WarningRounded className="!h-10 !w-10 text-icon-interactive-warning md:!h-6 md:!w-6" />

          <p className="text-text-interactive-warning-body">
            {t('error.daoIsInactive', {
              context:
                'percentage' in dao.info.activeThreshold
                  ? 'percent'
                  : 'absolute',
              percent:
                'percentage' in dao.info.activeThreshold
                  ? formatPercentOf100(
                      Number(dao.info.activeThreshold.percentage.percent) * 100
                    )
                  : undefined,
              count:
                'percentage' in dao.info.activeThreshold
                  ? undefined
                  : Number(dao.info.activeThreshold.absolute_count.count),
            })}
          </p>
        </div>
      )}

      {dao.info.parentDao && !dao.info.parentDao.registeredSubDao && (
        <ButtonLink
          center
          className="mb-10 -mt-4 bg-background-interactive-warning"
          contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
          href={parentProposalRecognizeSubDaoHref}
          size="none"
          variant="none"
        >
          <WarningRounded className="!h-14 !w-14 text-icon-interactive-warning md:!h-10 md:!w-10" />

          <p className="text-text-interactive-warning-body">
            {t('info.subDaoNotYetRecognized', {
              parent: dao.info.parentDao.name,
              child: dao.name,
            })}

            {!!parentProposalRecognizeSubDaoHref && (
              <span className="font-bold">
                {' ' + t('button.clickHereToProposeRecognizingIt')}
              </span>
            )}
          </p>
        </ButtonLink>
      )}

      {dao.info.parentDao && dao.info.contractAdmin === dao.coreAddress && (
        <ButtonLink
          center
          className="mb-10 -mt-4 bg-background-interactive-warning"
          contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
          href={proposeUpdateAdminToParentHref}
          size="none"
          variant="none"
        >
          <WarningRounded className="!h-14 !w-14 text-icon-interactive-warning md:!h-10 md:!w-10" />

          <p className="text-text-interactive-warning-body">
            {t('info.parentDaoNotAdmin', {
              parent: dao.info.parentDao.name,
              child: dao.name,
            })}

            {!!proposeUpdateAdminToParentHref && (
              <span className="font-bold">
                {' ' +
                  t('button.clickHereToProposeSettingAdminToParent', {
                    parent: dao.info.parentDao.name,
                  })}
              </span>
            )}
          </p>
        </ButtonLink>
      )}

      <DaoHeader
        LinkWrapper={LinkWrapper}
        coreAddress={dao.coreAddress}
        description={dao.description}
        follow={follow}
        imageUrl={dao.imageUrl}
        name={dao.name}
        parentDao={dao.info.parentDao}
      />
    </>
  )
}
