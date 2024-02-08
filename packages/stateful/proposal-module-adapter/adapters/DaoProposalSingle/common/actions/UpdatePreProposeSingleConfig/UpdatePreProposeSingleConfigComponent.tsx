import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  Loader,
  LockWithPenEmoji,
  MoneyEmoji,
  SegmentedControls,
  TokenInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  DepositRefundPolicy,
  GenericToken,
  TokenInputOption,
  TokenType,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getChainAssets,
  getNativeTokenForChainId,
  isValidBech32Address,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../../actions'

const DepositRefundPolicyValues = Object.values(DepositRefundPolicy)

export interface UpdatePreProposeSingleConfigData {
  depositRequired: boolean
  depositInfo: {
    amount: number
    // Token input fields.
    type: 'native' | 'cw20' | 'voting_module_token'
    denomOrAddress: string
    // Loaded from token input fields to access metadata.
    token?: GenericToken
    refundPolicy: DepositRefundPolicy
  }
  anyoneCanPropose: boolean
}

export interface UpdatePreProposeConfigOptions {
  governanceToken?: GenericToken
  cw20AddressError?: string
}

export const UpdatePreProposeSingleConfigComponent: ActionComponent<
  UpdatePreProposeConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { governanceToken, cw20AddressError },
}) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register, setValue, watch } =
    useFormContext<UpdatePreProposeSingleConfigData>()

  const depositRequired = watch(
    (fieldNamePrefix + 'depositRequired') as 'depositRequired'
  )
  const depositInfo = watch((fieldNamePrefix + 'depositInfo') as 'depositInfo')
  const anyoneCanPropose = watch(
    (fieldNamePrefix + 'anyoneCanPropose') as 'anyoneCanPropose'
  )

  const nativeToken = getNativeTokenForChainId(chainId)
  const availableTokens: TokenInputOption[] = [
    // Governance token first.
    ...(governanceToken
      ? [
          {
            ...governanceToken,
            type:
              governanceToken.type === TokenType.Cw20
                ? // Only works for cw20.
                  'voting_module_token'
                : TokenType.Native,
            description: t('title.governanceToken'),
          },
        ]
      : []),
    // Then native.
    nativeToken,
    // Then other CW20.
    {
      chainId,
      type: TokenType.Cw20,
      denomOrAddress: 'other_cw20',
      symbol:
        (depositInfo.type === TokenType.Cw20 && depositInfo.token?.symbol) ||
        t('form.cw20Token'),
      imageUrl:
        (depositInfo.type === TokenType.Cw20 && depositInfo.token?.imageUrl) ||
        undefined,
      source: {
        chainId,
        type: TokenType.Cw20,
        denomOrAddress: 'other_cw20',
      },
    },
    // Then the chain assets.
    ...getChainAssets(chainId).filter(
      ({ denomOrAddress }) => denomOrAddress !== nativeToken.denomOrAddress
    ),
  ]
  const selectedToken = availableTokens.find(
    (token) =>
      // `voting_module_token` and `cw20` only correspond to one token above.
      // `native` can be multiple, so match on denom.
      token.type === depositInfo.type &&
      (depositInfo.type !== TokenType.Native ||
        token.denomOrAddress === depositInfo.denomOrAddress)
  )

  const minimumDeposit = convertMicroDenomToDenomWithDecimals(
    1,
    depositInfo.token?.decimals ?? 0
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 rounded-lg border border-border-primary bg-background-secondary p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-stretch gap-2 xs:flex-row xs:items-start xs:justify-between">
            <p className="primary-text">
              <MoneyEmoji /> {t('form.proposalDepositTitle')}
            </p>

            <FormSwitchCard
              fieldName={
                (fieldNamePrefix + 'depositRequired') as 'depositRequired'
              }
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={depositRequired}
            />
          </div>
          <p className="secondary-text max-w-prose">
            {t('form.proposalDepositDescription')}
          </p>
        </div>

        {depositRequired && (
          <div className="flex max-w-md grow flex-col gap-1">
            <TokenInput
              amount={{
                watch,
                setValue,
                register,
                fieldName: (fieldNamePrefix +
                  'depositInfo.amount') as 'depositInfo.amount',
                error: errors?.depositInfo?.amount,
                min: minimumDeposit,
                step: minimumDeposit,
              }}
              onSelectToken={({ type, denomOrAddress }) => {
                // Type-check, should never happen.
                if (
                  type !== 'voting_module_token' &&
                  type !== TokenType.Native &&
                  type !== TokenType.Cw20
                ) {
                  return
                }

                setValue(
                  (fieldNamePrefix + 'depositInfo.type') as 'depositInfo.type',
                  type
                )

                if (type === TokenType.Native) {
                  setValue(
                    (fieldNamePrefix +
                      'depositInfo.denomOrAddress') as 'depositInfo.denomOrAddress',
                    denomOrAddress
                  )
                } else {
                  // `voting_module_token` doesn't need one set, and cw20 shows
                  // an address input, so clear for both.
                  setValue(
                    (fieldNamePrefix +
                      'depositInfo.denomOrAddress') as 'depositInfo.denomOrAddress',
                    ''
                  )
                }
              }}
              readOnly={!isCreating}
              selectedToken={selectedToken}
              tokenFallback={
                depositInfo.type === 'cw20' ? (
                  // If valid cw20 address, show loader since deposit token
                  // hasn't yet loaded.
                  isValidBech32Address(
                    depositInfo.denomOrAddress,
                    bech32Prefix
                  ) && !cw20AddressError ? (
                    <Loader size={24} />
                  ) : (
                    t('form.cw20Token')
                  )
                ) : undefined
              }
              tokens={{ loading: false, data: availableTokens }}
            />
            <InputErrorMessage error={errors?.depositInfo?.amount} />

            {depositInfo.type === 'cw20' && (
              <div className="mt-1 flex flex-col gap-1">
                <InputLabel name={t('form.tokenAddress')} />

                <AddressInput
                  disabled={!isCreating}
                  error={errors?.depositInfo?.denomOrAddress}
                  fieldName={
                    (fieldNamePrefix +
                      'depositInfo.denomOrAddress') as 'depositInfo.denomOrAddress'
                  }
                  register={register}
                  type="contract"
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                    // Invalidate field if additional error is present.
                    () => cw20AddressError || true,
                  ]}
                />

                <InputErrorMessage
                  error={
                    errors?.depositInfo?.denomOrAddress || cw20AddressError
                  }
                />
              </div>
            )}

            <p className="secondary-text mt-2 mb-1">
              {t('form.refundPolicyTitle')}
            </p>
            <SegmentedControls<DepositRefundPolicy>
              disabled={!isCreating}
              onSelect={(refundPolicy) =>
                setValue(
                  (fieldNamePrefix +
                    'depositInfo.refundPolicy') as 'depositInfo.refundPolicy',
                  refundPolicy
                )
              }
              selected={watch(
                (fieldNamePrefix +
                  'depositInfo.refundPolicy') as 'depositInfo.refundPolicy'
              )}
              tabs={DepositRefundPolicyValues.map((depositRefundPolicy) => ({
                label: t(`depositRefundPolicy.${depositRefundPolicy}`),
                value: depositRefundPolicy,
              }))}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-end justify-between gap-x-12 gap-y-4 rounded-lg border border-border-primary bg-background-secondary p-3">
        <div className="flex flex-col gap-2">
          <p className="primary-text">
            <LockWithPenEmoji /> {t('form.proposalSubmissionPolicyTitle')}
          </p>
          <p className="secondary-text max-w-prose">
            {t('form.proposalSubmissionPolicyDescription')}
          </p>
        </div>

        <SegmentedControls
          className="grow"
          disabled={!isCreating}
          onSelect={(value) =>
            setValue(
              (fieldNamePrefix + 'anyoneCanPropose') as 'anyoneCanPropose',
              value
            )
          }
          selected={anyoneCanPropose}
          tabs={[
            {
              label: t('info.onlyMembers'),
              value: false,
            },
            {
              label: t('info.anyone'),
              value: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
