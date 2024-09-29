import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { LoadingData } from '@dao-dao/types'
import {
  StakingModalProps,
  StakingMode,
} from '@dao-dao/types/components/StakingModal'
import { Duration } from '@dao-dao/types/contracts/common'
import { convertDurationToHumanReadableString } from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import {
  InputLabel,
  NumberInput,
  PercentButton,
  SegmentedControls,
  TokenInput,
} from '../inputs'
import { Modal } from '../modals/Modal'
import { Tooltip } from '../tooltip/Tooltip'
import { ValidatorPicker } from '../ValidatorPicker'
import { TokenAmountDisplay } from './TokenAmountDisplay'

export const StakingModal = ({
  initialMode,
  // macrodenom
  amount,
  // macrodenom
  setAmount,
  onClose,
  // macrodenom
  claimableTokens,
  // microdenom
  loadingStakableTokens,
  // microdenom
  loadingUnstakableTokens,
  unstakingDuration,
  token,
  // microdenom
  proposalDeposit,
  loading,
  error,
  onAction,
  actionPrefix,
  validatorPicker,
  visible = true,
  enableRestaking,
  tokenPicker,
}: StakingModalProps) => {
  const { t } = useTranslation()

  const [mode, setMode] = useState(initialMode)
  const [validator, setValidator] = useState<string>()
  const [fromValidator, setFromValidator] = useState<string>()

  // If choosing a validator, unstakable amount depends on chosen validator.
  if (validatorPicker) {
    // If restaking, fromValidator is source of funds.
    const targetValidator =
      mode === StakingMode.Restake ? fromValidator : validator

    loadingUnstakableTokens = {
      loading: false,
      data:
        validatorPicker.stakes?.find(
          (stake) => stake.validator.address === targetValidator
        )?.amount ?? HugeDecimal.zero,
    }
  }
  // If not choosing a validator and no unstakable amount passed, assume 0.
  else if (!loadingUnstakableTokens) {
    loadingUnstakableTokens = {
      loading: false,
      data: HugeDecimal.zero,
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
    if (amount > maxTx.toHumanReadableNumber(token.decimals)) {
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
            {actionPrefix}
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
                  ...(enableRestaking && validatorPicker
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
                      onSelect={({ address }) => setFromValidator(address)}
                      selectedAddress={fromValidator}
                      token={token}
                      validators={
                        // Can only restake from validators with stakes.
                        validatorPicker.validators.filter((v) =>
                          validatorPicker.stakes?.some(
                            (s) =>
                              s.validator.address === v.address &&
                              s.amount.isPositive()
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
                    onSelect={({ address }) => setValidator(address)}
                    selectedAddress={validator}
                    token={token}
                    validators={
                      // If restaking, show all validators for destination.
                      mode === StakingMode.Stake || mode === StakingMode.Restake
                        ? validatorPicker.validators
                        : validatorPicker.validators.filter((v) =>
                            validatorPicker.stakes?.some(
                              (s) =>
                                s.validator.address === v.address &&
                                s.amount.isPositive()
                            )
                          )
                    }
                  />
                </div>
              </>
            )}

            {tokenPicker && <TokenInput {...tokenPicker} />}
          </div>
        ) : undefined
      }
      onClose={onClose}
      visible={visible}
    >
      {mode === StakingMode.Claim ? (
        <ClaimModeBody
          amount={claimableTokens}
          tokenDecimals={token.decimals}
          tokenSymbol={token.symbol}
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
          tokenDecimals={token.decimals}
          tokenSymbol={token.symbol}
          unstakingDuration={unstakingDuration}
        />
      )}
    </Modal>
  )
}

interface StakeUnstakeModesBodyProps {
  amount: number
  mode: StakingMode
  loadingMax: LoadingData<HugeDecimal>
  setAmount: (newAmount: number) => void
  tokenSymbol: string
  tokenDecimals: number
  unstakingDuration: Duration | null
  proposalDeposit?: HugeDecimal
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
        max={
          loadingMax.loading
            ? undefined
            : loadingMax.data.toHumanReadableNumber(tokenDecimals)
        }
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
      {!loadingMax.loading &&
        loadingMax.data.toHumanReadableNumber(tokenDecimals) < amount && (
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
              loadingMax={
                loadingMax.loading
                  ? loadingMax
                  : {
                      loading: false,
                      data: loadingMax.data.toHumanReadableNumber(
                        tokenDecimals
                      ),
                    }
              }
              percent={percent / 100}
              setAmount={setAmount}
            />
          ))}
        </div>
        {mode === StakingMode.Stake &&
          !!proposalDeposit &&
          !loadingMax.loading &&
          loadingMax.data.gt(proposalDeposit) && (
            <PercentButton
              absoluteOffset={-proposalDeposit}
              amount={amount}
              className="mt-2"
              decimals={tokenDecimals}
              label={t('button.stakeAllButProposalDeposit', {
                proposalDeposit:
                  proposalDeposit.toInternationalizedHumanReadableString({
                    decimals: tokenDecimals,
                  }),
                tokenSymbol,
              })}
              loadingMax={
                loadingMax.loading
                  ? loadingMax
                  : {
                      loading: false,
                      data: loadingMax.data.toHumanReadableNumber(
                        tokenDecimals
                      ),
                    }
              }
              percent={1}
              setAmount={setAmount}
            />
          )}
      </div>

      {(mode === StakingMode.Stake ||
        mode === StakingMode.Unstake ||
        mode === StakingMode.Restake) &&
        unstakingDuration &&
        ('height' in unstakingDuration
          ? unstakingDuration.height
          : unstakingDuration.time) > 0 && (
          <div className="mt-7 space-y-5 border-t border-border-secondary pt-7">
            <p className="primary-text text-text-secondary">
              {t('title.unstakingPeriod') +
                `: ${convertDurationToHumanReadableString(
                  t,
                  unstakingDuration
                )}`}
            </p>
            <p className="body-text text-text-secondary">
              {t('info.unstakingMechanics', {
                humanReadableTime: convertDurationToHumanReadableString(
                  t,
                  unstakingDuration
                ),
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
