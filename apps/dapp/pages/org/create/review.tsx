import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { InputLabel, Logo } from '@dao-dao/ui'

import {
  convertDurationWithUnitsToHumanReadableString,
  convertThresholdValueToHumanReadableString,
  GovernanceTokenType,
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

  const pieData = useMemo(() => {
    const initialTreasuryBalance =
      values.governanceTokenEnabled &&
      values.governanceTokenOptions.type === GovernanceTokenType.New
        ? values.governanceTokenOptions.newGovernanceToken
            .initialTreasuryBalance
        : 0

    const totalWeight =
      (values.groups.reduce(
        (acc, { weight, members }) => acc + weight * members.length,
        0
      ) || 0) + initialTreasuryBalance
    console.log(initialTreasuryBalance, totalWeight)

    // If one group case, specially handle and display all members.
    const onlyOneGroup = values.groups.length === 1

    const segments = values.groups
      .flatMap(({ weight, members }, groupIndex) =>
        members.map((_, memberIndex) => ({
          percent: (weight / totalWeight) * 100,
          color:
            colors[(onlyOneGroup ? memberIndex : groupIndex) % colors.length],
        }))
      )
      .sort((a, b) => b.percent - a.percent)
    const legend = (
      onlyOneGroup
        ? values.groups[0].members.map(({ address }, memberIndex) => ({
            name: address,
            percent: (values.groups[0].weight / totalWeight) * 100,
            color: colors[memberIndex % colors.length],
          }))
        : values.groups.map(({ name, weight, members }, groupIndex) => ({
            name,
            percent: ((weight * members.length) / totalWeight) * 100,
            color: colors[groupIndex % colors.length],
          }))
    ).sort((a, b) => b.percent - a.percent)

    // Add treasury to the beginning if exists.
    if (initialTreasuryBalance) {
      const segmentData = {
        name: 'Treasury',
        percent: (initialTreasuryBalance / totalWeight) * 100,
        color: `rgba(${getComputedStyle(document.body).getPropertyValue(
          '--dark'
        )}, 0.08)`,
      }
      segments.splice(0, 0, segmentData)
      legend.splice(0, 0, segmentData)
    }

    return { segments, legend }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Groups reference does not change even if contents do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    values.groups
      .map(
        ({ weight, members }, idx) => `${idx}:${weight}:${members.join('_')}`
      )
      .join(),
    values.governanceTokenEnabled,
    values.governanceTokenOptions.type,
    values.governanceTokenOptions.newGovernanceToken.initialTreasuryBalance,
  ])

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

          <div className="w-full h-[1px] bg-card"></div>

          <div className="grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-8 gap-y-4 items-center mx-auto w-5/6 md:gap-x-16 md:gap-y-8">
            <InputLabel
              className="text-sm text-center"
              labelProps={{ className: 'justify-center' }}
              mono
              name={
                values.governanceTokenEnabled
                  ? 'Token Distribution'
                  : 'Voting Power Distribution'
              }
            />
            <InputLabel className="text-sm text-center" mono name="Roles" />

            <TokenDistributionPie data={pieData.segments} />
            <TokenDistributionPieLegend data={pieData.legend} />
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
