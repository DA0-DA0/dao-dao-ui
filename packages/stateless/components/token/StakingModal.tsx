import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import { Duration } from '@dao-dao/types/contracts/common'
import {
  StakingModalProps,
  StakingMode,
} from '@dao-dao/types/stateless/StakingModal'
import { durationIsNonZero, humanReadableDuration } from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import {
  InputLabel,
  NumberInput,
  PercentButton,
  SegmentedControls,
} from '../inputs'
import { Modal } from '../modals/Modal'
import { Tooltip } from '../tooltip/Tooltip'
import { ValidatorPicker } from '../ValidatorPicker'
import { TokenAmountDisplay } from './TokenAmountDisplay'

export * from '@dao-dao/types/stateless/StakingModal'

export const StakingModal = ({
  initialMode,
  amount,
  setAmount,
  onClose,
  // microdenom
  claimableTokens,
  // macrodenom
  loadingStakableTokens,
  // macrodenom
  loadingUnstakableTokens,
  unstakingDuration,
  tokenDenom,
  tokenSymbol,
  tokenDecimals,
  // macrodenom
  proposalDeposit,
  loading,
  error,
  onAction,
  validatorPicker,
  visible = true,
  enableRestaking: restakingEnabled,
}: StakingModalProps) => {
  const { t } = useTranslation()

  const [mode, setMode] = useState(initialMode)
  const [validator, setValidator] = useState<string>()
  const [fromValidator, setFromValidator] = useState<string>()

  // If choosing a validator, unstakable amount depends on chosen validator.
  if (validatorPicker) {
    loadingUnstakableTokens = {
      loading: false,
      data:
        validatorPicker.stakes?.find(
          (stake) => stake.validator.address === validator
        )?.amount ?? 0,
    }
  }
  // If not choosing a validator and no unstakable amount passed, assume 0.
  else if (!loadingUnstakableTokens) {
    loadingUnstakableTokens = {
      loading: false,
      data: 0,
    }
  }

  const maxTx =
    mode === StakingMode.Stake
      ? loadingStakableTokens.loading
        ? undefined
        : loadingStakableTokens.data
      : // Unstaking or restaking.
      !loadingUnstakableTokens || loadingUnstakableTokens.loading
      ? undefined
      : loadingUnstakableTokens.data

  const invalidAmount = (): string | undefined => {
    if (mode === StakingMode.Claim) {
      return claimableTokens > 0 ? undefined : t('error.cannotTxZeroTokens')
    }
    if (amount <= 0) {
      return t('error.cannotTxZeroTokens')
    }
    if (maxTx === undefined) {
      return t('error.loadingData')
    }
    if (amount > maxTx) {
      return t('error.cannotStakeMoreThanYouHave')
    }
  }

  return (
    <Modal
      footerContainerClassName="flex flex-row justify-end !p-4"
      footerContent={
        <Tooltip title={error || invalidAmount()}>
          <Button
            disabled={!!error}
            loading={loading}
            onClick={() =>
              onAction(
                mode,
                mode === StakingMode.Claim ? claimableTokens : amount,
                validator,
                fromValidator
              )
            }
          >
            {t(`button.stakingMode.${mode}`)}
          </Button>
        </Tooltip>
      }
      header={{
        title:
          mode === StakingMode.Claim
            ? t('title.claimTokens')
            : t('title.manageStaking'),
      }}
      headerContent={
        mode !== StakingMode.Claim || validatorPicker ? (
          <div className="mt-5 flex w-full flex-col gap-4">
            {mode !== StakingMode.Claim && (
              <SegmentedControls
                onSelect={setMode}
                selected={mode}
                tabs={[
                  {
                    label: t('button.stakingMode.stake'),
                    value: StakingMode.Stake,
                  },
                  {
                    label: t('button.stakingMode.unstake'),
                    value: StakingMode.Unstake,
                  },
                  ...(restakingEnabled && validatorPicker
                    ? [
                        {
                          label: t('button.stakingMode.restake'),
                          value: StakingMode.Restake,
                        },
                      ]
                    : []),
                ]}
              />
            )}

            {validatorPicker && (
              <>
                {/* Show from validator. */}
                {mode === StakingMode.Restake && (
                  <div className="space-y-1">
                    <InputLabel name={t('form.fromValidator')} />

                    <ValidatorPicker
                      {...validatorPicker}
                      nativeDecimals={tokenDecimals}
                      nativeDenom={tokenDenom}
                      onSelect={({ address }) => setFromValidator(address)}
                      selectedAddress={fromValidator}
                      validators={
                        // Can only restake from validators with stakes.
                        validatorPicker.validators.filter((v) =>
                          validatorPicker.stakes?.some(
                            (s) =>
                              s.validator.address === v.address && s.amount > 0
                          )
                        )
                      }
                    />
                  </div>
                )}

                <div className="space-y-1">
                  {mode === StakingMode.Restake && (
                    <InputLabel name={t('form.toValidator')} />
                  )}

                  <ValidatorPicker
                    {...validatorPicker}
                    nativeDecimals={tokenDecimals}
                    nativeDenom={tokenDenom}
                    onSelect={({ address }) => setValidator(address)}
                    selectedAddress={validator}
                    validators={
                      // If restaking, show all validators for destination.
                      mode === StakingMode.Stake || mode === StakingMode.Restake
                        ? validatorPicker.validators
                        : validatorPicker.validators.filter((v) =>
                            validatorPicker.stakes?.some(
                              (s) =>
                                s.validator.address === v.address &&
                                s.amount > 0
                            )
                          )
                    }
                  />
                </div>
              </>
            )}
          </div>
        ) : undefined
      }
      onClose={onClose}
      visible={visible}
    >
      {mode === StakingMode.Claim ? (
        <ClaimModeBody
          amount={claimableTokens}
          tokenDecimals={tokenDecimals}
          tokenSymbol={tokenSymbol}
        />
      ) : (
        <StakeUnstakeModesBody
          amount={amount}
          loadingMax={
            mode === StakingMode.Stake
              ? loadingStakableTokens
              : // Unstake and restake.
                loadingUnstakableTokens
          }
          mode={mode}
          proposalDeposit={proposalDeposit}
          setAmount={(amount: number) => setAmount(amount)}
          tokenDecimals={tokenDecimals}
          tokenSymbol={tokenSymbol}
          unstakingDuration={unstakingDuration}
        />
      )}
    </Modal>
  )
}

