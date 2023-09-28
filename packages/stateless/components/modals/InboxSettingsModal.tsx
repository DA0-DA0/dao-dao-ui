import {
  Check,
  Email,
  Language,
  Smartphone,
  WarningRounded,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  InboxApi,
  InboxApiItemType,
  InboxApiItemTypeMethod,
  InboxApiItemTypeMethodData,
  InboxApiUpdateConfig,
  ModalProps,
} from '@dao-dao/types'
import { validateEmail } from '@dao-dao/utils'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import { Checkbox, InputLabel, Switch, TextInput } from '../inputs'
import { Loader } from '../logo'
import { Tooltip } from '../tooltip'
import { Modal } from './Modal'

const DEFAULT_TYPE = Object.values(InboxApiItemTypeMethod).reduce(
  (acc, cur) => acc | (cur as number),
  0
)

const TYPE_METHODS: InboxApiItemTypeMethodData[] = [
  {
    method: InboxApiItemTypeMethod.Website,
    i18nKey: 'title.website',
    Icon: Language,
  },
  {
    method: InboxApiItemTypeMethod.Email,
    i18nKey: 'title.email',
    Icon: Email,
  },
  {
    method: InboxApiItemTypeMethod.Push,
    i18nKey: 'title.push',
    Icon: Smartphone,
  },
]

export type InboxSettingsModalProps = Pick<
  ModalProps,
  'visible' | 'onClose'
> & {
  api: InboxApi
  // If defined, shows verify button.
  verify?: () => void
}

export const InboxSettingsModal = ({
  api: {
    updating,
    config,
    loadConfig,
    updateConfig,
    resendVerificationEmail,
    push,
  },
  verify,
  ...props
}: InboxSettingsModalProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { register, reset, setValue, getValues, watch } =
    useForm<InboxApiUpdateConfig>()

  const types = watch('types')

  // Prompt to load config if not loaded yet.
  const loadingRef = useRef(false)
  const routerPush = router.push
  // Memoize so we only load config once.
  const loadConfigRef = useRef(loadConfig)
  loadConfigRef.current = loadConfig

  useEffect(() => {
    ;(async () => {
      if (props.visible && !config && !loadingRef.current) {
        loadingRef.current = true
        try {
          // Load config. On failure, close modal.
          if (!(await loadConfigRef.current())) {
            routerPush('/inbox')
            toast.error(t('error.loadingData'))
          }
        } finally {
          loadingRef.current = false
        }
      }
    })()
  }, [props.visible, config, routerPush, t])

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
      contentContainerClassName="gap-3"
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
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <InputLabel
              name={t('title.pushNotifications')}
              tooltip={t('info.pushNotificationsTooltip')}
            />

            {(!push.ready || push.supported) && (
              <div className="flex flex-row items-center justify-end gap-2">
                <Switch
                  enabled={push.subscribed}
                  loading={!push.ready || !push.supported || push.updating}
                  onClick={push.subscribed ? push.unsubscribe : push.subscribe}
                  sizing="md"
                />
              </div>
            )}
          </div>

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

          {push.ready && !push.supported && (
            <p className="caption-text -mt-2 italic text-text-interactive-warning-body">
              {t('error.browserNotSupported')}
            </p>
          )}

          {verify && !config.verified && (
            <Button
              center
              className="mt-1"
              loading={updating}
              onClick={verify}
              size="lg"
            >
              {t('button.verify')}
              <Check className="!h-5 !w-5" />
            </Button>
          )}

          <p className="title-text mt-3">{t('title.preferences')}</p>
          <p className="caption-text -mt-2">
            {t('info.inboxConfigPreferencesDescription')}
          </p>
          <div className="-mt-1 flex flex-col gap-1">
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
                  {TYPE_METHODS.filter(
                    ({ method }) =>
                      // If defined, only the listed methods are allowed for the
                      // given type. Otherwise, all methods are allowed.
                      !TYPE_ALLOWED_METHODS[type] ||
                      TYPE_ALLOWED_METHODS[type]!.includes(method)
                  ).map(({ method, i18nKey, Icon }) => (
                    <div key={method} className="flex flex-row gap-2">
                      <Tooltip title={t(i18nKey)}>
                        <Icon className="!h-6 !w-6" />
                      </Tooltip>

                      <Checkbox
                        checked={
                          ((types?.[type] ?? DEFAULT_TYPE) & method) === method
                        }
                        onClick={() =>
                          setValue(
                            `types.${type}`,
                            (types?.[type] ?? DEFAULT_TYPE) ^ method
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        updating && (
          <Loader className="h-60 w-[100vw] max-w-full" fill size={40} />
        )
      )}
    </Modal>
  )
}

// If defined, only the listed methods are allowed for the given type.
// Otherwise, all methods are allowed.
const TYPE_ALLOWED_METHODS: Partial<
  Record<InboxApiItemType, InboxApiItemTypeMethod[]>
> = {
  [InboxApiItemType.ProposalCreated]: [
    InboxApiItemTypeMethod.Email,
    InboxApiItemTypeMethod.Push,
  ],
}
