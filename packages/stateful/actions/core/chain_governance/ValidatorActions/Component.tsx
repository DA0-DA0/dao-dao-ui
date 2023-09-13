import { Check, Close } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { MsgWithdrawValidatorCommission } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from '@dao-dao/protobuf/codegen/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  ChainPickerInput,
  CodeMirrorInput,
  InputLabel,
  SelectInput,
} from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  getChainForChainId,
  getNativeTokenForChainId,
  toValidatorAddress,
  validateJSON,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export const VALIDATOR_ACTION_TYPES = [
  {
    typeUrl: MsgWithdrawValidatorCommission.typeUrl,
    i18nKey: 'title.withdrawValidatorCommission',
  },
  {
    typeUrl: MsgCreateValidator.typeUrl,
    i18nKey: 'title.createValidator',
  },
  {
    typeUrl: MsgEditValidator.typeUrl,
    i18nKey: 'title.editValidator',
  },
  {
    typeUrl: MsgUnjail.typeUrl,
    i18nKey: 'title.unjailValidator',
  },
]

export type ValidatorActionsData = {
  chainId: string
  validatorActionTypeUrl: string
  createMsg: string
  editMsg: string
}

export const ValidatorActionsComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: currentChainId },
    address: _address,
    context,
  } = useActionOptions()
  const { control, register, watch, getValues, setValue } =
    useFormContext<ValidatorActionsData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const validatorActionTypeUrl = watch(
    (fieldNamePrefix + 'validatorActionTypeUrl') as 'validatorActionTypeUrl'
  )

  const updateChainValues = (chainId: string, typeUrl: string) => {
    const address =
      context.type === ActionContextType.Dao && currentChainId !== chainId
        ? context.info.polytoneProxies[chainId] || ''
        : _address
    const validatorAddress =
      address &&
      toValidatorAddress(address, getChainForChainId(chainId).bech32_prefix)

    if (typeUrl === MsgCreateValidator.typeUrl) {
      const createMsg = JSON.parse(
        getValues((fieldNamePrefix + 'createMsg') as 'createMsg')
      )
      createMsg.delegatorAddress = address
      createMsg.validatorAddress = validatorAddress
      createMsg.value.denom = getNativeTokenForChainId(chainId).denomOrAddress
      setValue(
        (fieldNamePrefix + 'createMsg') as 'createMsg',
        JSON.stringify(createMsg, null, 2)
      )
    } else if (typeUrl === MsgEditValidator.typeUrl) {
      const editMsg = JSON.parse(
        getValues((fieldNamePrefix + 'editMsg') as 'editMsg')
      )
      editMsg.validatorAddress = validatorAddress
      setValue(
        (fieldNamePrefix + 'editMsg') as 'editMsg',
        JSON.stringify(editMsg, null, 2)
      )
    }
  }

  return (
    <>
      <ChainPickerInput
        className="mb-4"
        disabled={!isCreating}
        fieldName={fieldNamePrefix + 'chainId'}
        onChange={(chainId) =>
          updateChainValues(chainId, validatorActionTypeUrl)
        }
      />

      <SelectInput
        disabled={!isCreating}
        error={errors?.validatorActionTypeUrl}
        fieldName={
          (fieldNamePrefix +
            'validatorActionTypeUrl') as 'validatorActionTypeUrl'
        }
        onChange={(value) => updateChainValues(chainId, value)}
        register={register}
      >
        {VALIDATOR_ACTION_TYPES.map(({ typeUrl, i18nKey }) => (
          <option key={typeUrl} value={typeUrl}>
            {t(i18nKey)}
          </option>
        ))}
      </SelectInput>

      {validatorActionTypeUrl === MsgCreateValidator.typeUrl && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.createValidatorMessage')}
            tooltip={t('form.createValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.createMsg}
            fieldName={(fieldNamePrefix + 'createMsg') as 'createMsg'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.createMsg?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.createMsg?.message}</span>
            </p>
          ) : (
            <p className="text-success flex items-center gap-1 text-sm">
              <Check className="inline w-5" /> {t('info.jsonIsValid')}
            </p>
          )}
        </div>
      )}

      {validatorActionTypeUrl === MsgEditValidator.typeUrl && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.editValidatorMessage')}
            tooltip={t('form.editValidatorMessageTooltip')}
          />
          <CodeMirrorInput
            control={control}
            error={errors?.editMsg}
            fieldName={(fieldNamePrefix + 'editMsg') as 'editMsg'}
            readOnly={!isCreating}
            validation={[validateJSON]}
          />
          {errors?.editMsg?.message ? (
            <p className="text-error flex items-center gap-1 text-sm">
              <Close className="inline w-5" />{' '}
              <span>{errors.editMsg?.message}</span>
            </p>
          ) : (
            <p className="text-success flex items-center gap-1 text-sm">
              <Check className="inline w-5" /> {t('info.jsonIsValid')}
            </p>
          )}
        </div>
      )}
    </>
  )
}
