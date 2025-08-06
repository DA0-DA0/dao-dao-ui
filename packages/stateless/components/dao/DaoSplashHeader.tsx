import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoSplashHeaderProps } from '@dao-dao/types'
import {
  MISCONFIGURED_DAOS,
  UNDO_PAGE_PADDING_TOP_CLASSES,
  formatPercentOf100,
} from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { DaoHeader } from './DaoHeader'

export const DaoSplashHeader = ({
  dao,
  follow,
  ButtonLink,
  LinkWrapper,
  parentProposalRecognizeSubDaoHref,
  proposeUpdateAdminToParentHref,
  initialActionsVerified,
}: DaoSplashHeaderProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  // Show warning if the DAO is inactive and has an active threshold.
  const showInactiveWarning = !dao.info.isActive && !!dao.info.activeThreshold
  // Show warning if user has not verified the initial actions for this DAO and
  // the DAO was created within the last 30 days.
  const showInitialActionsNotVerifiedWarning =
    dao.info.initialActions.length > 0 &&
    !initialActionsVerified &&
    !!dao.info.created &&
    dao.info.created >= Date.now() - 30 * 24 * 60 * 60 * 1_000
  // Show warning if the DAO has a parent DAO and the parent DAO is not
  // recognized.
  const showSubDaoNotRecognizedWarning =
    !!dao.info.parentDao && !dao.info.parentDao.registeredSubDao
  // Show warning if the DAO is its own contract admin but it has a parent DAO
  // who should be the contract admin.
  const showParentDaoNotAdminWarning =
    !!dao.info.parentDao && dao.info.contractAdmin === dao.coreAddress

  // Show warning and potentially redirect to correct DAO if DAO is
  // misconfigured and should not be used.
  const misconfiguredDao = MISCONFIGURED_DAOS.find(
    (misconfiguredDao) =>
      misconfiguredDao.chainId === dao.chainId &&
      misconfiguredDao.coreAddress === dao.coreAddress
  )

  const warningVisible =
    showInactiveWarning ||
    showInitialActionsNotVerifiedWarning ||
    showSubDaoNotRecognizedWarning ||
    showParentDaoNotAdminWarning ||
    !!misconfiguredDao

  return (
    <>
      {warningVisible && (
        <div
          className={clsx(
            'flex flex-col gap-6 mb-8 pt-4',
            // If banner is set, add extra margin below banners since the banner
            // has a negative top margin to account for page padding.
            !!dao.bannerImageUrl && 'sm:mb-14',
            UNDO_PAGE_PADDING_TOP_CLASSES
          )}
        >
          {/* Show DAO redirect for misconfigured Thorchain Liquidy DAO. */}
          {misconfiguredDao && (
            <ButtonLink
              center
              className="bg-background-interactive-warning"
              contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
              href={
                misconfiguredDao.redirectDao
                  ? getDaoPath(misconfiguredDao.redirectDao)
                  : undefined
              }
              size="none"
              variant="none"
            >
              <WarningRounded className="text-icon-interactive-warning !h-14 !w-14 md:!h-10 md:!w-10" />

              <p className="text-text-interactive-warning-body">
                {t('info.daoMisconfigured', {
                  context: misconfiguredDao.redirectDao
                    ? 'redirect'
                    : undefined,
                })}
              </p>
            </ButtonLink>
          )}

          {showInactiveWarning && (
            <div className="bg-background-interactive-warning flex flex-row items-center justify-center gap-3 rounded-md p-3 md:gap-2">
              <WarningRounded className="text-icon-interactive-warning !h-10 !w-10 md:!h-6 md:!w-6" />

              <p className="text-text-interactive-warning-body">
                {t('error.daoIsInactive', {
                  context:
                    'percentage' in dao.info.activeThreshold!
                      ? 'percent'
                      : 'absolute',
                  percent:
                    'percentage' in dao.info.activeThreshold!
                      ? formatPercentOf100(
                          Number(dao.info.activeThreshold.percentage.percent) *
                            100
                        )
                      : undefined,
                  count:
                    'percentage' in dao.info.activeThreshold!
                      ? undefined
                      : Number(dao.info.activeThreshold!.absolute_count.count),
                })}
              </p>
            </div>
          )}

          {showInitialActionsNotVerifiedWarning && (
            <div className="bg-background-interactive-warning flex flex-row items-center justify-center gap-3 rounded-md p-3 md:gap-2">
              <WarningRounded className="text-icon-interactive-warning !h-10 !w-10 md:!h-6 md:!w-6" />

              <p className="text-text-interactive-warning-body">
                {t('error.initialActionsNotVerified')}
              </p>
            </div>
          )}

          {showSubDaoNotRecognizedWarning && (
            <ButtonLink
              center
              className="bg-background-interactive-warning"
              contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
              href={parentProposalRecognizeSubDaoHref}
              size="none"
              variant="none"
            >
              <WarningRounded className="text-icon-interactive-warning !h-14 !w-14 md:!h-10 md:!w-10" />

              <p className="text-text-interactive-warning-body">
                {t('info.subDaoNotYetRecognized', {
                  parent: dao.info.parentDao!.name,
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

          {showParentDaoNotAdminWarning && (
            <ButtonLink
              center
              className="bg-background-interactive-warning"
              contentContainerClassName="p-3 !gap-4 md:!gap-3 text-center"
              href={proposeUpdateAdminToParentHref}
              size="none"
              variant="none"
            >
              <WarningRounded className="text-icon-interactive-warning !h-14 !w-14 md:!h-10 md:!w-10" />

              <p className="text-text-interactive-warning-body">
                {t('info.parentDaoNotAdmin', {
                  parent: dao.info.parentDao!.name,
                  child: dao.name,
                })}

                {!!proposeUpdateAdminToParentHref && (
                  <span className="font-bold">
                    {' ' +
                      t('button.clickHereToProposeSettingAdminToParent', {
                        parent: dao.info.parentDao!.name,
                      })}
                  </span>
                )}
              </p>
            </ButtonLink>
          )}
        </div>
      )}

      <DaoHeader
        LinkWrapper={LinkWrapper}
        bannerImageUrl={dao.bannerImageUrl}
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