interface StakeUnstakeModesBodyProps {
  amount: number
  mode: StakingMode
  loadingMax: LoadingData<number>
  setAmount: (newAmount: number) => void
  tokenSymbol: string
  tokenDecimals: number
  unstakingDuration: Duration | null
  proposalDeposit?: number
}

const StakeUnstakeModesBody = ({
  amount,
  setAmount,
  mode,
  loadingMax,
  tokenSymbol,
  tokenDecimals,
  unstakingDuration,
  proposalDeposit,
}: StakeUnstakeModesBodyProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2 className="primary-text mb-6">{t('title.chooseTokenAmount')}</h2>
      <NumberInput
        containerClassName="py-7 w-full h-20 pl-6 pr-8 bg-background-secondary rounded-md gap-4"
        ghost
        max={loadingMax.loading ? undefined : loadingMax.data}
        min={1 / 10 ** tokenDecimals}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(e.target.valueAsNumber)
        }
        plusMinusButtonSize="lg"
        setValue={(_, value) => setAmount(value)}
        step={1 / 10 ** tokenDecimals}
        textClassName="font-mono leading-5 symbol-small-body-text"
        unit={`$${tokenSymbol}`}
        value={amount}
      />
      {!loadingMax.loading && amount > loadingMax.data && (
        <span className="caption-text mt-1 ml-1 text-text-interactive-error">
          {t('error.cannotStakeMoreThanYouHave')}
        </span>
      )}
      <TokenAmountDisplay
        amount={loadingMax}
        className="caption-text mt-4 font-mono"
        decimals={tokenDecimals}
        prefix={t('info.yourBalance') + ': '}
        showFullAmount
        symbol={tokenSymbol}
      />
      <div className="mt-6">
        <div className="grid grid-cols-5 gap-2">
          {[10, 25, 50, 75, 100].map((percent) => (
            <PercentButton
              key={percent}
              amount={amount}
              decimals={tokenDecimals}
              label={`${percent}%`}
              loadingMax={loadingMax}
              percent={percent / 100}
              setAmount={setAmount}
            />
          ))}
        </div>
        {mode === StakingMode.Stake &&
          !!proposalDeposit &&
          !loadingMax.loading &&
          loadingMax.data > proposalDeposit && (
            <PercentButton
              absoluteOffset={-proposalDeposit}
              amount={amount}
              className="mt-2"
              decimals={tokenDecimals}
              label={t('button.stakeAllButProposalDeposit', {
                proposalDeposit: proposalDeposit.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                }),
                tokenSymbol,
              })}
              loadingMax={loadingMax}
              percent={1}
              setAmount={setAmount}
            />
          )}
      </div>

      {(mode === StakingMode.Stake ||
        mode === StakingMode.Unstake ||
        mode === StakingMode.Restake) &&
        unstakingDuration &&
        durationIsNonZero(unstakingDuration) && (
          <div className="mt-7 space-y-5 border-t border-border-secondary pt-7">
            <p className="primary-text text-text-secondary">
              {t('title.unstakingPeriod') +
                `: ${humanReadableDuration(unstakingDuration)}`}
            </p>
            <p className="body-text text-text-secondary">
              {t('info.unstakingMechanics', {
                humanReadableTime: humanReadableDuration(unstakingDuration),
              })}
            </p>
          </div>
        )}
    </>
  )
}

interface ClaimModeBodyProps {
  amount: number
  tokenDecimals: number
  tokenSymbol: string
}

const ClaimModeBody = ({
  amount,
  tokenSymbol,
  tokenDecimals,
}: ClaimModeBodyProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      <TokenAmountDisplay
        amount={amount}
        className="font-medium"
        decimals={tokenDecimals}
        showFullAmount
        suffix={' ' + t('info.available')}
        symbol={tokenSymbol}
      />

      <p className="text-sm">{t('info.claimToReceiveUnstaked')}</p>
    </div>
  )
}
