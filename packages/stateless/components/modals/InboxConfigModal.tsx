import { Check, Email, Language, WarningRounded } from '@mui/icons-material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  InboxApi,
  InboxApiItemType,
  InboxApiItemTypeMethod,
  InboxApiUpdateConfig,
  ModalProps,
} from '@dao-dao/types'
import { validateEmail } from '@dao-dao/utils'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import { Checkbox, InputLabel, TextInput } from '../inputs'
import { Tooltip } from '../tooltip'
import { Modal } from './Modal'

const DEFAULT_TYPE = Object.values(InboxApiItemTypeMethod).reduce(
  (acc, cur) => acc | (cur as number),
  0
)

export type InboxConfigModalProps = Pick<ModalProps, 'visible' | 'onClose'> & {
  api: InboxApi
}

export const InboxConfigModal = ({
  api: { updating, config, updateConfig, resendVerificationEmail },
  ...props
}: InboxConfigModalProps) => {
  const { t } = useTranslation()

  const { register, reset, setValue, getValues, watch } =
    useForm<InboxApiUpdateConfig>()

  const types = watch('types')

  // Once config is loaded, populate form with config values.
  useEffect(() => {
    if (config) {
      reset({
        email: config.email,
        types: config.types,
      })
    }
  }, [config, reset])

  return (
    <Modal
      {...props}
      contentContainerClassName="gap-2"
      footerContainerClassName="flex flex-row justify-end"
      footerContent={
        <Button
          loading={updating}
          onClick={async () => {
            if (!config) {
              return
            }

            const data = getValues()
            const success = await updateConfig({
              // Only save email if changed so it doesn't reverify each time.
              email: data.email !== config.email ? data.email : undefined,
              types: data.types,
            })

            if (success) {
              toast.success(t('success.saved'))
            }
          }}
        >
          {t('button.save')}
        </Button>
      }
      header={{
        title: t('title.inboxConfiguration'),
      }}
      titleClassName="mb-2"
    >
      {config && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <InputLabel
                name={t('title.email')}
                tooltip={t('info.inboxEmailTooltip')}
              />

              {config.verified ? (
                <Tooltip title={t('title.verified')}>
                  <Check className="!h-6 !w-6 text-icon-interactive-valid" />
                </Tooltip>
              ) : config.email ? (
                <Tooltip title={t('info.verificationPendingResend')}>
                  <IconButton
                    Icon={WarningRounded}
                    className="text-icon-interactive-warning"
                    onClick={async () => {
                      await resendVerificationEmail()
                      toast.success(t('info.emailVerificationResent'))
                    }}
                    variant="ghost"
                  />
                </Tooltip>
              ) : null}
            </div>

            <TextInput
              className="grow"
              fieldName="email"
              placeholder="Email..."
              register={register}
              type="email"
              validation={[validateEmail]}
            />
          </div>

          <p className="title-text mt-4">{t('title.preferences')}</p>
          <p className="caption-text">
            {t('info.inboxConfigPreferencesDescription')}
          </p>
          {Object.values(InboxApiItemType).map((type) => (
            <div
              key={type}
              className="flex flex-row items-start gap-4 rounded-md bg-background-secondary p-3"
            >
              <div className="flex flex-col gap-2">
                <p className="primary-text">
                  {t(`inboxItemType.${type}.title`)}
                </p>

                <p className="caption-text">
                  {t(`inboxItemType.${type}.description`)}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <Tooltip title={t('title.website')}>
                    <Language className="!h-6 !w-6" />
                  </Tooltip>

                  <Checkbox
                    checked={
                      ((types?.[type] ?? DEFAULT_TYPE) &
                        InboxApiItemTypeMethod.Website) ===
                      InboxApiItemTypeMethod.Website
                    }
                    onClick={() =>
                      setValue(
                        `types.${type}`,
                        (types?.[type] ?? DEFAULT_TYPE) ^
                          InboxApiItemTypeMethod.Website
                      )
                    }
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <Tooltip title={t('title.email')}>
                    <Email className="!h-6 !w-6" />
                  </Tooltip>

                  <Checkbox
                    checked={
                      ((types?.[type] ?? DEFAULT_TYPE) &
                        InboxApiItemTypeMethod.Email) ===
                      InboxApiItemTypeMethod.Email
                    }
                    onClick={() =>
                      setValue(
                        `types.${type}`,
                        (types?.[type] ?? DEFAULT_TYPE) ^
                          InboxApiItemTypeMethod.Email
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </Modal>
  )
}
