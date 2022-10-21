import { Add, Close } from '@mui/icons-material'
import Emoji from 'a11y-react-emoji'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard } from '@dao-dao/common/actions'
import {
  AddressInput,
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NumberInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { Member } from '@dao-dao/types/contracts/Cw4Group'
import {
  validateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

export interface ManageMembersData {
  toAdd: Member[]
  toRemove: { addr: string }[]
}

export interface ManageMembersOptions {
  currentMembers: string[]
}

export const ManageMembersComponent: ActionComponent<ManageMembersOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { currentMembers },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch, control } =
    useFormContext<ManageMembersData>()

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
      Icon={ManageMembersIcon}
      onRemove={onRemove}
      title={t('title.manageMembers')}
    >
      <InputLabel className="mt-2" name={t('form.membersToAddOrUpdate')} />
      <div className="flex flex-col items-stretch gap-2">
        {toAddFields.map(({ id }, index) => {
          const addrFieldName = (fieldNamePrefix +
            `toAdd.${index}.addr`) as `toAdd.${number}.addr`
          const weightFieldName = (fieldNamePrefix +
            `toAdd.${index}.weight`) as `toAdd.${number}.weight`

          return (
            <div key={id} className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <NumberInput
                    disabled={!isCreating}
                    error={errors?.toAdd?.[index]?.weight}
                    fieldName={weightFieldName}
                    onMinus={() =>
                      setValue(
                        weightFieldName,
                        Math.max(watch(weightFieldName) - 1, 0)
                      )
                    }
                    onPlus={() =>
                      setValue(weightFieldName, watch(weightFieldName) + 1)
                    }
                    placeholder={t('form.votingWeightPlaceholder')}
                    register={register}
                    sizing="md"
                    validation={[validateRequired, validateNonNegative]}
                  />
                  <InputErrorMessage error={errors?.toAdd?.[index]?.weight} />
                </div>
              </div>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <p className="secondary-text font-mono text-2xl">&#10142;</p>
              <div className="grow">
                <AddressInput
                  disabled={!isCreating}
                  error={errors?.toAdd?.[index]?.addr}
                  fieldName={addrFieldName}
                  register={register}
                  validation={[
                    validateRequired,
                    validateAddress,
                    (value) =>
                      toRemoveFields.every(({ addr }) => addr !== value) ||
                      t('error.invalidDuplicateFound'),
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
          )
        })}
        {!isCreating && toAddFields.length === 0 && (
          <p className="text-text-tertiary text-xs italic">{t('info.none')}</p>
        )}
        {isCreating && (
          <Button
            className="self-start"
            onClick={() => toAddAppend({ weight: NaN, addr: '' })}
            size="sm"
            variant="secondary"
          >
            <Add className="!h-4 !w-4" />
            {t('button.add')}
          </Button>
        )}
      </div>

      <InputLabel className="mt-4" name={t('form.membersToRemove')} />
      <div className="flex flex-col items-stretch gap-2">
        {toRemoveFields.map(({ id }, index) => (
          <div key={id} className="flex flex-row items-center gap-4">
            <div className="grow">
              <AddressInput
                disabled={!isCreating}
                error={errors?.toRemove?.[index]?.addr}
                fieldName={
                  (fieldNamePrefix +
                    `toRemove.${index}.addr`) as `toRemove.${number}.addr`
                }
                register={register}
                validation={[
                  validateRequired,
                  validateAddress,
                  (value) =>
                    currentMembers.includes(value) ||
                    t('error.addressNotAMember'),
                  (value) =>
                    toAddFields.every(({ addr }) => addr !== value) ||
                    t('error.invalidDuplicateFound'),
                ]}
              />
              <InputErrorMessage error={errors?.toRemove?.[index]?.addr} />
            </div>

            {isCreating && (
              <IconButton
                Icon={Close}
                onClick={() => toRemoveRemove(index)}
                size="sm"
                variant="ghost"
              />
            )}
          </div>
        ))}
        {!isCreating && toRemoveFields.length === 0 && (
          <p className="text-text-tertiary text-xs italic">{t('info.none')}</p>
        )}
        {isCreating && (
          <Button
            className="self-start"
            onClick={() => toRemoveAppend({ addr: '' })}
            size="sm"
            variant="secondary"
          >
            <Add className="!h-4 !w-4" />
            {t('button.add')}
          </Button>
        )}
      </div>
    </ActionCard>
  )
}

export const ManageMembersIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.people')} symbol="👥" />
}
