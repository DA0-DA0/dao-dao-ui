import {
  Add,
  ArrowRightAltRounded,
  Close,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  HugeDecimalInput,
  IconButton,
  InputErrorMessage,
  InputLabel,
  Loader,
  useActionOptions,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { Member } from '@dao-dao/types/contracts/Cw4Group'
import {
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

export interface ManageMembersData {
  toAdd: Member[]
  toRemove: string[]
}

export interface ManageMembersOptions {
  currentMembers: LoadingData<string[]>
  // Used to show the profiles of the members being updated.
  AddressInput: ComponentType<AddressInputProps<any>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const ManageMembersComponent: ActionComponent<
  ManageMembersOptions,
  ManageMembersData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { currentMembers, AddressInput, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, setValue, watch, control, getValues } =
    useFormContext<ManageMembersData>()

  const toRemove = watch((fieldNamePrefix + 'toRemove') as 'toRemove')

  const {
    fields: toAddFields,
    append: toAddAppend,
    remove: toAddRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'toAdd') as 'toAdd',
  })

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <>
      {(isCreating || toAddFields.length > 0) && (
        <div className="flex flex-col gap-1">
          <InputLabel
            name={t('form.membersToAddOrUpdate')}
            tooltip={t('form.membersToAddOrUpdateDescription')}
          />

          <div className="flex flex-col items-stretch gap-1">
            {toAddFields.map(({ id }, index) => {
              const addrFieldName = (fieldNamePrefix +
                `toAdd.${index}.addr`) as `toAdd.${number}.addr`
              const weightFieldName = (fieldNamePrefix +
                `toAdd.${index}.weight`) as `toAdd.${number}.weight`

              return (
                <div
                  key={id}
                  className="flex flex-row items-center gap-3 rounded-md bg-background-tertiary p-3"
                >
                  <div
                    className="flex grow flex-row flex-wrap items-stretch gap-x-3 gap-y-2"
                    ref={containerRef}
                  >
                    <div className="flex flex-col gap-1">
                      <InputLabel name={t('form.votingWeightPlaceholder')} />
                      <HugeDecimalInput
                        disabled={!isCreating}
                        error={errors?.toAdd?.[index]?.weight}
                        fieldName={weightFieldName}
                        getValues={getValues}
                        min={0}
                        numericValue
                        placeholder={t('form.votingWeightPlaceholder')}
                        register={register}
                        setValue={setValue}
                        sizing="fill"
                        validation={[validateRequired, validateNonNegative]}
                      />
                      <InputErrorMessage
                        error={errors?.toAdd?.[index]?.weight}
                      />
                    </div>

                    <div
                      className="flex grow flex-row items-stretch justify-center gap-2 sm:gap-3"
                      ref={childRef}
                    >
                      <div
                        className={clsx(
                          'flex flex-row items-center pt-4',
                          wrapped && 'pl-1'
                        )}
                      >
                        <Icon className="!h-6 !w-6 text-text-secondary" />
                      </div>

                      <div className="flex grow flex-col gap-1">
                        <InputLabel name={t('form.address')} />
                        <AddressInput
                          containerClassName="h-full"
                          disabled={!isCreating}
                          error={errors?.toAdd?.[index]?.addr}
                          fieldName={addrFieldName}
                          register={register}
                          validation={[
                            validateRequired,
                            makeValidateAddress(bech32Prefix),
                            (value) =>
                              toRemove.every((addr) => addr !== value) ||
                              t('error.invalidDuplicateFound'),
                          ]}
                        />
                        <InputErrorMessage
                          error={errors?.toAdd?.[index]?.addr}
                        />
                      </div>
                    </div>
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
            {isCreating && (
              <Button
                className="self-start"
                onClick={() => toAddAppend({ weight: NaN, addr: '' })}
                variant="secondary"
              >
                <Add className="!h-5 !w-5" />
                {t('button.add')}
              </Button>
            )}
          </div>
        </div>
      )}

      {(isCreating || toRemove.length > 0) && (
        <div className="flex flex-col gap-2">
          <InputLabel name={t('form.membersToRemove')} />

          <div
            className={clsx(
              'flex flex-col items-start',
              isCreating ? 'gap-1' : 'gap-2'
            )}
          >
            {isCreating ? (
              currentMembers.loading ? (
                <Loader fill={false} size={24} />
              ) : (
                currentMembers.data.map((addr) => (
                  <Button
                    key={addr}
                    className="!p-3"
                    contentContainerClassName="!gap-2.5"
                    onClick={() =>
                      setValue(
                        (fieldNamePrefix + 'toRemove') as 'toRemove',
                        toRemove.includes(addr)
                          ? toRemove.filter((a) => a !== addr)
                          : [...toRemove, addr]
                      )
                    }
                    variant="secondary"
                  >
                    <Checkbox checked={toRemove.includes(addr)} size="sm" />
                    <EntityDisplay address={addr} noCopy noLink />
                  </Button>
                ))
              )
            ) : (
              toRemove.map((addr) => (
                <EntityDisplay key={addr} address={addr} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
