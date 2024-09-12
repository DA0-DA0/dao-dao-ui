import { ArrowDropDown } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  InputErrorMessage,
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

export type WithdrawRewardDistributionData = {
  address: string
  id: number
}

export type WithdrawRewardDistributionOptions = {
  /**
   * Existing reward distributions.
   */
  distributions: DaoRewardDistribution[]
}

export const WithdrawRewardDistributionComponent: ActionComponent<
  WithdrawRewardDistributionOptions
> = ({ fieldNamePrefix, isCreating, options: { distributions } }) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<WithdrawRewardDistributionData>()

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
        markdown={t('info.withdrawRewardDistributionExplanation')}
      />

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('title.distribution')} primary />

        {isCreating ? (
          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={distributions.map((distribution) => ({
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

      {isCreating &&
        selectedDistribution &&
        'immediate' in selectedDistribution.active_epoch.emission_rate && (
          <InputErrorMessage
            className="!mt-0 max-w-prose"
            error={t('info.cannotWithdrawImmediateRewardDistribution')}
          />
        )}
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