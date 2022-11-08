import { Add, Close } from '@mui/icons-material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  Checkbox,
  FamilyEmoji,
  IconButton,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { SubDao } from '@dao-dao/types/contracts/CwdCore.v2'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

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
      Icon={FamilyEmoji}
      onRemove={onRemove}
      title={t('title.manageSubDaos')}
    >
      <InputLabel className="mt-2" name={t('form.subDaosToRecognize')} />
      <div className="flex flex-col items-stretch gap-2">
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
                  validateContractAddress,
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

      <InputLabel className="mt-4" name={t('form.subDaosToRemove')} />
      <div className="flex flex-col items-stretch gap-2">
        {isCreating &&
          currentSubDaos.map(({ name, address }) => {
            const index = watch(
              // eslint-disable-next-line i18next/no-literal-string
              (fieldNamePrefix + 'toRemove') as 'toRemove'
            ).findIndex(({ address: a }) => a === address)

            return (
              <div key={address} className="flex flex-row items-center gap-2">
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
          })}
        {(isCreating
          ? currentSubDaos.length === 0
          : toRemoveFields.length === 0) && (
          <p className="text-xs italic text-text-tertiary">{t('info.none')}</p>
        )}
      </div>
    </ActionCard>
  )
}
