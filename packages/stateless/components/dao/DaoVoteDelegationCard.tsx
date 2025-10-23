import { Add, ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  DelegationForm,
  StatelessDaoVoteDelegationCardProps,
} from '@dao-dao/types'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { Button } from '../buttons'
import { EntityDisplay } from '../EntityDisplay'
import { ErrorPage } from '../error'
import { InputErrorMessage, InputLabel, NumericInput } from '../inputs'
import { LineLoaders } from '../LineLoader'
import { Loader } from '../logo'
import { Modal } from '../modals'
import { FilterableItemPopup } from '../popup'

const DECIMAL_PLACES = 8
const DECIMAL_PLACES_REGEX = new RegExp(`^[0-9]+\\.[0-9]{${DECIMAL_PLACES}}$`)

export const DaoVoteDelegationCard = ({
  className,
  totalVotingPower,
  walletVotingPower,
  delegates,
  delegations,
  registration,
  loadingRegistration,
  updateRegistration,
  loadingDelegate,
  delegate,
  loadingUndelegate,
  undelegate,
  Trans,
}: StatelessDaoVoteDelegationCardProps) => {
  const { t } = useTranslation()

  const [delegationModalOpen, setDelegationModalOpen] = useState(false)
  const delegationForm = useForm<DelegationForm>({
    mode: 'onChange',
  })

  const delegateEntered = delegationForm.watch('delegate')
  const percent = delegationForm.watch('percent')

  const selectedDelegateAddress = delegationForm.watch('delegate')
  const selectedDelegate =
    !delegates.loading && !delegates.errored
      ? delegates.data.find(
          ({ delegate }) => delegate === selectedDelegateAddress
        )
      : undefined
  const selectedDelegateExistingDelegation =
    !delegations.loading && !delegations.errored
      ? delegations.data.find(
          ({ delegate }) => delegate === selectedDelegateAddress
        )
      : undefined

  const addNewDelegation = () => {
    delegationForm.setValue('delegate', '')
    delegationForm.setValue('percent', '10')
    setDelegationModalOpen(true)
  }

  const {
    votingPowerToDelegate,
    smallestPercentDelegation,
    smallestPercentDelegationDoesNotTerminate,
  } = useMemo(() => {
    // Delegations module rounds down, so voting power unit determines minimum
    // size of delegation.
    const votingPowerToDelegate =
      !walletVotingPower.loading && !walletVotingPower.errored
        ? walletVotingPower.data.times(percent).div(100).trunc()
        : HugeDecimal.from(NaN)

    // Smallest percent delegation is determined by the voting power unit.
    const smallestPercentDelegation =
      !totalVotingPower.loading &&
      !totalVotingPower.errored &&
      !totalVotingPower.data.isZero()
        ? HugeDecimal.from(100).div(totalVotingPower.data).toFormattedString({
            showFullAmount: true,
            maxNonZeroDecimals: DECIMAL_PLACES,
          })
        : undefined

    const smallestPercentDelegationDoesNotTerminate =
      !!smallestPercentDelegation?.match(DECIMAL_PLACES_REGEX)

    return {
      votingPowerToDelegate,
      smallestPercentDelegation,
      smallestPercentDelegationDoesNotTerminate,
    }
  }, [walletVotingPower, percent, totalVotingPower])

  const power =
    registration.loading || registration.errored || totalVotingPower.loading
      ? '...'
      : totalVotingPower.errored
        ? HugeDecimal.from(registration.data.power).toFormattedString()
        : HugeDecimal.from(registration.data.power)
            .div(totalVotingPower.data)
            .times(100)
            .toFormattedString({
              maxNonZeroDecimals: 3,
            }) + '%'

  return (
    <>
      <div
        className={clsx(
          'bg-background-tertiary flex flex-col rounded-md p-4 gap-4',
          className
        )}
      >
        <p className="primary-text">{t('title.delegations')}</p>

        {registration.loading ? (
          <Loader />
        ) : registration.errored ? (
          <ErrorPage error={registration.error} />
        ) : registration.data.registered ? (
          <>
            <p className="body-text text-text-secondary break-all -mt-2">
              <Trans
                i18nKey="info.delegatedVotingPower"
                values={{
                  power,
                }}
              >
                You have been delegated{' '}
                <span className="text-text-brand-secondary font-mono">
                  {power}
                </span>{' '}
                of the total voting power.
              </Trans>
            </p>

            <Button
              className="self-start"
              loading={registration.loading || loadingRegistration}
              onClick={() => updateRegistration(false)}
              variant="secondary"
            >
              {t('button.stopBeingADelegate')}
            </Button>

            <p className="caption-text italic">
              {t('info.delegateCannotDelegate')}
            </p>
          </>
        ) : (
          <>
            <p className="secondary-text -mt-3">
              {t('info.voteDelegationDelegatorExplanation')}
            </p>

            <div className="flex flex-col gap-3">
              {delegations.loading ? (
                <LineLoaders lines={3} type="command" />
              ) : delegations.errored ? (
                <ErrorPage error={delegations.error} />
              ) : delegations.data.length > 0 ? (
                <>
                  <div className="flex flex-col mt-1">
                    {delegations.data.map(
                      ({ active, delegate, entity, percent }) => {
                        // Whether or not the delegation is too small and rounds
                        // down to zero based on the current voting power.
                        const isTooSmall =
                          !walletVotingPower.loading &&
                          !walletVotingPower.errored &&
                          walletVotingPower.data.times(percent).trunc().isZero()

                        return (
                          <>
                            <Button
                              key={delegate}
                              className="!py-3 !px-4"
                              contentContainerClassName="justify-between"
                              errored={isTooSmall}
                              onClick={() => {
                                delegationForm.setValue('delegate', delegate)
                                delegationForm.setValue(
                                  'percent',
                                  HugeDecimal.from(percent)
                                    .times(100)
                                    .toString()
                                )
                                setDelegationModalOpen(true)
                              }}
                              variant="ghost_outline"
                            >
                              <EntityDisplay
                                address={delegate}
                                loadingEntity={{ loading: false, data: entity }}
                              />

                              <p
                                className={clsx(
                                  'body-text font-mono text-right',
                                  active
                                    ? 'text-text-brand-secondary'
                                    : 'text-text-interactive-disabled'
                                )}
                              >
                                {HugeDecimal.from(percent)
                                  .times(100)
                                  .toFormattedString({
                                    maxNonZeroDecimals: 3,
                                  }) + '%'}
                              </p>
                            </Button>

                            {isTooSmall && smallestPercentDelegation && (
                              <InputErrorMessage
                                className="self-end"
                                error={t(
                                  'info.mustDelegateMinimumDueToRounding',
                                  {
                                    context:
                                      smallestPercentDelegationDoesNotTerminate
                                        ? 'noTerminate'
                                        : 'terminates',
                                    minimum: smallestPercentDelegation,
                                  }
                                )}
                              />
                            )}
                          </>
                        )
                      }
                    )}
                  </div>

                  <Button
                    className="self-end"
                    onClick={addNewDelegation}
                    variant="secondary"
                  >
                    <Add className="!w-4 !h-4" />
                    {t('button.new')}
                  </Button>
                </>
              ) : (
                <Button
                  className="self-start -mt-2"
                  onClick={addNewDelegation}
                  variant="secondary"
                >
                  <Add className="!w-4 !h-4" />
                  {t('button.newDelegation')}
                </Button>
              )}
            </div>

            <p className="secondary-text -mb-2">
              {t('info.becomeDelegateExplanation', {
                context:
                  delegations.loading ||
                  delegations.errored ||
                  delegations.data.length > 0
                    ? 'undelegate'
                    : undefined,
              })}
            </p>

            <Button
              className="self-start"
              loading={loadingRegistration}
              onClick={
                !registration.loading && !registration.errored
                  ? () => updateRegistration(!registration.data.registered)
                  : undefined
              }
              variant="secondary"
            >
              {t('button.becomeADelegate')}
            </Button>
          </>
        )}
      </div>

      <Modal
        containerClassName="w-full !max-w-sm"
        header={{
          title: t('title.delegation'),
        }}
        onClose={() => setDelegationModalOpen(false)}
        visible={delegationModalOpen}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={delegationForm.handleSubmit((data) =>
            delegate(data).then(
              (success) => success && setDelegationModalOpen(false)
            )
          )}
        >
          <div className="flex flex-col gap-2">
            <InputLabel name={t('title.delegate')} />

            {!delegates.loading && !delegates.errored && (
              <FilterableItemPopup
                filterableItemKeys={DELEGATE_FILTERABLE_ITEM_KEYS}
                items={delegates.data.map(({ delegate, entity, power }) => ({
                  key: delegate,
                  iconUrl: entity.imageUrl,
                  label: entity.name || entity.address,
                  rightNode: (
                    <p className="primary-text text-text-brand-secondary font-mono">
                      {totalVotingPower.loading || totalVotingPower.errored
                        ? HugeDecimal.from(power).toFormattedString()
                        : HugeDecimal.from(power)
                            .div(totalVotingPower.data)
                            .times(100)
                            .toFormattedString({
                              maxNonZeroDecimals: 3,
                            }) + '%'}
                    </p>
                  ),
                }))}
                noItemsLabel={t('info.noDelegatesFound')}
                onSelect={({ key }) => delegationForm.setValue('delegate', key)}
                trigger={{
                  type: 'button',
                  props: {
                    contentContainerClassName: 'justify-between !gap-4',
                    size: 'lg',
                    variant: 'ghost_outline',
                    children: (
                      <>
                        {selectedDelegate ? (
                          <EntityDisplay
                            address={selectedDelegate.delegate}
                            loadingEntity={{
                              loading: false,
                              data: selectedDelegate.entity,
                            }}
                            noCopy
                            noLink
                          />
                        ) : (
                          <p className="text-text-secondary">
                            {t('button.selectDelegate')}
                          </p>
                        )}

                        <ArrowDropDown className="text-icon-primary !h-6 !w-6" />
                      </>
                    ),
                  },
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <InputLabel name={t('title.percent')} />
            <NumericInput
              error={
                delegationForm.formState.errors.percent ||
                votingPowerToDelegate.isZero()
              }
              fieldName="percent"
              max={100}
              register={delegationForm.register}
              step={0.0000000000000001}
              unit="%"
              validation={[validateRequired, validatePercent, validatePositive]}
            />

            {!walletVotingPower.loading && !walletVotingPower.errored && (
              <p
                className={clsx(
                  'caption-text text-xs',
                  (votingPowerToDelegate.isZero() ||
                    delegationForm.formState.errors.percent) &&
                    '!text-text-interactive-error'
                )}
              >
                {t('info.delegatesYourVotingPowerMath', {
                  delegated: votingPowerToDelegate.isNaN()
                    ? '—'
                    : votingPowerToDelegate.toFormattedString({
                        showFullAmount: true,
                      }),
                  votingPower: walletVotingPower.data.toFormattedString({
                    showFullAmount: true,
                  }),
                })}
                {smallestPercentDelegation &&
                  votingPowerToDelegate.isZero() &&
                  ' ' +
                    t('info.mustDelegateMinimumDueToRounding', {
                      context: smallestPercentDelegationDoesNotTerminate
                        ? 'noTerminate'
                        : 'terminates',
                      minimum: smallestPercentDelegation,
                    })}
              </p>
            )}
          </div>

          <div className="border-border-secondary flex flex-row gap-2 items-center justify-end -mx-6 -mb-6 mt-2 px-6 py-5 border-t">
            {selectedDelegateExistingDelegation && (
              <Button
                disabled={loadingDelegate || !delegateEntered}
                loading={loadingUndelegate}
                onClick={() =>
                  undelegate(selectedDelegateAddress).then(
                    (success) => success && setDelegationModalOpen(false)
                  )
                }
                variant="secondary"
              >
                {t('button.undelegate')}
              </Button>
            )}

            <Button
              disabled={loadingUndelegate}
              loading={loadingDelegate}
              type="submit"
              variant="brand"
            >
              {selectedDelegateExistingDelegation
                ? t('button.updateDelegation')
                : t('button.delegate')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

const DELEGATE_FILTERABLE_ITEM_KEYS = ['key', 'name']
