import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

import {
  DaoCreationConfigItem,
  DaoCreationConfigItemInputProps,
} from '@dao-dao/tstypes'
import { NumberInput } from '@dao-dao/ui'
import { validateNonNegative } from '@dao-dao/utils'
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
    proposalDeposit: { amount },
  },
  register,
  setValue,
  errors,
}: DaoCreationConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  // Can only configure proposal deposit if we have a CW20 token to use.
  if (votingModuleAdapter.id !== Cw20StakedBalanceVotingAdapter.id) {
    throw new Error(t('error.loadingData'))
  }
  // Checked adapter type above.
  const {
    type,
    newInfo: { symbol: newSymbol },
    existingGovernanceTokenInfo,
  } = votingModuleAdapter.data as Cw20StakedBalanceVotingConfig

  return (
    <div className="flex flex-row gap-2 items-center">
      <NumberInput
        containerClassName="grow"
        error={errors?.proposalDeposit?.amount}
        fieldName="proposalDeposit.amount"
        onMinus={() =>
          setValue('proposalDeposit.amount', Math.max(amount - 1, 0))
        }
        onPlus={() =>
          setValue('proposalDeposit.amount', Math.max(amount + 1, 0))
        }
        register={register}
        sizing="sm"
        step={1}
        validation={[validateNonNegative]}
      />

      <p className="text-text-tertiary">
        $
        {(type === GovernanceTokenType.New
          ? newSymbol
          : existingGovernanceTokenInfo?.symbol) || t('info.tokens')}
      </p>
    </div>
  )
}

export const ProposalDepositVotingConfigurationItem: DaoCreationConfigItem<DaoCreationConfig> =
  {
    // Only display if using cw20-staked-balance-voting since that creates a
    // CW20 token that can be used for deposit.
    onlyDisplayCondition: (newDao) =>
      newDao.votingModuleAdapter.id === Cw20StakedBalanceVotingAdapter.id,
    accentColor: '#fccd031a',
    Icon: ProposalDepositIcon,
    nameI18nKey: 'form.proposalDepositTitle',
    descriptionI18nKey: 'form.proposalDepositDescription',
    Input: ProposalDepositInput,
  }
