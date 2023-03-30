import { Check } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  BeeEmoji,
  Button,
  GridCardContainer,
  OptionCard,
  SuitAndTieEmoji,
  XEmoji,
} from '@dao-dao/stateless'
import { ActionComponent, DaoPayrollConfig } from '@dao-dao/types'

export type ManagePayrollData = Partial<DaoPayrollConfig>

export interface ManagePayrollOptions {
  instantiating: boolean
  instantiateVestingFactory: () => Promise<void>
}

export const ManagePayrollComponent: ActionComponent<
  ManagePayrollOptions,
  ManagePayrollData
> = ({
  fieldNamePrefix,
  isCreating,
  options: { instantiating, instantiateVestingFactory },
}) => {
  const { t } = useTranslation()

  const { setValue, watch } = useFormContext<ManagePayrollData>()
  const watchType = watch((fieldNamePrefix + 'type') as 'type')
  const data = watch((fieldNamePrefix + 'data') as 'data')

  const selectedOption = options.find((option) => option.type === watchType)

  const vestingFactoryCreated =
    watchType === 'vesting' && !!data && 'factory' in data && !!data.factory

  return (
    <>
      {isCreating ? (
        <GridCardContainer cardType="tall">
          {options.map(
            ({ type, nameI18nKey, descriptionI18nKey, readMoreUrl, Icon }) => (
              <OptionCard
                key={type}
                Icon={Icon}
                description={descriptionI18nKey && t(descriptionI18nKey)}
                name={t(nameI18nKey)}
                onSelect={() => {
                  setValue(`${fieldNamePrefix}.type` as 'type', type)
                }}
                readMoreUrl={readMoreUrl}
                selected={watchType === type}
              />
            )
          )}
        </GridCardContainer>
      ) : selectedOption ? (
        <OptionCard
          Icon={selectedOption.Icon}
          description={
            selectedOption.descriptionI18nKey &&
            t(selectedOption.descriptionI18nKey)
          }
          name={t(selectedOption.nameI18nKey)}
          readMoreUrl={selectedOption.readMoreUrl}
          readOnly
        />
      ) : null}

      {/* If vesting, show factory contract instantiation form */}
      {watchType === 'vesting' && isCreating && (
        <div className="mt-6 flex flex-row items-center justify-between gap-x-8 gap-y-2 border-y border-border-secondary py-6">
          <div className="flex flex-col gap-2">
            <p className="body-text break-words">
              {vestingFactoryCreated
                ? t('info.createdVestingContractManager')
                : t('info.createVestingContractManager')}
            </p>
          </div>

          {vestingFactoryCreated ? (
            <Check className="!h-6 !w-6" />
          ) : (
            <Button
              loading={instantiating}
              onClick={instantiateVestingFactory}
              size="lg"
              variant="primary"
            >
              {t('button.create')}
            </Button>
          )}
        </div>
      )}
    </>
  )
}

const options: {
  type: 'retroactive' | 'vesting' | undefined
  nameI18nKey: string
  descriptionI18nKey?: string
  readMoreUrl?: string
  Icon: () => JSX.Element
}[] = [
  {
    type: undefined,
    nameI18nKey: 'info.none',
    descriptionI18nKey: 'info.noPayrollDescription',
    Icon: XEmoji,
  },
  {
    type: 'retroactive',
    nameI18nKey: 'title.retroactive',
    descriptionI18nKey: 'info.retroactivePaymentsDescription',
    readMoreUrl:
      'https://docs.google.com/document/d/e/2PACX-1vT5QQRZTQGUQt1Ikcfiil50xU-VT2tNOnfYapQ6-J1D8KhfmX88B28sqyaLrE-JCV-j-P52ZCUTowZi/pub',
    Icon: BeeEmoji,
  },
  {
    type: 'vesting',
    nameI18nKey: 'title.vesting',
    descriptionI18nKey: 'info.vestingPaymentsDescription',
    readMoreUrl: '',
    Icon: SuitAndTieEmoji,
  },
]
