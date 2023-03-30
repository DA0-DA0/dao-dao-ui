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
  TokenInputOption,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  DepositRefundPolicy,
  GenericToken,
  TokenType,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_TOKEN,
  convertMicroDenomToDenomWithDecimals,
  ibcAssets,
  isValidContractAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { Trans } from '../../../../../../components/Trans'

const DepositRefundPolicyValues = Object.values(DepositRefundPolicy)

export interface UpdatePreProposeConfigData {
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

export const UpdatePreProposeConfigComponent: ActionComponent<
  UpdatePreProposeConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { governanceToken, cw20AddressError },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } =
    useFormContext<UpdatePreProposeConfigData>()

  const depositRequired = watch(
    (fieldNamePrefix + 'depositRequired') as 'depositRequired'
  )
  const depositInfo = watch((fieldNamePrefix + 'depositInfo') as 'depositInfo')
  const anyoneCanPropose = watch(
    (fieldNamePrefix + 'anyoneCanPropose') as 'anyoneCanPropose'
  )

  const availableTokens: TokenInputOption[] = [
    // Governance token first.
    ...(governanceToken
      ? [
          {
            ...governanceToken,
            type: 'voting_module_token',
            description: t('title.governanceToken'),
            imageUrl:
              (depositInfo.type === 'voting_module_token' &&
                depositInfo.token?.imageUrl) ||
              undefined,
          },
        ]
      : []),
    // Then native.
    {
      ...NATIVE_TOKEN,
    },
    // Then the IBC assets.
    ...ibcAssets.tokens.map(({ juno_denom, symbol, name, logoURI }) => ({
      type: TokenType.Native,
      denomOrAddress: juno_denom,
      symbol,
      description: symbol === name ? undefined : name,
      imageUrl: logoURI,
    })),
    // Then other CW20.
    {
      type: TokenType.Cw20,
      denomOrAddress: 'other_cw20',
      symbol:
        (depositInfo.type === TokenType.Cw20 && depositInfo.token?.symbol) ||
        t('form.cw20Token'),
      imageUrl:
        (depositInfo.type === TokenType.Cw20 && depositInfo.token?.imageUrl) ||
        undefined,
    },
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
      <p className="secondary-text mb-2 max-w-prose">
        <Trans i18nKey="form.updateProposalSubmissionConfigDescription">
          This will update the proposal submission configuration for this DAO. A
          bad configuration can lock the DAO. Take care. If you have questions,
          please feel free to ask in the{' '}
          <a
            className="underline"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            DAO DAO Discord
          </a>
          .
        </Trans>
      </p>

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
              amountError={errors?.depositInfo?.amount}
              amountFieldName={
                (fieldNamePrefix + 'depositInfo.amount') as 'depositInfo.amount'
              }
              amountMin={minimumDeposit}
              amountStep={minimumDeposit}
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
              register={register}
              selectedToken={selectedToken}
              setValue={setValue}
              tokenFallback={
                depositInfo.type === 'cw20' ? (
                  // If valid cw20 address, show loader since deposit token
                  // hasn't yet loaded.
                  isValidContractAddress(
                    depositInfo.denomOrAddress,
                    CHAIN_BECH32_PREFIX
                  ) && !cw20AddressError ? (
                    <Loader size={24} />
                  ) : (
                    t('form.cw20Token')
                  )
                ) : undefined
              }
              tokens={{ loading: false, data: availableTokens }}
              watch={watch}
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
                    validateContractAddress,
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
