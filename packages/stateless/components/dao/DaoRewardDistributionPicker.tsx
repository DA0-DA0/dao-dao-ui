import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterableItemPopup, InputThemedText } from '@dao-dao/stateless'
import { ButtonifierProps, DaoRewardDistribution } from '@dao-dao/types'
import {
  getFallbackImage,
  getHumanReadableRewardDistributionLabel,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

export type DaoRewardDistributionPickerProps<T extends DaoRewardDistribution> =
  {
    /**
     * Distributions to display.
     */
    distributions: T[]
    /**
     * Distribution currently selected.
     */
    selectedDistribution?: T
    /**
     * Callback when a distribution is selected.
     */
    onSelect: (distribution: T) => void
    /**
     * Whether the picker is disabled.
     */
    disabled?: boolean
    /**
     * The select button variant.
     */
    selectButtonVariant?: ButtonifierProps['variant']
    /**
     * The select button class name.
     */
    selectButtonClassName?: string
    /**
     * The select button content container class name.
     */
    selectButtonContentContainerClassName?: string
    /**
     * Optionally add description to the distribution picker list items.
     */
    getDescription?: (distribution: T) => ReactNode
  }

export const DaoRewardDistributionPicker = <T extends DaoRewardDistribution>({
  distributions,
  selectedDistribution,
  onSelect,
  disabled,
  selectButtonVariant = 'primary',
  selectButtonClassName,
  selectButtonContentContainerClassName,
  getDescription,
}: DaoRewardDistributionPickerProps<T>) => {
  const { t } = useTranslation()

  const selectedDistributionDisplay = selectedDistribution && (
    <div className="flex flex-row gap-2 items-center">
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
    </div>
  )

  return disabled ? (
    <InputThemedText className="!py-2 !px-3">
      {selectedDistributionDisplay}
    </InputThemedText>
  ) : (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={distributions.map((distribution) => ({
        key: distribution.address + distribution.id,
        selected: selectedDistribution === distribution,
        iconUrl: toAccessibleImageUrl(
          distribution.token.imageUrl ||
            getFallbackImage(distribution.token.denomOrAddress)
        ),
        label: getHumanReadableRewardDistributionLabel(t, distribution),
        description: getDescription?.(distribution),
        distribution,
      }))}
      onSelect={({ distribution }) => onSelect(distribution)}
      trigger={{
        type: 'button',
        props: {
          className: clsx(selectButtonClassName, 'self-start'),
          contentContainerClassName: selectButtonContentContainerClassName,
          variant: selectButtonVariant,
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
