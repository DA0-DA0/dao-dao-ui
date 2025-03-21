import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  ErrorPage,
  InputErrorMessage,
  InputLabel,
  NumericInput,
  SegmentedControls,
} from '@dao-dao/stateless'
import { ActionComponent, LoadingDataWithError } from '@dao-dao/types'
import {
  formatPercentOf100,
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type UpdateDelegationConfigData = {
  validityBlocks?: string | null
  vpCapPercent?: string | null
  maxDelegations?: string | null
}

type UpdateDelegationConfigOptions = {
  /**
   * The current config of the delegation contract. If undefined, the widget is
   * not yet set up, and this action should hide the "Keep Current" options.
   */
  currentConfig?: LoadingDataWithError<{
    validityBlocks?: number | null
    vpCapPercent?: number | null
    maxDelegations: number
  }>
}

export const UpdateDelegationConfigComponent: ActionComponent<
  UpdateDelegationConfigOptions
> = ({ fieldNamePrefix, errors, isCreating, options: { currentConfig } }) => {
  const { t } = useTranslation()
  const { register, watch, setValue } =
    useFormContext<UpdateDelegationConfigData>()

  const validityBlocks = watch(
    (fieldNamePrefix + 'validityBlocks') as 'validityBlocks'
  )
  const vpCapPercent = watch(
    (fieldNamePrefix + 'vpCapPercent') as 'vpCapPercent'
  )
  const maxDelegations = watch(
    (fieldNamePrefix + 'maxDelegations') as 'maxDelegations'
  )

  return currentConfig?.errored ? (
    <ErrorPage error={currentConfig.error} />
  ) : (
    <div className="flex flex-col gap-2 max-w-sm">
      {(isCreating || validityBlocks !== undefined) && (
        <div className="flex flex-col gap-1 rounded-md bg-background-tertiary p-3">
          <InputLabel
            name={t('form.delegationExpiration')}
            title
            tooltip={t('info.delegationExpirationTooltip')}
          />
          <SegmentedControls<'keep' | 'none' | 'set'>
            className="mb-1"
            disabled={!isCreating}
            onSelect={(value) =>
              setValue(
                (fieldNamePrefix + 'validityBlocks') as 'validityBlocks',
                value === 'keep'
                  ? undefined
                  : value === 'none'
                    ? null
                    : // Default to current value if set. Otherwise fallback to 90 days assuming 1 block per second.
                      (
                        (currentConfig &&
                          !currentConfig.loading &&
                          !currentConfig.errored &&
                          currentConfig.data.validityBlocks) ||
                        7_776_000
                      ).toString()
              )
            }
            selected={
              validityBlocks === undefined
                ? 'keep'
                : validityBlocks === null
                  ? 'none'
                  : 'set'
            }
            tabs={[
              ...(currentConfig
                ? [
                    {
                      label: t('info.keepCurrent'),
                      value: 'keep' as const,
                    },
                  ]
                : []),
              {
                label: t('info.change'),
                value: 'set',
              },
              {
                label: t('info.none'),
                value: 'none',
              },
            ]}
          />

          {/* Show current value if keeping the same */}
          {validityBlocks === undefined &&
            currentConfig &&
            !currentConfig.loading &&
            !currentConfig.errored && (
              <p className="secondary-text font-mono">
                {currentConfig.data.validityBlocks
                  ? t('info.numBlocks', {
                      count: currentConfig.data.validityBlocks,
                    })
                  : t('info.noExpiration')}
              </p>
            )}

          {typeof validityBlocks === 'string' && (
            <>
              <NumericInput
                disabled={!isCreating}
                error={errors?.validityBlocks}
                fieldName={
                  (fieldNamePrefix + 'validityBlocks') as 'validityBlocks'
                }
                min={2}
                register={register}
                step={1}
                unit={t('info.blocks', {
                  count: Number(validityBlocks),
                })}
                validation={[
                  validateRequired,
                  (v: HugeDecimal.Value | undefined | null) =>
                    (v !== undefined &&
                      v !== null &&
                      HugeDecimal.from(v).gte(2)) ||
                    'Must be at least 2',
                ]}
              />
              <InputErrorMessage error={errors?.validityBlocks} />
            </>
          )}
        </div>
      )}

      {(isCreating || vpCapPercent !== undefined) && (
        <div className="flex flex-col gap-1 rounded-md bg-background-tertiary p-3">
          <InputLabel
            name={t('form.delegateVotingPowerCap')}
            title
            tooltip={t('info.delegateVotingPowerCapTooltip')}
          />
          <SegmentedControls<'keep' | 'none' | 'set'>
            className="mb-1"
            disabled={!isCreating}
            onSelect={(value) =>
              setValue(
                (fieldNamePrefix + 'vpCapPercent') as 'vpCapPercent',
                value === 'keep'
                  ? undefined
                  : value === 'none'
                    ? null
                    : // Default to current value if set. Otherwise fallback to 10%.
                      (
                        (currentConfig &&
                          !currentConfig.loading &&
                          !currentConfig.errored &&
                          currentConfig.data.vpCapPercent) ||
                        10
                      ).toString()
              )
            }
            selected={
              vpCapPercent === undefined
                ? 'keep'
                : vpCapPercent === null
                  ? 'none'
                  : 'set'
            }
            tabs={[
              ...(currentConfig
                ? [
                    {
                      label: t('info.keepCurrent'),
                      value: 'keep' as const,
                    },
                  ]
                : []),
              {
                label: t('info.change'),
                value: 'set',
              },
              {
                label: t('info.none'),
                value: 'none',
              },
            ]}
          />

          {/* Show current value if keeping the same */}
          {vpCapPercent === undefined &&
            currentConfig &&
            !currentConfig.loading &&
            !currentConfig.errored && (
              <p className="secondary-text font-mono">
                {currentConfig.data.vpCapPercent
                  ? formatPercentOf100(currentConfig.data.vpCapPercent)
                  : t('info.none')}
              </p>
            )}

          {typeof vpCapPercent === 'string' && (
            <>
              <NumericInput
                disabled={!isCreating}
                error={errors?.vpCapPercent}
                fieldName={(fieldNamePrefix + 'vpCapPercent') as 'vpCapPercent'}
                max={100}
                min={0.0001}
                register={register}
                step={0.0001}
                unit="%"
                validation={[
                  validateRequired,
                  validatePercent,
                  validatePositive,
                ]}
              />
              <InputErrorMessage error={errors?.vpCapPercent} />
            </>
          )}
        </div>
      )}

      {/* Show max delegations if defined but disallow setting it. This prevents a malicious actor from sneakily changing it, but generally DAOs should not be changing this as it is based on the gas limits of the chain. */}
      {typeof maxDelegations === 'string' && (
        <div className="flex flex-col gap-1 rounded-md bg-background-tertiary p-3">
          <InputLabel
            name={t('form.maxDelegationsPerMember')}
            title
            tooltip={t('info.maxDelegationsPerMemberTooltip')}
          />
          <p className="secondary-text font-mono">
            {Number(maxDelegations).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
