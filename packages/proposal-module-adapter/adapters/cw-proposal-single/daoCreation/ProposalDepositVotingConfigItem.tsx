import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/tstypes'
import { FormSwitchCard, NumberInput } from '@dao-dao/ui'
import { NEW_DAO_CW20_DECIMALS, validateNonNegative } from '@dao-dao/utils'
import { Cw20StakedBalanceVotingAdapter } from '@dao-dao/voting-module-adapter'
import {
  DaoCreationConfig as Cw20StakedBalanceVotingConfig,
  GovernanceTokenType,
} from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/types'

import { DaoCreationConfig } from '../types'

export const ProposalDepositIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.money')} symbol="💵" />
}

export const ProposalDepositInput = ({
  newDao: { votingModuleAdapter },
  data: {
    proposalDeposit: { amount, refundFailed },
  },
  register,
  setValue,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  // Can only configure proposal deposit if we have a CW20 token to use.
  if (votingModuleAdapter.id !== Cw20StakedBalanceVotingAdapter.id) {
    throw new Error(t('error.loadingData'))
  }
  // Checked adapter type above.
  const {
    tokenType: type,
    newInfo: { symbol: newSymbol },
    existingGovernanceTokenInfo,
  } = votingModuleAdapter.data as Cw20StakedBalanceVotingConfig

  const decimals =
    type === GovernanceTokenType.New
      ? NEW_DAO_CW20_DECIMALS
      : existingGovernanceTokenInfo?.decimals ?? NEW_DAO_CW20_DECIMALS
  const minimum = 1 / Math.pow(10, decimals)

  return (
    <div className="flex flex-col gap-3">
      {amount > 0 && (
        <FormSwitchCard
          fieldName="proposalDeposit.refundFailed"
          offLabel={t('form.refundFailedProposalsTitle')}
          onLabel={t('form.refundFailedProposalsTitle')}
          setValue={setValue}
          sizing="sm"
          tooltip={t('form.refundFailedProposalsTooltip')}
          value={refundFailed}
        />
      )}

      <div className="flex flex-row gap-2 items-center">
        <NumberInput
          containerClassName="grow"
          error={errors?.proposalDeposit?.amount}
          fieldName="proposalDeposit.amount"
          onMinus={() =>
            setValue('proposalDeposit.amount', Math.max(amount - 1, minimum))
          }
          onPlus={() =>
            setValue('proposalDeposit.amount', Math.max(amount + 1, minimum))
          }
          register={register}
          sizing="sm"
          step={minimum}
          validation={[validateNonNegative]}
        />

        <p className="text-text-tertiary">
          $
          {(type === GovernanceTokenType.New
            ? newSymbol
            : existingGovernanceTokenInfo?.symbol) || t('info.tokens')}
        </p>
      </div>
    </div>
  )
}

export const ProposalDepositReview = ({
  newDao: { votingModuleAdapter },
  data: {
    proposalDeposit: { amount, refundFailed },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  // Can only configure proposal deposit if we have a CW20 token to use.
  if (votingModuleAdapter.id !== Cw20StakedBalanceVotingAdapter.id) {
    throw new Error(t('error.loadingData'))
  }
  // Checked adapter type above.
  const {
    tokenType: type,
    newInfo: { symbol: newSymbol },
    existingGovernanceTokenInfo,
  } = votingModuleAdapter.data as Cw20StakedBalanceVotingConfig

  return amount === 0 ? (
    <>{t('info.none')}</>
  ) : (
    <>
      {amount.toLocaleString()} $
      {(type === GovernanceTokenType.New
        ? newSymbol
        : existingGovernanceTokenInfo?.symbol) || t('info.tokens')}
      <br />
      <span className="text-text-tertiary">
        ({refundFailed ? t('info.refundedOnFailure') : t('info.nonRefundable')})
      </span>
    </>
  )
}

export const ProposalDepositVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    // Only display if using cw20-staked-balance-voting since that creates a
    // CW20 token that can be used for deposit.
    onlyDisplayCondition: (newDao) =>
      newDao.votingModuleAdapter.id === Cw20StakedBalanceVotingAdapter.id,
    Icon: ProposalDepositIcon,
    nameI18nKey: 'form.proposalDepositTitle',
    descriptionI18nKey: 'form.proposalDepositDescription',
    Input: ProposalDepositInput,
    getInputError: ({ proposalDeposit } = {}) =>
      proposalDeposit?.amount || proposalDeposit?.refundFailed,
    Review: ProposalDepositReview,
  }
