import { ArrowDropDown } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  InputLabel,
  InputThemedText,
  MarkdownRenderer,
} from '@dao-dao/stateless'
import { DaoRewardDistribution } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getFallbackImage,
  getHumanReadableRewardDistributionLabel,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

export type PauseRewardDistributionData = {
  address: string
  id: number
}

export type PauseRewardDistributionOptions = {
  /**
   * Existing reward distributions.
   */
  distributions: DaoRewardDistribution[]
}

export const PauseRewardDistributionComponent: ActionComponent<
  PauseRewardDistributionOptions
> = ({ fieldNamePrefix, isCreating, options: { distributions } }) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<PauseRewardDistributionData>()

  const address = watch((fieldNamePrefix + 'address') as 'address')
  const id = watch((fieldNamePrefix + 'id') as 'id')

  const selectedDistribution = distributions.find(
    (distribution) => distribution.address === address && distribution.id === id
  )

  const selectedDistributionDisplay = selectedDistribution && (
    <>
      <div
        className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${toAccessibleImageUrl(
            selectedDistribution.token.imageUrl ||
              getFallbackImage(selectedDistribution.token.denomOrAddress)
          )})`,
        }}
      ></div>

      {getHumanReadableRewardDistributionLabel(t, selectedDistribution)}
    </>
  )

  return (
    <>
      <MarkdownRenderer
        className="body-text text-text-secondary"
        markdown={t('info.pauseRewardDistributionExplanation')}
      />

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('title.distribution')} primary />

        {isCreating ? (
          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={distributions
              .filter((d) => !('paused' in d.active_epoch.emission_rate))
              .map((distribution) => ({
                key: distribution.address + distribution.id,
                selected: selectedDistribution === distribution,
                iconUrl:
                  distribution.token.imageUrl ||
                  getFallbackImage(distribution.token.denomOrAddress),
                label: getHumanReadableRewardDistributionLabel(t, distribution),
                ...distribution,
              }))}
            onSelect={({ address, id }) => {
              setValue((fieldNamePrefix + 'address') as 'address', address)
              setValue((fieldNamePrefix + 'id') as 'id', id)
            }}
            trigger={{
              type: 'button',
              props: {
                className: 'self-start',
                variant: !address ? 'primary' : 'ghost_outline',
                size: 'lg',
                children: selectedDistribution ? (
                  <>
                    {selectedDistributionDisplay}
                    <ArrowDropDown className="!h-6 !w-6 text-icon-primary" />
                  </>
                ) : (
                  t('button.chooseDistribution')
                ),
              },
            }}
          />
        ) : (
          <InputThemedText className="!py-2 !px-3">
            {selectedDistributionDisplay}
          </InputThemedText>
        )}
      </div>
    </>
  )
}

const FILTERABLE_KEYS = [
  'label',
  'address',
  'id',
  'chainId',
  'token.symbol',
  'token.denomOrAddress',
]
