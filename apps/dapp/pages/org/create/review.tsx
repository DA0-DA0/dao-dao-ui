import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { InputLabel } from '@dao-dao/ui'

import {
  convertDurationWithUnitsToHumanReadableString,
  convertThresholdValueToHumanReadableString,
} from '@/atoms/org'
import { CreateOrgHeader } from '@/components/org/create/CreateOrgHeader'
import { CreateOrgReviewStat } from '@/components/org/create/CreateOrgReviewStat'
import {
  TokenDistributionPie,
  TokenDistributionPieLegend,
} from '@/components/org/create/TokenDistributionPie'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { useCreateOrgForm } from '@/hooks/useCreateOrgForm'

const CreateOrgReviewPage: FC = () => {
  const { formOnSubmit, watch, Navigation, creating } = useCreateOrgForm(2)

  const values = watch()

  const pieSections = useMemo(
    () =>
      values.groups
        .map(({ name, weight }, index) => ({
          name,
          percent: weight,
          color: colors[index % colors.length],
        }))
        .sort((a, b) => b.percent - a.percent),
    [values.groups]
  )

  return (
    <>
      <SmallScreenNav />
      <CreateOrgHeader />

      <form className="p-6 pt-2 mx-auto max-w-[800px]" onSubmit={formOnSubmit}>
        <div className="flex flex-col gap-6 items-stretch py-6 bg-disabled rounded-lg md:gap-10 md:py-10">
          <div className="grid grid-cols-[1fr_2fr] gap-16 justify-center items-center mx-auto w-5/6">
            <div className="flex flex-col gap-2 items-center text-center">
              <div className={clsx({ 'animate-spin': creating })}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Org Logo"
                  className="w-24 h-24 rounded-full"
                  src={values.imageUrl}
                />
              </div>
              <p className="text-xl">{values.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm" mono name="Description" />
              <p className="text-lg">{values.description}</p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-card"></div>

          <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center mx-auto w-5/6 md:gap-x-16 md:gap-y-8">
            <InputLabel
              className="text-sm text-center"
              labelProps={{ className: 'justify-center' }}
              mono
              name="Voting Distribution"
            />
            <InputLabel className="text-sm text-center" mono name="Roles" />

            <TokenDistributionPie segments={pieSections} />
            <TokenDistributionPieLegend segments={pieSections} />
          </div>
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

const colors = [
  '#FC82A4',
  '#954EE8',
  '#DC30D3',
  '#FD6386',
  'rgba(243, 246, 248, 0.08)',
]
