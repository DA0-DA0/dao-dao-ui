import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoRewardDistributionPicker,
  InputLabel,
  MarkdownRenderer,
} from '@dao-dao/stateless'
import { DaoRewardDistribution } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

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

  return (
    <>
      <MarkdownRenderer
        className="body-text text-text-secondary"
        markdown={t('info.pauseRewardDistributionExplanation')}
      />

      <div className="flex flex-col gap-2 self-start">
        <InputLabel name={t('title.distribution')} primary />

        <DaoRewardDistributionPicker
          disabled={!isCreating}
          distributions={distributions}
          onSelect={({ address, id }) => {
            setValue((fieldNamePrefix + 'address') as 'address', address)
            setValue((fieldNamePrefix + 'id') as 'id', id)
          }}
          selectButtonVariant={!address ? 'primary' : 'ghost_outline'}
          selectedDistribution={selectedDistribution}
        />
      </div>
    </>
  )
}
