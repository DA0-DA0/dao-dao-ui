import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  GovernanceProposalFromProposal,
  InputLabel,
  NoContent,
  SelectInput,
  TokenInput,
} from '@dao-dao/stateless'
import {
  GenericToken,
  GovProposalActionDisplayProps,
  GovProposalWithDecodedContent,
  LoadingData,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  convertMicroDenomToDenomWithDecimals,
  validateRequired,
} from '@dao-dao/utils'

export type GovernanceDepositOptions = {
  proposals: GovProposalWithDecodedContent[]
  depositTokens: LoadingData<GenericToken[]>
  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  GovProposalActionDisplay: ComponentType<GovProposalActionDisplayProps>
}

export type GovernanceDepositData = {
  proposalId: string
  deposit: {
    amount: number
    denom: string
  }[]
}

export const GovernanceDepositComponent: ActionComponent<
  GovernanceDepositOptions,
  GovernanceDepositData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    proposals,
    depositTokens,
    TokenAmountDisplay,
    GovProposalActionDisplay,
  },
  data,
}) => {
  const { t } = useTranslation()
  const { setValue, register, watch } = useFormContext<GovernanceDepositData>()

  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')
  const proposalSelected = proposals.find((p) => p.id.toString() === proposalId)

  const selectedDepositToken =
    depositTokens.loading || !data.deposit.length
      ? undefined
      : depositTokens.data.find(
          ({ denomOrAddress }) => denomOrAddress === data.deposit[0].denom
        )

  return (
    <>
      {isCreating &&
        (proposals.length === 0 ? (
          <NoContent
            Icon={CheckBoxOutlineBlankRounded}
            body={t('info.noGovernanceProposalsNeedDeposit')}
            error
          />
        ) : (
          <SelectInput
            error={errors?.proposalId}
            fieldName={(fieldNamePrefix + 'proposalId') as 'proposalId'}
            register={register}
            validation={[validateRequired]}
          >
            {proposals.map((proposal) => (
              <option
                key={proposal.id.toString()}
                value={proposal.id.toString()}
              >
                #{proposal.id.toString()}
                {' ' + proposal.title}
              </option>
            ))}
          </SelectInput>
        ))}

      <div className="mb-4 space-y-1">
        <InputLabel name={t('form.deposit')} />
        <TokenInput
          amountError={errors?.deposit?.[0]?.amount}
          amountFieldName={
            (fieldNamePrefix + 'deposit.0.amount') as 'deposit.0.amount'
          }
          amountMin={convertMicroDenomToDenomWithDecimals(
            1,
            selectedDepositToken?.decimals ?? 0
          )}
          amountStep={convertMicroDenomToDenomWithDecimals(
            1,
            selectedDepositToken?.decimals ?? 0
          )}
          convertMicroDenom
          onSelectToken={({ denomOrAddress }) =>
            setValue(
              (fieldNamePrefix + 'deposit.0.denom') as 'deposit.0.denom',
              denomOrAddress
            )
          }
          readOnly={!isCreating}
          register={register}
          selectedToken={selectedDepositToken}
          setValue={setValue}
          tokens={depositTokens}
          watch={watch}
        />
      </div>

      {proposalSelected ? (
        <GovernanceProposalFromProposal
          GovProposalActionDisplay={GovProposalActionDisplay}
          TokenAmountDisplay={TokenAmountDisplay}
          className="rounded-md border border-border-secondary p-4"
          proposal={proposalSelected}
        />
      ) : (
        // If not creating and no proposal selected, something went wrong.
        !isCreating && (
          <p className="text-text-interactive-error">
            {t('error.failedToFindGovernanceProposal', { id: proposalId })}
          </p>
        )
      )}
    </>
  )
}
