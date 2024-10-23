import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoRewardsDistributorActiveDistributionsCardProps } from '@dao-dao/types'
import {
  getFallbackImage,
  getHumanReadableRewardDistributionLabel,
  getUniqueRewardDistributionKey,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { useQuerySyncedState } from '../../hooks'
import { Button } from '../buttons'
import { ErrorPage } from '../error'
import { LineLoaders } from '../LineLoader'

export const DaoRewardsDistributorActiveDistributionsCard = ({
  className,
  distributions,
  DaoRewardDistributionInfoModal,
}: DaoRewardsDistributorActiveDistributionsCardProps) => {
  const { t } = useTranslation()

  const [selected, setSelected] = useQuerySyncedState<string | undefined>({
    param: 'distribution',
    defaultValue: undefined,
  })

  const selectedDistribution =
    distributions.loading || distributions.errored
      ? undefined
      : selected
      ? distributions.data.find(
          (d) => selected === getUniqueRewardDistributionKey(d)
        )
      : undefined

  return (
    <>
      <div
        className={clsx(
          'bg-background-tertiary flex flex-col rounded-md p-4 gap-2',
          className
        )}
      >
        <p className="caption-text">
          {distributions.loading || distributions.errored
            ? t('title.activeDistributions')
            : t('title.numActiveDistributions', {
                count: distributions.data.length,
              })}
        </p>

        {distributions.loading ? (
          <LineLoaders lines={3} type="command" />
        ) : distributions.errored ? (
          <ErrorPage error={distributions.error} />
        ) : (
          <div className="styled-scrollbar flex flex-col gap-1 max-h-64 overflow-y-auto -mb-4 pb-4">
            {distributions.data.map((distribution) => (
              <Button
                key={distribution.id}
                onClick={() =>
                  setSelected(getUniqueRewardDistributionKey(distribution))
                }
                variant="ghost"
              >
                <div
                  className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${toAccessibleImageUrl(
                      distribution.token.imageUrl ||
                        getFallbackImage(distribution.token.denomOrAddress)
                    )})`,
                  }}
                ></div>

                <p className="truncate">
                  {getHumanReadableRewardDistributionLabel(t, distribution)}
                </p>
              </Button>
            ))}
          </div>
        )}
      </div>

      <DaoRewardDistributionInfoModal
        distribution={selectedDistribution}
        onClose={() => setSelected(undefined)}
      />
    </>
  )
}
