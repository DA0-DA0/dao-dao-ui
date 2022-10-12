import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard } from '@dao-dao/actions'
import { Trans } from '@dao-dao/common'
import { ActionComponent, DepositRefundPolicy } from '@dao-dao/tstypes'
import {
  AddressInput,
  FormSwitchCard,
  FormattedJSONDisplay,
  FormattedJSONDisplayProps,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SegmentedControls,
  SelectInput,
  SpendEmoji,
  UpdateProposalConfigIcon,
} from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  nativeTokenLabel,
  validateContractAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

const DepositRefundPolicyValues = Object.values(DepositRefundPolicy)

export interface UpdatePreProposeConfigData {
  depositRequired: boolean
  depositInfo: {
    amount: number
    type: 'native' | 'cw20' | 'voting_module_token'
    cw20Address: string
    cw20Decimals: number
    refundPolicy: DepositRefundPolicy
  }
}

export interface UpdatePreProposeConfigOptions {
  cw20: {
    governanceTokenSymbol?: string
    additionalAddressError?: string
    formattedJsonDisplayProps: FormattedJSONDisplayProps
  }
}

export const UpdatePreProposeConfigComponent: ActionComponent<
  UpdatePreProposeConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  onRemove,
  isCreating,
  Loader,
  options: { cw20 },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const depositRequired: UpdatePreProposeConfigData['depositRequired'] = watch(
    fieldNamePrefix + 'depositRequired'
  )
  const depositInfo: UpdatePreProposeConfigData['depositInfo'] = watch(
    fieldNamePrefix + 'depositInfo'
  )

  return (
    <ActionCard
      Icon={UpdateProposalConfigIcon}
      onRemove={onRemove}
      title={t('form.updateProposalSubmissionConfigTitle')}
    >
      <p className="mb-3 max-w-prose secondary-text">
        <Trans
          Loader={Loader}
          i18nKey="form.updateProposalSubmissionConfigDescription"
        >
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

      <div className="flex flex-col gap-4 p-3 rounded-lg border border-default">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 justify-between items-start">
            <h3 className="primary-text">
              <SpendEmoji /> {t('form.proposalDepositTitle')}
            </h3>

            <FormSwitchCard
              fieldName={fieldNamePrefix + 'depositRequired'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={watch(fieldNamePrefix + 'depositRequired')}
            />
          </div>
          <p className="max-w-prose secondary-text">
            {t('form.proposalDepositDescription')}
          </p>
        </div>

        {depositRequired && (
          <div className="flex flex-col grow gap-1">
            <div className="flex flex-row grow gap-1 items-stretch">
              <NumberInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.depositInfo?.amount}
                fieldName={fieldNamePrefix + 'depositInfo.amount'}
                register={register}
                step={Math.pow(
                  10,
                  depositInfo.type === 'cw20'
                    ? -depositInfo.cw20Decimals
                    : -NATIVE_DECIMALS
                )}
                validation={[validateRequired, validatePositive]}
              />
              <SelectInput
                disabled={!isCreating}
                error={errors?.depositInfo?.type}
                fieldName={fieldNamePrefix + 'depositInfo.type'}
                register={register}
              >
                <option value="native">
                  ${nativeTokenLabel(NATIVE_DENOM)}
                </option>
                {cw20.governanceTokenSymbol && (
                  <option value="voting_module_token">
                    ${cw20.governanceTokenSymbol}
                  </option>
                )}
                <option value="cw20">{t('form.cw20Token')}</option>
              </SelectInput>
            </div>
            <InputErrorMessage error={errors?.depositInfo?.amount} />

            {depositInfo.type === 'cw20' && (
              <div className="flex flex-col gap-1 mt-1">
                <InputLabel name={t('form.tokenAddress')} />

                <AddressInput
                  disabled={!isCreating}
                  error={errors?.depositInfo?.cw20Address}
                  fieldName={fieldNamePrefix + 'depositInfo.cw20Address'}
                  iconType="contract"
                  register={register}
                  validation={[
                    validateRequired,
                    validateContractAddress,
                    // Invalidate field if additional error is present.
                    () => cw20.additionalAddressError || true,
                  ]}
                />

                <InputErrorMessage
                  error={
                    errors?.depositInfo?.cw20Address ||
                    (cw20.additionalAddressError && {
                      message: cw20.additionalAddressError,
                    })
                  }
                />

                <div className="mt-1">
                  <FormattedJSONDisplay {...cw20.formattedJsonDisplayProps} />
                </div>
              </div>
            )}

            <p className="mt-2 mb-1 secondary-text">
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
                label: t(`info.depositRefundPolicy.${depositRefundPolicy}`),
                value: depositRefundPolicy,
              }))}
            />
          </div>
        )}
      </div>
    </ActionCard>
  )
}
