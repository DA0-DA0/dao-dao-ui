import { ArrowDropDown } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FilterableItemPopup,
  FormSwitchCard,
  GearEmoji,
  InputErrorMessage,
  InputLabel,
  Loader,
  LockWithPenEmoji,
  MoneyEmoji,
  NumberInput,
  SegmentedControls,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  DepositRefundPolicy,
  GenericToken,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  getFallbackImage,
  ibcAssets,
  isValidContractAddress,
  nativeTokenLabel,
  nativeTokenLogoURI,
  toAccessibleImageUrl,
  validateContractAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard } from '../../../../../../actions'
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
  onRemove,
  isCreating,
  options: { governanceToken, cw20AddressError },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const depositRequired: UpdatePreProposeConfigData['depositRequired'] = watch(
    fieldNamePrefix + 'depositRequired'
  )
  const depositInfo: UpdatePreProposeConfigData['depositInfo'] = watch(
    fieldNamePrefix + 'depositInfo'
  )
  const anyoneCanPropose: UpdatePreProposeConfigData['anyoneCanPropose'] =
    watch(fieldNamePrefix + 'anyoneCanPropose')

  const availableTokens: {
    key: string
    type: 'native' | 'cw20' | 'voting_module_token'
    label: string
    description?: string
    Icon?: ComponentType
  }[] = [
    // Governance token first.
    ...(governanceToken
      ? [
          {
            key: 'voting_module_token',
            type: 'voting_module_token' as const,
            label: '$' + governanceToken.symbol,
            imageUrl: governanceToken.imageUrl,
          },
        ]
      : []),
    // Then native.
    {
      key: NATIVE_DENOM,
      type: 'native' as const,
      label: nativeTokenLabel(NATIVE_DENOM),
      imageUrl: nativeTokenLogoURI(NATIVE_DENOM),
    },
    // Then the IBC assets.
    ...ibcAssets.tokens.map(({ juno_denom, symbol, name, logoURI }) => ({
      key: juno_denom,
      type: 'native' as const,
      label: symbol,
      description: symbol === name ? undefined : name,
      imageUrl: logoURI,
    })),
    // Then other CW20.
    {
      key: 'other_cw20',
      type: 'cw20' as const,
      label: t('form.cw20Token'),
    },
  ].map(({ imageUrl, ...rest }) => ({
    ...rest,
    Icon: imageUrl
      ? () => (
          <div
            className="h-8 w-8 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        )
      : undefined,
  }))

  const minimumDeposit = convertMicroDenomToDenomWithDecimals(
    1,
    depositInfo.token?.decimals ?? 0
  )

  return (
    <ActionCard
      Icon={GearEmoji}
      childrenContainerClassName="!gap-2"
      onRemove={onRemove}
      title={t('form.updateProposalSubmissionConfigTitle')}
    >
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
              fieldName={fieldNamePrefix + 'depositRequired'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={watch(fieldNamePrefix + 'depositRequired')}
            />
          </div>
          <p className="secondary-text max-w-prose">
            {t('form.proposalDepositDescription')}
          </p>
        </div>

        {depositRequired && (
          <div className="flex grow flex-col gap-1">
            <div className="flex grow flex-col gap-1 xs:flex-row xs:items-stretch">
              <NumberInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.depositInfo?.amount}
                fieldName={fieldNamePrefix + 'depositInfo.amount'}
                min={minimumDeposit}
                register={register}
                setValue={setValue}
                step={minimumDeposit}
                validation={[validateRequired, validatePositive]}
                watch={watch}
              />

              <FilterableItemPopup
                Trigger={({ open, ...props }) => (
                  <Button
                    contentContainerClassName="justify-between text-icon-primary"
                    disabled={!isCreating}
                    pressed={open}
                    variant="secondary"
                    {...props}
                  >
                    {depositInfo.token ? (
                      <div className="flex flex-row items-center gap-2">
                        <div
                          className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${toAccessibleImageUrl(
                              depositInfo.token.imageUrl ||
                                getFallbackImage(
                                  depositInfo.token.denomOrAddress
                                )
                            )})`,
                          }}
                        />

                        <p>${depositInfo.token.symbol}</p>
                      </div>
                    ) : (
                      depositInfo.type === 'cw20' &&
                      // If valid cw20 address, show loader since deposit token
                      // hasn't yet loaded.
                      (isValidContractAddress(
                        depositInfo.denomOrAddress,
                        CHAIN_BECH32_PREFIX
                      ) && !cw20AddressError ? (
                        <Loader size={24} />
                      ) : (
                        t('form.cw20Token')
                      ))
                    )}

                    {isCreating && <ArrowDropDown className="ml-2 !h-6 !w-6" />}
                  </Button>
                )}
                filterableItemKeys={FILTERABLE_KEYS}
                items={availableTokens}
                onSelect={({ key, type }) => {
                  setValue(fieldNamePrefix + 'depositInfo.type', type)

                  // `key` for native tokens is the denom.
                  if (type === 'native') {
                    setValue(
                      fieldNamePrefix + 'depositInfo.denomOrAddress',
                      key
                    )
                  } else {
                    // `voting_module_token` doesn't need one set, and `cw20`
                    // shows an address input, so clear for both.
                    setValue(fieldNamePrefix + 'depositInfo.denomOrAddress', '')
                  }
                }}
                searchPlaceholder={t('info.searchForToken')}
              />
            </div>
            <InputErrorMessage error={errors?.depositInfo?.amount} />

            {depositInfo.type === 'cw20' && (
              <div className="mt-1 flex flex-col gap-1">
                <InputLabel name={t('form.tokenAddress')} />

                <AddressInput
                  disabled={!isCreating}
                  error={errors?.depositInfo?.denomOrAddress}
                  fieldName={fieldNamePrefix + 'depositInfo.denomOrAddress'}
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
                  fieldNamePrefix + 'depositInfo.refundPolicy',
                  refundPolicy
                )
              }
              selected={watch(fieldNamePrefix + 'depositInfo.refundPolicy')}
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
            setValue(fieldNamePrefix + 'anyoneCanPropose', value)
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
    </ActionCard>
  )
}

const FILTERABLE_KEYS = ['key', 'label', 'description']
