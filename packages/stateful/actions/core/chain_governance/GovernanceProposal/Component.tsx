import { Check, Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CodeMirrorInput,
  GovernanceProposal,
  IconButton,
  InputErrorMessage,
  InputLabel,
  SelectInput,
  TextAreaInput,
  TextInput,
  TokenInput,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericToken,
  GenericTokenBalance,
  GovernanceProposalType,
  LoadingData,
  StatefulPayEntityDisplayProps,
  StatefulTokenAmountDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  convertMicroDenomToDenomWithDecimals,
  getIbcAssets,
  getNativeTokenForChainId,
  makeValidateAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type GovernanceProposalOptions = {
  minDeposits: LoadingData<GenericTokenBalance[]>
  PayEntityDisplay: ComponentType<StatefulPayEntityDisplayProps>
  TokenAmountDisplay: ComponentType<StatefulTokenAmountDisplayProps>
  AddressInput: ComponentType<AddressInputProps<GovernanceProposalData>>
}

export type GovernanceProposalData = {
  type: GovernanceProposalType
  title: string
  description: string
  deposit: {
    amount: number
    denom: string
  }[]
  // GovernanceProposalType.CommunityPoolSpendProposal
  spends: {
    amount: number
    denom: string
  }[]
  spendRecipient: string
  // GovernanceProposalType.ParameterChangeProposal
  parameterChanges: string
  // GovernanceProposalType.SoftwareUpgradeProposal
  upgradePlan: string
}

export const GovernanceProposalComponent: ActionComponent<
  GovernanceProposalOptions,
  GovernanceProposalData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { minDeposits, PayEntityDisplay, TokenAmountDisplay, AddressInput },
  data,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch, control } =
    useFormContext<GovernanceProposalData>()

  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const nativeToken = getNativeTokenForChainId(chainId)

  const selectedMinDepositToken = minDeposits.loading
    ? undefined
    : minDeposits.data.find(
        ({ token }) => token.denomOrAddress === data.deposit[0].denom
      )

  const {
    fields: spendFields,
    append: appendSpend,
    remove: removeSpend,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'spends') as 'spends',
  })

  const availableTokens: GenericToken[] = [
    // First native.
    nativeToken,
    // Then the IBC assets.
    ...getIbcAssets(chainId),
  ]

  return (
    <>
      {isCreating ? (
        <>
          <div className="mb-2 space-y-1">
            <InputLabel name={t('form.proposalType')} />

            <SelectInput
              error={errors?.type}
              fieldName={(fieldNamePrefix + 'type') as 'type'}
              register={register}
            >
              {Object.entries(GovernanceProposalType).map(([name, type]) => (
                <option key={type} value={type}>
                  {t(`govProposalType.${name}`)}
                </option>
              ))}
            </SelectInput>
          </div>

          <div className="space-y-1">
            <InputLabel name={t('form.title')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.title}
              fieldName={(fieldNamePrefix + 'title') as 'title'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.title} />
          </div>

          <div className="space-y-1">
            <InputLabel>
              {t('form.description')}
              <span className="text-text-tertiary">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {' – '}
                {t('info.supportsMarkdownFormat')}
              </span>
            </InputLabel>
            <TextAreaInput
              disabled={!isCreating}
              error={errors?.description}
              fieldName={(fieldNamePrefix + 'description') as 'description'}
              register={register}
              rows={5}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.description} />
          </div>

          <div className="space-y-1">
            <InputLabel name={t('form.initialDeposit')} />
            <TokenInput
              amountError={errors?.deposit?.[0]?.amount}
              amountFieldName={
                (fieldNamePrefix + 'deposit.0.amount') as 'deposit.0.amount'
              }
              amountMin={convertMicroDenomToDenomWithDecimals(
                1,
                selectedMinDepositToken?.token.decimals ?? 0
              )}
              amountStep={convertMicroDenomToDenomWithDecimals(
                1,
                selectedMinDepositToken?.token.decimals ?? 0
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
              selectedToken={selectedMinDepositToken?.token}
              setValue={setValue}
              tokens={
                minDeposits.loading
                  ? { loading: true }
                  : {
                      loading: false,
                      data: minDeposits.data.map(({ token }) => token),
                    }
              }
              watch={watch}
            />
          </div>

          {data.type === GovernanceProposalType.CommunityPoolSpendProposal && (
            <>
              <div className="flex flex-col gap-1">
                <InputLabel name={t('form.recipient')} />
                <AddressInput
                  disabled={!isCreating}
                  error={errors?.spendRecipient}
                  fieldName={
                    (fieldNamePrefix + 'spendRecipient') as 'spendRecipient'
                  }
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                  ]}
                />
                <InputErrorMessage error={errors?.spendRecipient} />
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel name={t('form.proposedSpends')} />

                <div className="flex flex-row flex-wrap items-end justify-between gap-6">
                  <div className="flex grow flex-col gap-1">
                    <div className="flex flex-col items-stretch gap-2">
                      {spendFields.map(({ id }, index) => {
                        const denom = watch(
                          (fieldNamePrefix +
                            `spends.${index}.denom`) as `spends.${number}.denom`
                        )
                        const selectedToken = availableTokens.find(
                          ({ denomOrAddress }) => denomOrAddress === denom
                        )
                        if (!selectedToken) {
                          return null
                        }

                        return (
                          <div
                            key={id}
                            className="flex flex-row items-center gap-2"
                          >
                            <TokenInput
                              amountError={errors?.spends?.[index]?.amount}
                              amountFieldName={
                                (fieldNamePrefix +
                                  `spends.${index}.amount`) as `spends.${number}.amount`
                              }
                              amountStep={convertMicroDenomToDenomWithDecimals(
                                1,
                                selectedToken.decimals
                              )}
                              convertMicroDenom
                              onSelectToken={({ denomOrAddress }) =>
                                setValue(
                                  (fieldNamePrefix +
                                    `spends.${index}.denom`) as `spends.${number}.denom`,
                                  denomOrAddress
                                )
                              }
                              register={register}
                              selectedToken={selectedToken}
                              setValue={setValue}
                              tokens={{ loading: false, data: availableTokens }}
                              watch={watch}
                            />

                            <IconButton
                              Icon={Close}
                              onClick={() => removeSpend(index)}
                              size="sm"
                              variant="ghost"
                            />
                          </div>
                        )
                      })}

                      {isCreating && (
                        <Button
                          className="self-start"
                          onClick={() =>
                            appendSpend({
                              amount: 1,
                              denom: nativeToken.denomOrAddress,
                            })
                          }
                          variant="secondary"
                        >
                          {t('button.addPayment')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {data.type === GovernanceProposalType.ParameterChangeProposal && (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={t('form.parameterChanges')} />
              <CodeMirrorInput
                control={control}
                error={errors?.parameterChanges}
                fieldName={
                  (fieldNamePrefix + 'parameterChanges') as 'parameterChanges'
                }
                validation={[validateJSON]}
              />
              {errors?.parameterChanges?.message ? (
                <p className="text-error flex items-center gap-1 text-sm">
                  <Close className="inline w-5" />{' '}
                  <span>{errors.parameterChanges?.message}</span>
                </p>
              ) : (
                <p className="text-success flex items-center gap-1 text-sm">
                  <Check className="inline w-5" /> {t('info.jsonIsValid')}
                </p>
              )}
            </div>
          )}

          {data.type === GovernanceProposalType.SoftwareUpgradeProposal && (
            <div className="flex flex-col items-stretch gap-1">
              <InputLabel name={t('form.plan')} />
              <CodeMirrorInput
                control={control}
                error={errors?.upgradePlan}
                fieldName={(fieldNamePrefix + 'upgradePlan') as 'upgradePlan'}
                validation={[validateJSON]}
              />
              {errors?.upgradePlan?.message ? (
                <p className="text-error flex items-center gap-1 text-sm">
                  <Close className="inline w-5" />{' '}
                  <span>{errors.upgradePlan?.message}</span>
                </p>
              ) : (
                <p className="text-success flex items-center gap-1 text-sm">
                  <Check className="inline w-5" /> {t('info.jsonIsValid')}
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <GovernanceProposal
          PayEntityDisplay={PayEntityDisplay}
          TokenAmountDisplay={TokenAmountDisplay}
          content={{
            typeUrl: data.type,
            value: {
              title: data.title,
              description: data.description,

              ...(data.type ===
                GovernanceProposalType.CommunityPoolSpendProposal && {
                amount: data.spends,
                recipient: data.spendRecipient,
              }),

              ...(data.type ===
                GovernanceProposalType.ParameterChangeProposal && {
                changes: JSON.parse(data.parameterChanges),
              }),

              ...(data.type ===
                GovernanceProposalType.SoftwareUpgradeProposal && {
                plan: JSON.parse(data.upgradePlan),
              }),
            },
          }}
          deposit={data.deposit.map(({ denom, amount }) => ({
            denom,
            amount: BigInt(amount).toString(),
          }))}
        />
      )}
    </>
  )
}
