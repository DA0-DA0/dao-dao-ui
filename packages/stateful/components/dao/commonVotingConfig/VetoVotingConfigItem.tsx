import { Add, Close, Edit } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  FormSwitchCard,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  ThumbDownEmoji,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithVeto,
  DurationUnitsValues,
} from '@dao-dao/types'
import { InstantiateMsg as Cw1WhitelistInstantiateMsg } from '@dao-dao/types/contracts/Cw1Whitelist'
import {
  instantiateSmartContract,
  isValidBech32Address,
  makeValidateAddress,
  processError,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { useWallet } from '../../../hooks'
import { AddressInput } from '../../AddressInput'

const VetoInput = ({
  data: {
    veto: {
      enabled,
      addresses,
      cw1WhitelistAddress,
      timelockDuration,
      earlyExecute,
      vetoBeforePassed,
    },
  },
  fieldNamePrefix,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
    config,
  } = useSupportedChainContext()
  const { control } = useFormContext<DaoCreationVotingConfigWithVeto>()

  const {
    fields: vetoerFields,
    append: appendVetoer,
    remove: removeVetoer,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'veto.addresses') as 'veto.addresses',
  })

  const { address: walletAddress, getSigningCosmWasmClient } = useWallet()
  const { watch, register, setValue, setError, clearErrors, trigger } =
    useFormContext<DaoCreationVotingConfigWithVeto>()

  const [creatingCw1WhitelistVetoers, setCreatingCw1WhitelistVetoers] =
    useState(false)
  const createCw1WhitelistVetoers = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setCreatingCw1WhitelistVetoers(true)
    try {
      // Trigger veto address field validations.
      await trigger((fieldNamePrefix + 'veto.addresses') as 'veto.addresses', {
        shouldFocus: true,
      })

      if (cw1WhitelistAddress) {
        throw new Error(t('error.accountListAlreadySaved'))
      }
      if (addresses.length < 2) {
        throw new Error(t('error.enterAtLeastTwoAccounts'))
      }
      const admins = addresses.map(({ address }) => address)
      if (admins.some((admin) => !isValidBech32Address(admin, bech32Prefix))) {
        throw new Error(t('error.invalidAccount'))
      }

      const contractAddress = await instantiateSmartContract(
        await getSigningCosmWasmClient(),
        walletAddress,
        config.codeIds.Cw1Whitelist,
        'Cw1Whitelist',
        {
          admins,
          mutable: false,
        } as Cw1WhitelistInstantiateMsg
      )

      setValue(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
        contractAddress
      )

      toast.success(t('success.saved'))
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    } finally {
      setCreatingCw1WhitelistVetoers(false)
    }
  }

  // Prevent submission if the cw1-whitelist contract has not yet been created
  // and it needs to be.
  const vetoAddressesLength = addresses.length
  useEffect(() => {
    if (vetoAddressesLength > 1 && !cw1WhitelistAddress) {
      setError(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
        {
          type: 'manual',
          message: t('error.accountListNeedsSaving'),
        }
      )
    } else {
      clearErrors(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress'
      )
    }
  }, [
    setError,
    clearErrors,
    t,
    vetoAddressesLength,
    cw1WhitelistAddress,
    fieldNamePrefix,
  ])

  return (
    <div className="flex flex-col gap-3">
      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'veto.enabled') as 'veto.enabled'}
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <>
          <div className="space-y-2">
            <InputLabel name={t('form.whoCanVetoProposals')} />

            <div className={clsx(!cw1WhitelistAddress && 'space-y-2')}>
              {vetoerFields.map(({ id }, index) => (
                <div key={id} className="flex flex-row items-center gap-1">
                  <AddressInput
                    containerClassName="grow"
                    disabled={!!cw1WhitelistAddress}
                    error={errors?.veto?.addresses?.[index]?.address}
                    fieldName={
                      (fieldNamePrefix +
                        `veto.addresses.${index}.address`) as `veto.addresses.${number}.address`
                    }
                    register={register}
                    validation={[
                      validateRequired,
                      makeValidateAddress(bech32Prefix),
                    ]}
                  />

                  {!cw1WhitelistAddress && index > 0 && (
                    <IconButton
                      Icon={Close}
                      disabled={creatingCw1WhitelistVetoers}
                      onClick={() => removeVetoer(index)}
                      size="sm"
                      variant="ghost"
                    />
                  )}
                </div>
              ))}
            </div>

            <InputErrorMessage error={errors?.veto?.cw1WhitelistAddress} />

            <div className="flex flex-row justify-between">
              {cw1WhitelistAddress ? (
                <Button
                  className="self-start"
                  onClick={() =>
                    setValue(
                      (fieldNamePrefix +
                        'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
                      undefined
                    )
                  }
                  variant="secondary"
                >
                  <Edit className="!h-4 !w-4" />
                  {t('button.changeVetoer')}
                </Button>
              ) : (
                <Button
                  className="self-start"
                  disabled={creatingCw1WhitelistVetoers}
                  onClick={() =>
                    appendVetoer({
                      address: '',
                    })
                  }
                  variant="secondary"
                >
                  <Add className="!h-4 !w-4" />
                  {t('button.addVetoer')}
                </Button>
              )}

              {!cw1WhitelistAddress && vetoerFields.length > 1 && (
                <Button
                  className="self-start"
                  loading={creatingCw1WhitelistVetoers}
                  onClick={createCw1WhitelistVetoers}
                  variant="primary"
                >
                  {t('button.save')}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <InputLabel
              name={t('form.timelockDuration')}
              tooltip={t('form.timelockDurationTooltip')}
            />

            <div className="flex flex-row gap-2">
              <NumberInput
                containerClassName="grow"
                error={errors?.veto?.timelockDuration?.value}
                fieldName={
                  (fieldNamePrefix +
                    'veto.timelockDuration.value') as 'veto.timelockDuration.value'
                }
                min={0}
                register={register}
                setValue={setValue}
                sizing="sm"
                step={1}
                validation={[validateNonNegative, validateRequired]}
                watch={watch}
              />

              <SelectInput
                error={errors?.veto?.timelockDuration?.units}
                fieldName={
                  (fieldNamePrefix +
                    'veto.timelockDuration.units') as 'veto.timelockDuration.units'
                }
                register={register}
                validation={[validateRequired]}
              >
                {DurationUnitsValues.map((type, idx) => (
                  <option key={idx} value={type}>
                    {t(`unit.${type}`, {
                      count: timelockDuration?.value,
                    }).toLocaleLowerCase()}
                  </option>
                ))}
              </SelectInput>
            </div>
          </div>

          <FormSwitchCard
            containerClassName="self-start"
            fieldName={
              (fieldNamePrefix + 'veto.earlyExecute') as 'veto.earlyExecute'
            }
            label={t('form.earlyExecute')}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.earlyExecuteTooltip')}
            value={earlyExecute}
          />

          <FormSwitchCard
            containerClassName="self-start"
            fieldName={
              (fieldNamePrefix +
                'veto.vetoBeforePassed') as 'veto.vetoBeforePassed'
            }
            label={t('form.vetoBeforePassed')}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.vetoBeforePassedTooltip')}
            value={vetoBeforePassed}
          />
        </>
      )}
    </div>
  )
}

const VetoReview = ({
  data: {
    veto: { enabled },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  return <>{enabled ? t('info.enabled') : t('info.disabled')}</>
}

export const makeVetoVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithVeto> => ({
    Icon: ThumbDownEmoji,
    nameI18nKey: 'title.veto',
    descriptionI18nKey: 'info.vetoDescription',
    Input: VetoInput,
    getInputError: ({
      veto: { timelockDuration } = {
        timelockDuration: undefined,
      },
    } = {}) => timelockDuration?.value || timelockDuration?.units,
    Review: VetoReview,
    getReviewClassName: ({ veto: { enabled } }) =>
      enabled ? 'bg-component-badge-valid' : 'bg-component-badge-error',
  })
