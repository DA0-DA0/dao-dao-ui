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
  UnicornEmoji,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  AddressInputProps,
  ContractVersion,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { SubDao } from '@dao-dao/types/contracts/DaoCore.v2'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../react'
import { ActionCard } from './ActionCard'

export interface UpgradeV1ToV2Data {
  targetAddress: string
  subDaos: SubDao[]
}

export interface UpgradeV1ToV2ComponentOptions {
  v1SubDaos: string[]
  // Used to render DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps<any>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const UpgradeV1ToV2Component: ActionComponent<
  UpgradeV1ToV2ComponentOptions
> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { v1SubDaos, AddressInput, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { register, control, setValue, watch } =
    useFormContext<UpgradeV1ToV2Data>()
  const { address, context } = useActionOptions()

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

  return (
    <ActionCard
      Icon={UnicornEmoji}
      childrenContainerClassName="!gap-4"
      onRemove={onRemove}
      title={t('title.upgradeToV2')}
    >
      {isCreating && (
        <p className="body-text max-w-prose">
          {t('info.upgradeToV2Explanation')}
        </p>
      )}

      {/* If v1 SubDAOs exist, show them along with the current DAO. If not creating, only show if the target is not the current DAO. */}
      {v1SubDaos.length > 0 && (isCreating || targetAddress !== address) && (
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
                  validation={[validateRequired, validateContractAddress]}
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
    </ActionCard>
  )
}
