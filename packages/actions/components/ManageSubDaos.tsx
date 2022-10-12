import { PlusIcon, XIcon } from '@heroicons/react/outline'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard } from '@dao-dao/actions'
import { ActionComponent } from '@dao-dao/tstypes/actions'
import { SubDao } from '@dao-dao/tstypes/contracts/CwdCore.v2'
import {
  AddressInput,
  Button,
  Checkbox,
  InputErrorMessage,
  InputLabel,
  ManageSubDaosEmoji,
} from '@dao-dao/ui'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

export interface ManageSubDaosData {
  toAdd: SubDao[]
  toRemove: { address: string }[]
}

export interface ManageSubDaosOptions {
  currentSubDaos: {
    name: string
    address: string
  }[]
}

export const ManageSubDaosComponent: ActionComponent<ManageSubDaosOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { currentSubDaos },
}) => {
  const { t } = useTranslation()
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
    <ActionCard
      Icon={ManageSubDaosEmoji}
      onRemove={onRemove}
      title={t('title.manageSubDaos')}
    >
      <InputLabel className="mt-2" name={t('form.subDaosToAdd')} />
      <div className="flex flex-col gap-2 items-stretch">
        {toAddFields.map(({ id }, index) => (
          <div key={id} className="flex flex-row gap-4 items-center">
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
                  validateContractAddress,
                  (value) =>
                    currentSubDaos.every(({ address }) => address !== value) ||
                    t('error.subDaoAlreadyExists'),
                ]}
              />
              <InputErrorMessage error={errors?.toAdd?.[index]?.addr} />
            </div>

            {isCreating && (
              <button onClick={() => toAddRemove(index)} type="button">
                <XIcon className="w-4 text-error" />
              </button>
            )}
          </div>
        ))}
        {!isCreating && toAddFields.length === 0 && (
          <p className="text-xs italic text-tertiary">{t('info.none')}</p>
        )}
        {isCreating && (
          <Button
            className="self-start"
            onClick={() => toAddAppend({ addr: '' })}
            size="sm"
            variant="secondary"
          >
            <PlusIcon className="w-4" />
            {t('button.add')}
          </Button>
        )}
      </div>

      <InputLabel className="mt-4" name={t('form.subDaosToRemove')} />
      <div className="flex flex-col gap-2 items-stretch">
        {isCreating &&
          currentSubDaos.map(({ name, address }) => {
            const index = watch(
              // eslint-disable-next-line i18next/no-literal-string
              (fieldNamePrefix + 'toRemove') as 'toRemove'
            ).findIndex(({ address: a }) => a === address)

            return (
              <div key={address} className="flex flex-row gap-1 items-center">
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
                  className="cursor-pointer body-text"
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
          })}
        {(isCreating
          ? currentSubDaos.length === 0
          : toRemoveFields.length === 0) && (
          <p className="text-xs italic text-tertiary">{t('info.none')}</p>
        )}
      </div>
    </ActionCard>
  )
}
