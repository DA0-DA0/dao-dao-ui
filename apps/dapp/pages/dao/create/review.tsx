import clsx from 'clsx'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { Logo } from '@dao-dao/ui'

import {
  NewDAOStructure,
  convertDurationWithUnitsToHumanReadableString,
  convertThresholdValueToHumanReadableString,
} from '@/atoms'
import {
  CreateDAOFormWrapper,
  CreateDAOReviewStat,
  SmallScreenNav,
  VotingPowerPieDistribution,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOReviewPage: FC = () => {
  const { watchedNewDAO, creating, formWrapperProps } = useCreateDAOForm(3)

  const governanceTokenEnabled =
    watchedNewDAO.structure === NewDAOStructure.UsingGovToken

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-t-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col gap-2 items-center text-center">
              <div
                className={clsx('overflow-hidden w-24 h-24 rounded-full', {
                  'animate-spin-medium': creating,
                })}
              >
                {watchedNewDAO.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="DAO Logo"
                    className="w-full h-full"
                    src={watchedNewDAO.imageUrl}
                  />
                ) : (
                  <Logo alt="DAO DAO logo" height="100%" width="100%" />
                )}
              </div>
              <p className="text-xl">{watchedNewDAO.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono caption-text">
                {i18n.t('DAO description')}
              </p>
              <p className="text-lg secondary-text">
                {watchedNewDAO.description}
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-card"></div>

          <div className="mx-auto w-5/6">
            <VotingPowerPieDistribution newDAO={watchedNewDAO} />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-around items-center p-5 rounded-b border border-t-0 border-inactive">
          <CreateDAOReviewStat
            title={i18n.t('Passing threshold')}
            value={convertThresholdValueToHumanReadableString(
              watchedNewDAO.thresholdQuorum.threshold
            )}
          />
          <CreateDAOReviewStat
            title={i18n.t('Quorum')}
            value={convertThresholdValueToHumanReadableString(
              watchedNewDAO.thresholdQuorum.quorum
            )}
          />
          <CreateDAOReviewStat
            title={i18n.t('Voting duration')}
            value={convertDurationWithUnitsToHumanReadableString(
              watchedNewDAO.votingDuration
            )}
          />
          {governanceTokenEnabled &&
            !!watchedNewDAO.governanceTokenOptions.proposalDeposit?.value && (
              <>
                <CreateDAOReviewStat
                  title={i18n.t('Proposal deposit')}
                  value={`${watchedNewDAO.governanceTokenOptions.proposalDeposit.value}`}
                />
                <CreateDAOReviewStat
                  title={i18n.t('Proposal deposit refund')}
                  value={
                    watchedNewDAO.governanceTokenOptions.proposalDeposit
                      .refundFailed
                      ? i18n.t('On')
                      : i18n.t('Off')
                  }
                />
              </>
            )}
          {governanceTokenEnabled && (
            <>
              <CreateDAOReviewStat
                title={i18n.t('Governance tokens')}
                value={i18n.t('Enabled')}
              />
              <CreateDAOReviewStat
                title={i18n.t('Unstaking period')}
                value={convertDurationWithUnitsToHumanReadableString(
                  watchedNewDAO.governanceTokenOptions.unregisterDuration
                )}
              />
            </>
          )}
        </div>
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOReviewPage
