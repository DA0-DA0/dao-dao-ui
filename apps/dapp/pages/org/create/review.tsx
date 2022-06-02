import clsx from 'clsx'
import { FC } from 'react'

import { InputLabel, Logo } from '@dao-dao/ui'

import {
  convertDurationWithUnitsToHumanReadableString,
  convertThresholdValueToHumanReadableString,
  GovernanceTokenType,
} from '@/atoms/org'
import { CreateOrgHeader } from '@/components/org/create/CreateOrgHeader'
import { CreateOrgReviewStat } from '@/components/org/create/CreateOrgReviewStat'
import {
  TokenDistribution,
  VotingPowerDistribution,
} from '@/components/org/create/Distributions'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgReviewPage: FC = () => {
  const { formOnSubmit, watch, Navigation, creating } = useCreateOrgForm(2)

  const values = watch()

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form className="p-6 pt-2 mx-auto max-w-[800px]" onSubmit={formOnSubmit}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col gap-2 items-center text-center">
              <div
                className={clsx('overflow-hidden w-24 h-24 rounded-full', {
                  'animate-spin': creating,
                })}
              >
                {values.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Org Logo"
                    className="w-full h-full"
                    src={values.imageUrl}
                  />
                ) : (
                  <Logo alt="DAO DAO logo" height="100%" width="100%" />
                )}
              </div>
              <p className="text-xl">{values.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm" mono name="Description" />
              <p className="text-lg">{values.description}</p>
            </div>
          </div>

          {(!values.governanceTokenEnabled ||
            values.governanceTokenOptions.type === GovernanceTokenType.New) && (
            <>
              <div className="w-full h-[1px] bg-card"></div>

              <div className="mx-auto w-5/6">
                {values.governanceTokenEnabled &&
                values.governanceTokenOptions.type ===
                  GovernanceTokenType.New ? (
                  <TokenDistribution watch={watch} />
                ) : (
                  <VotingPowerDistribution watch={watch} />
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-around items-center p-5 rounded-b border border-t-0 border-inactive">
          <CreateOrgReviewStat
            title="Threshold"
            value={convertThresholdValueToHumanReadableString(
              values.thresholdQuorum.threshold
            )}
          />
          <CreateOrgReviewStat
            title="Quorum"
            value={convertThresholdValueToHumanReadableString(
              values.thresholdQuorum.quorum
            )}
          />
          <CreateOrgReviewStat
            title="Prop. duration"
            value={convertDurationWithUnitsToHumanReadableString(
              values.votingDuration
            )}
          />
          {values.governanceTokenEnabled &&
            !!values.governanceTokenOptions.proposalDeposit?.value && (
              <>
                <CreateOrgReviewStat
                  title="Prop. deposit"
                  value={`${values.governanceTokenOptions.proposalDeposit.value}`}
                />
                <CreateOrgReviewStat
                  title="Prop. refunds"
                  value={
                    values.governanceTokenOptions.proposalDeposit.refundFailed
                      ? 'Yes'
                      : 'No'
                  }
                />
              </>
            )}
          {values.governanceTokenEnabled && (
            <>
              <CreateOrgReviewStat title="Gov. tokens" value="Enabled" />
              <CreateOrgReviewStat
                title="Unregister duration"
                value={convertDurationWithUnitsToHumanReadableString(
                  values.governanceTokenOptions.unregisterDuration
                )}
              />
            </>
          )}
        </div>

        {Navigation}
      </form>
    </>
  )
}

export default CreateOrgReviewPage
