import { Check, Email, Language, WarningRounded } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
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
import { Loader } from '../logo'
import { Tooltip } from '../tooltip'
import { Modal } from './Modal'

const DEFAULT_TYPE = Object.values(InboxApiItemTypeMethod).reduce(
  (acc, cur) => acc | (cur as number),
  0
)

export type InboxSettingsModalProps = Pick<
  ModalProps,
  'visible' | 'onClose'
> & {
  api: InboxApi
  // If defined, shows verify button.
  verify?: () => void
}

export const InboxSettingsModal = ({
  api: { updating, config, loadConfig, updateConfig, resendVerificationEmail },
  verify,
  ...props
}: InboxSettingsModalProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()

  const { register, reset, setValue, getValues, watch } =
    useForm<InboxApiUpdateConfig>()

  const types = watch('types')

  // Prompt to load config if not loaded yet.
  const loadingRef = useRef(false)
  useEffect(() => {
    ;(async () => {
      if (props.visible && !config && !loadingRef.current) {
        loadingRef.current = true
        // Load config. On failure, close modal.
        if (!(await loadConfig())) {
          push('/inbox')
        }
      }
    })()
  }, [props.visible, config, loadConfig, push])

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
          disabled={!config}
          loading={!!config && updating}
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
      {config ? (
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

          {verify && !config.verified && (
            <Button
              center
              className="mt-2"
              loading={updating}
              onClick={verify}
              size="lg"
            >
              {t('button.verify')}
              <Check className="!h-5 !w-5" />
            </Button>
          )}

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
      ) : (
        updating && (
          <Loader className="h-60 w-[100vw] max-w-full" fill size={40} />
        )
      )}
    </Modal>
  )
}
