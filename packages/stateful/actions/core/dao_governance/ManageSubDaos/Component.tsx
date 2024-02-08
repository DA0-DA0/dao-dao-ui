import { Add, Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  IconButton,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { SubDao } from '@dao-dao/types/contracts/DaoCore.v2'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export interface ManageSubDaosData {
  toAdd: SubDao[]
  toRemove: { address: string }[]
}

export interface ManageSubDaosOptions {
  currentSubDaos: {
    name: string
    address: string
  }[]
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps<any>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const ManageSubDaosComponent: ActionComponent<ManageSubDaosOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { currentSubDaos, AddressInput, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, watch, control } = useFormContext<ManageSubDaosData>()

  const {
    fields: toAddFields,
    append: toAddAppend,
    remove: toAddRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'toAdd') as 'toAdd',
  })
  const {
    fields: toRemoveFields,
    append: toRemoveAppend,
    remove: toRemoveRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'toRemove') as 'toRemove',
  })

  return (
    <>
      <div className="flex flex-col items-stretch gap-1">
        <InputLabel name={t('form.subDaosToRecognize')} />

        {toAddFields.map(({ id }, index) => (
          <div key={id} className="flex flex-row items-center gap-2">
            <div className="grow">
              <AddressInput
                disabled={!isCreating}
                error={errors?.toAdd?.[index]?.addr}
                fieldName={
                  (fieldNamePrefix +
                    `toAdd.${index}.addr`) as `toAdd.${number}.addr`
                }
                register={register}
                validation={[
                  validateRequired,
                  makeValidateAddress(bech32Prefix),
                  (value) =>
                    currentSubDaos.every(({ address }) => address !== value) ||
                    t('error.subDaoAlreadyExists'),
                ]}
              />
              <InputErrorMessage error={errors?.toAdd?.[index]?.addr} />
            </div>

            {isCreating && (
              <IconButton
                Icon={Close}
                onClick={() => toAddRemove(index)}
                size="sm"
                variant="ghost"
              />
            )}
          </div>
        ))}

        {!isCreating && toAddFields.length === 0 && (
          <p className="text-xs italic text-text-tertiary">{t('info.none')}</p>
        )}

        {isCreating && (
          <Button
            className="self-start"
            onClick={() => toAddAppend({ addr: '' })}
            size="sm"
            variant="secondary"
          >
            <Add className="!h-4 !w-4" />
            {t('button.add')}
          </Button>
        )}
      </div>

      {(isCreating || toRemoveFields.length > 0) && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel name={t('form.subDaosToRemove')} />

          {isCreating ? (
            currentSubDaos.length ? (
              currentSubDaos.map(({ name, address }) => {
                const index = watch(
                  // eslint-disable-next-line i18next/no-literal-string
                  (fieldNamePrefix + 'toRemove') as 'toRemove'
                ).findIndex(({ address: a }) => a === address)

                return (
                  <div
                    key={address}
                    className="flex flex-row items-center gap-2"
                  >
                    <Checkbox
                      checked={index > -1}
                      onClick={
                        isCreating
                          ? () =>
                              index > -1
                                ? toRemoveRemove(index)
                                : toRemoveAppend({ address })
                          : undefined
                      }
                      readOnly={!isCreating}
                    />

                    <p
                      className="body-text cursor-pointer"
                      onClick={
                        isCreating
                          ? () =>
                              index > -1
                                ? toRemoveRemove(index)
                                : toRemoveAppend({ address })
                          : undefined
                      }
                    >
                      {name}
                    </p>
                  </div>
                )
              })
            ) : (
              <p className="text-xs italic text-text-tertiary">
                {t('info.none')}
              </p>
            )
          ) : (
            toRemoveFields.map(({ address }) => (
              // Padding to match SubDAOs to recognize AddressInput padding.
              <EntityDisplay key={address} address={address} className="p-2" />
            ))
          )}
        </div>
      )}
    </>
  )
}
