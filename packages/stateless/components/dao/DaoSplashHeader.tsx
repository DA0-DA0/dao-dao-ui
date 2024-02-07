import { WarningRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoSplashHeaderProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { DaoHeader } from './DaoHeader'

export const DaoSplashHeader = ({
  daoInfo,
  follow,
  ButtonLink,
  LinkWrapper,
  parentProposalRecognizeSubDaoHref,
}: DaoSplashHeaderProps) => {
  const { t } = useTranslation()

  return (
    <>
      {!daoInfo.isActive && daoInfo.activeThreshold && (
        <div className="mb-2 flex flex-row items-center justify-center gap-3 rounded-md bg-background-interactive-warning p-3 md:gap-2">
          <WarningRounded className="!h-10 !w-10 text-icon-interactive-warning md:!h-6 md:!w-6" />

          <p className="text-text-interactive-warning-body">
            {t('error.daoIsInactive', {
              context:
                'percentage' in daoInfo.activeThreshold
                  ? 'percent'
                  : 'absolute',
              percent:
                'percentage' in daoInfo.activeThreshold
                  ? formatPercentOf100(
                      Number(daoInfo.activeThreshold.percentage.percent) * 100
                    )
                  : undefined,
              count:
                'percentage' in daoInfo.activeThreshold
                  ? undefined
                  : Number(daoInfo.activeThreshold.absolute_count.count),
            })}
          </p>
        </div>
      )}

      {daoInfo.parentDao && !daoInfo.parentDao.registeredSubDao && (
        <ButtonLink
          center
          className="mb-4 bg-background-interactive-warning"
          contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
          href={parentProposalRecognizeSubDaoHref}
          size="none"
          variant="none"
        >
          <WarningRounded className="!h-14 !w-14 text-icon-interactive-warning md:!h-10 md:!w-10" />

          <p className="text-text-interactive-warning-body">
            {t('info.subDaoNotYetRecognized', {
              parent: daoInfo.parentDao.name,
              child: daoInfo.name,
            })}

            {!!parentProposalRecognizeSubDaoHref && (
              <span className="font-bold">
                {' ' + t('button.clickHereToProposeRecognizingIt')}
              </span>
            )}
          </p>
        </ButtonLink>
      )}

      <DaoHeader
        LinkWrapper={LinkWrapper}
        coreAddress={daoInfo.coreAddress}
        description={daoInfo.description}
        follow={follow}
        imageUrl={daoInfo.imageUrl}
        name={daoInfo.name}
        parentDao={daoInfo.parentDao}
      />
    </>
  )
}
