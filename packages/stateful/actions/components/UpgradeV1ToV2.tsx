import { Add, Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  UnicornEmoji,
} from '@dao-dao/stateless'
import { ActionComponent, AddressInputProps } from '@dao-dao/types'
import { SubDao } from '@dao-dao/types/contracts/DaoCore.v2'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

export interface UpgradeV1ToV2Data {
  subDaos: SubDao[]
}

export interface UpgradeV1ToV2ComponentOptions {
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps<any>>
}

export const UpgradeV1ToV2Component: ActionComponent<
  UpgradeV1ToV2ComponentOptions
> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { AddressInput },
}) => {
  const { t } = useTranslation()
  const { register, control } = useFormContext<UpgradeV1ToV2Data>()

  const {
    fields: subDaoFields,
    append: subDaoAppend,
    remove: subDaoRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'subDaos') as 'subDaos',
  })

  return (
    <ActionCard
      Icon={UnicornEmoji}
      childrenContainerClassName="!gap-2"
      onRemove={onRemove}
      title={t('title.upgradeToV2')}
    >
      <p className="body-text mb-4 max-w-prose">
        {t('info.upgradeToV2Explanation')}
      </p>

      <InputLabel name={t('form.subDaosToRecognize')} />

      <div className="flex flex-col gap-2">
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
    </ActionCard>
  )
}
