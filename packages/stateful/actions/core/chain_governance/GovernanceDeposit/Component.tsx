import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  GovernanceProposal,
  InputLabel,
  NoContent,
  SelectInput,
  TokenInput,
} from '@dao-dao/stateless'
import {
  GenericToken,
  GovProposalWithDecodedContent,
  LoadingData,
  StatefulPayEntityDisplayProps,
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
  PayEntityDisplay: ComponentType<StatefulPayEntityDisplayProps>
  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
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
  options: { depositTokens, proposals, PayEntityDisplay, TokenAmountDisplay },
  data,
}) => {
  const { t } = useTranslation()
  const { setValue, register, watch } = useFormContext<GovernanceDepositData>()

  const proposalId = watch((fieldNamePrefix + 'proposalId') as 'proposalId')
  const proposalSelected = proposals.find(
    (p) => p.proposalId.toString() === proposalId
  )

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
            containerClassName="mb-4"
            error={errors?.proposalId}
            fieldName={(fieldNamePrefix + 'proposalId') as 'proposalId'}
            register={register}
            validation={[validateRequired]}
          >
            {proposals.map((proposal) => (
              <option
                key={proposal.proposalId.toString()}
                value={proposal.proposalId.toString()}
              >
                #{proposal.proposalId.toString()}
                {'title' in proposal.decodedContent.value &&
                  typeof proposal.decodedContent.value.title === 'string' &&
                  ' ' + proposal.decodedContent.value.title}
              </option>
            ))}
          </SelectInput>
        ))}

      {proposalSelected ? (
        <GovernanceProposal
          PayEntityDisplay={PayEntityDisplay}
          TokenAmountDisplay={TokenAmountDisplay}
          className="rounded-md border border-border-primary p-4"
          content={proposalSelected.decodedContent}
          deposit={proposalSelected.totalDeposit}
          endDate={proposalSelected.votingEndTime}
          id={proposalSelected.proposalId.toString()}
          startDate={proposalSelected.votingStartTime}
          status={proposalSelected.status}
        />
      ) : (
        // If not creating and no proposal selected, something went wrong.
        !isCreating && (
          <p className="text-text-interactive-error">
            {t('error.failedToFindGovernanceProposal', { id: proposalId })}
          </p>
        )
      )}

      <div className="space-y-1">
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
    </>
  )
}
