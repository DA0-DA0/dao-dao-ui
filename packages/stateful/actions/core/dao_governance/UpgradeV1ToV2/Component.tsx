import { Add, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  RadioInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  AddressInputProps,
  ContractVersion,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { SubDao } from '@dao-dao/types/contracts/DaoCore.v2'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export interface UpgradeV1ToV2Data {
  targetAddress: string
  subDaos: SubDao[]
}

export interface UpgradeV1ToV2ComponentOptions {
  // All SubDAOs of this DAO that are on v1 and can be upgraded.
  v1SubDaos: string[]
  // If this DAO is a SubDAO (i.e. it has a parent), then the parent DAO must be
  // the one to upgrade this. Add a message to the UI to indicate this.
  hasParent: boolean
  // If this DAO is on v1 still, it can be upgraded. Otherwise, it cannot. If it
  // is not on v1 and there are no v1 SubDAOs, then nothing can be upgraded.
  onV1: boolean
  // Used to render DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps<any>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const UpgradeV1ToV2Component: ActionComponent<
  UpgradeV1ToV2ComponentOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { v1SubDaos, hasParent, onV1, AddressInput, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { register, control, setValue, watch } =
    useFormContext<UpgradeV1ToV2Data>()
  const {
    address,
    context,
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const targetAddress = watch(
    (fieldNamePrefix + 'targetAddress') as 'targetAddress'
  )

  const {
    fields: subDaoFields,
    append: subDaoAppend,
    remove: subDaoRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'subDaos') as 'subDaos',
  })

  // Type-check. Already checked in the action maker.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  return isCreating && !onV1 && v1SubDaos.length === 0 ? (
    <p className="body-text max-w-prose text-text-interactive-error">
      {t('error.daoAndSubDaosAlreadyOnV2')}
    </p>
  ) : isCreating && hasParent && v1SubDaos.length === 0 ? (
    <p className="body-text max-w-prose text-text-interactive-error">
      {t('error.parentMustUpgradeToV2')}
    </p>
  ) : (
    <div className="flex flex-col gap-4">
      {isCreating && (
        <p className="body-text max-w-prose">
          {t('info.upgradeToV2Explanation')}
        </p>
      )}

      {/* If v1 SubDAOs exist, show them along with the current DAO. If not creating, only show if the target is not the current DAO. */}
      {((v1SubDaos.length > 0 && isCreating) ||
        (!isCreating && targetAddress !== address)) && (
        <div className="space-y-1">
          <InputLabel name={t('title.dao')} />

          {isCreating ? (
            <RadioInput
              fieldName={(fieldNamePrefix + 'targetAddress') as 'targetAddress'}
              options={[
                // If current DAO is on v1, include it first.
                ...(context.info.coreVersion === ContractVersion.V1
                  ? [address]
                  : []),
                // Add v1 SubDAOs.
                ...v1SubDaos,
              ].map((address) => ({
                display: <EntityDisplay address={address} hideImage noCopy />,
                value: address,
              }))}
              setValue={setValue}
              watch={watch}
            />
          ) : (
            <EntityDisplay address={targetAddress} />
          )}
        </div>
      )}

      <div className="space-y-2">
        <InputLabel name={t('form.subDaosToRecognize')} />

        <div className={clsx('flex flex-col', isCreating && 'gap-2')}>
          {subDaoFields.map(({ id }, index) => (
            <div key={id} className="flex flex-row items-center gap-2">
              <div className="grow">
                <AddressInput
                  disabled={!isCreating}
                  error={errors?.subDaos?.[index]?.addr}
                  fieldName={
                    (fieldNamePrefix +
                      `subDaos.${index}.addr`) as `subDaos.${number}.addr`
                  }
                  register={register}
                  type="contract"
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                  ]}
                />
                <InputErrorMessage error={errors?.subDaos?.[index]?.addr} />
              </div>

              {isCreating && (
                <IconButton
                  Icon={Close}
                  onClick={() => subDaoRemove(index)}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
          ))}

          {isCreating ? (
            <Button
              className="self-start"
              onClick={() => subDaoAppend({ addr: '' })}
              size="sm"
              variant="secondary"
            >
              <Add className="!h-4 !w-4" />
              {t('button.add')}
            </Button>
          ) : (
            subDaoFields.length === 0 && (
              <p className="text-xs italic text-text-tertiary">
                {t('info.none')}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
