import clsx from 'clsx'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { Logo } from '@dao-dao/ui'

import {
  convertDurationWithUnitsToHumanReadableString,
  convertThresholdValueToHumanReadableString,
  NewOrgStructure,
} from '@/atoms/newOrg'
import { CreateOrgFormWrapper } from '@/components/org/create/CreateOrgFormWrapper'
import { CreateOrgReviewStat } from '@/components/org/create/CreateOrgReviewStat'
import { VotingPowerPieDistribution } from '@/components/org/create/Distributions'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgReviewPage: FC = () => {
  const { watchedNewOrg, creating, formWrapperProps } = useCreateOrgForm(3)

  const governanceTokenEnabled =
    watchedNewOrg.structure === NewOrgStructure.UsingGovToken

  return (
    <>
      <SmallScreenNav />

      <CreateOrgFormWrapper {...formWrapperProps}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-t-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col gap-2 items-center text-center">
              <div
                className={clsx('overflow-hidden w-24 h-24 rounded-full', {
                  'animate-spin-medium': creating,
                })}
              >
                {watchedNewOrg.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Org Logo"
                    className="w-full h-full"
                    src={watchedNewOrg.imageUrl}
                  />
                ) : (
                  <Logo alt="DAO DAO logo" height="100%" width="100%" />
                )}
              </div>
              <p className="text-xl">{watchedNewOrg.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono caption-text">{i18n.t('DAO description')}</p>
              <p className="text-lg secondary-text">
                {watchedNewOrg.description}
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-card"></div>

          <div className="mx-auto w-5/6">
            <VotingPowerPieDistribution newOrg={watchedNewOrg} />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-around items-center p-5 rounded-b border border-t-0 border-inactive">
          <CreateOrgReviewStat
            title={i18n.t('Passing threshold')}
            value={convertThresholdValueToHumanReadableString(
              watchedNewOrg.thresholdQuorum.threshold
            )}
          />
          <CreateOrgReviewStat
            title={i18n.t('Quorum')}
            value={convertThresholdValueToHumanReadableString(
              watchedNewOrg.thresholdQuorum.quorum
            )}
          />
          <CreateOrgReviewStat
            title={i18n.t('Voting duration')}
            value={convertDurationWithUnitsToHumanReadableString(
              watchedNewOrg.votingDuration
            )}
          />
          {governanceTokenEnabled &&
            !!watchedNewOrg.governanceTokenOptions.proposalDeposit?.value && (
              <>
                <CreateOrgReviewStat
                  title={i18n.t('Proposal deposit')}
                  value={`${watchedNewOrg.governanceTokenOptions.proposalDeposit.value}`}
                />
                <CreateOrgReviewStat
                  title={i18n.t('Proposal deposit refund')}
                  value={
                    watchedNewOrg.governanceTokenOptions.proposalDeposit
                      .refundFailed
                      ? i18n.t('On')
                      : i18n.t('Off')
                  }
                />
              </>
            )}
          {governanceTokenEnabled && (
            <>
              <CreateOrgReviewStat title={i18n.t('Governance tokens')} value={i18n.t('Enabled')} />
              <CreateOrgReviewStat
                title={i18n.t('Unstaking period')}
                value={convertDurationWithUnitsToHumanReadableString(
                  watchedNewOrg.governanceTokenOptions.unregisterDuration
                )}
              />
            </>
          )}
        </div>
      </CreateOrgFormWrapper>
    </>
  )
}

export default CreateOrgReviewPage
