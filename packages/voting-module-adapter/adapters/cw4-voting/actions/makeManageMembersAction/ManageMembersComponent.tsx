import { PlusIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard, ActionComponent } from '@dao-dao/actions'
import { Member } from '@dao-dao/state/clients/cw4-group'
import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
  NumberInput,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
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
  readOnly,
  options: { currentMembers },
}) => {
  const { t } = useTranslation()
  const { register, setValue, control } = useFormContext<ManageMembersData>()

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
      <div className="flex flex-col gap-2 items-stretch">
        {toAddFields.map(({ id, weight }, index) => {
          const addrFieldName = (fieldNamePrefix +
            `toAdd.${index}.addr`) as `toAdd.${number}.addr`
          const weightFieldName = (fieldNamePrefix +
            `toAdd.${index}.weight`) as `toAdd.${number}.weight`

          return (
            <div key={id} className="flex flex-row gap-4 items-center">
              <div className="flex flex-row gap-2 items-center">
                <div>
                  <NumberInput
                    disabled={readOnly}
                    error={errors?.toAdd?.[index]?.weight}
                    fieldName={weightFieldName}
                    onPlusMinus={[
                      () => setValue(weightFieldName, Math.max(weight - 1, 0)),
                      () => setValue(weightFieldName, weight + 1),
                    ]}
                    placeholder={t('form.votingWeightPlaceholder')}
                    register={register}
                    sizing="md"
                    validation={[validateRequired, validatePositive]}
                  />
                  <InputErrorMessage error={errors?.toAdd?.[index]?.weight} />
                </div>
              </div>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <p className="font-mono text-2xl secondary-text">&#10142;</p>
              <div className="grow">
                <AddressInput
                  disabled={readOnly}
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

              {!readOnly && (
                <button onClick={() => toAddRemove(index)} type="button">
                  <XIcon className="w-4 text-error" />
                </button>
              )}
            </div>
          )
        })}
        {readOnly && toAddFields.length === 0 && (
          <p className="text-xs italic text-tertiary">{t('info.none')}</p>
        )}
        {!readOnly && (
          <Button
            className="self-start"
            onClick={() => toAddAppend({ weight: 1, addr: '' })}
            size="sm"
            variant="secondary"
          >
            <PlusIcon className="w-4" />
            {t('button.add')}
          </Button>
        )}
      </div>

      <InputLabel className="mt-4" name={t('form.membersToRemove')} />
      <div className="flex flex-col gap-2 items-stretch">
        {toRemoveFields.map(({ id }, index) => (
          <div key={id} className="flex flex-row gap-4 items-center">
            <div className="grow">
              <AddressInput
                disabled={readOnly}
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

            {!readOnly && (
              <button onClick={() => toRemoveRemove(index)} type="button">
                <XIcon className="w-4 text-error" />
              </button>
            )}
          </div>
        ))}
        {readOnly && toRemoveFields.length === 0 && (
          <p className="text-xs italic text-tertiary">{t('info.none')}</p>
        )}
        {!readOnly && (
          <Button
            className="self-start"
            onClick={() => toRemoveAppend({ addr: '' })}
            size="sm"
            variant="secondary"
          >
            <PlusIcon className="w-4" />
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
