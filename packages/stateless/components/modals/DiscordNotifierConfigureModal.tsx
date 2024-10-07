import { ArrowOutwardRounded, DeleteRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DiscordNotifierRegistration, ModalProps } from '@dao-dao/types'

import { useDao } from '../../contexts'
import { Button, ButtonLink } from '../buttons'
import { CopyToClipboard } from '../CopyToClipboard'
import { IconButton, IconButtonLink } from '../icon_buttons'
import { InputErrorMessage, InputLabel, TextInput } from '../inputs'
import { Loader } from '../logo'
import { Modal } from './Modal'

export type DiscordNotifierRegistrationForm = {
  clientId: string
  clientSecret: string
  botToken: string
}

export type DiscordNotifierConfigureModalProps = Pick<
  ModalProps,
  'visible' | 'onClose'
> & {
  setup: (data: DiscordNotifierRegistrationForm) => void
  doRegister: () => void
  registrations: DiscordNotifierRegistration[]
  formDefaults?: DiscordNotifierRegistrationForm
  loadingRegistration: boolean
  finishingRegistration: boolean
  onDelete: (id: string) => Promise<void>
  connected: boolean
  redirectUri: string
  refreshing: boolean
  ConnectWallet: ComponentType
}

export const DiscordNotifierConfigureModal = ({
  setup,
  doRegister,
  registrations,
  formDefaults,
  loadingRegistration,
  finishingRegistration,
  onDelete,
  connected,
  redirectUri,
  refreshing,
  ConnectWallet,
  onClose,
  ...props
}: DiscordNotifierConfigureModalProps) => {
  const { t } = useTranslation()
  const { name: daoName } = useDao()

  const [registering, setRegistering] = useState(false)

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiscordNotifierRegistrationForm>({
    defaultValues: formDefaults,
  })

  const canAddBot = !!(
    watch('clientId') &&
    watch('clientSecret') &&
    watch('botToken')
  )

  return (
    <Modal
      {...props}
      contentContainerClassName="gap-4"
      header={{
        title: t('title.discordNotifier', { daoName }),
        subtitle: t('info.discordNotifierSubtitle'),
      }}
      onClose={() => {
        setRegistering(false)
        onClose?.()
      }}
    >
      {connected ? (
        registering ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(setup)}>
            <p className="secondary-text">
              {t('info.discordNotifierSetupExplanation')}
            </p>

            <div className="flex flex-col gap-2 items-start">
              <InputLabel
                name={'1. ' + t('title.createDiscordApplication')}
                title
              />
              <ButtonLink
                href="https://discord.com/developers/applications"
                size="lg"
                variant={canAddBot ? 'secondary' : 'primary'}
              >
                {t('button.goToDiscordDeveloperPortal')}
                <ArrowOutwardRounded
                  className={clsx(
                    canAddBot
                      ? '!text-icon-button-secondary'
                      : '!text-icon-button-primary'
                  )}
                />
              </ButtonLink>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <InputLabel name={'2. ' + t('title.addRedirect')} title />

              <p>{t('info.addDiscordNotifierRedirectInstructions')}</p>

              <CopyToClipboard
                className="w-full rounded-md bg-background-secondary py-1 px-2 font-mono transition hover:bg-background-button-secondary-default"
                takeAll
                textClassName="!bg-transparent"
                tooltip={t('button.copyToClipboard')}
                value={redirectUri}
              />
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel name={'3. ' + t('title.copyAppDetails')} title />
              <div className="p-3 bg-background-tertiary rounded-md flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <InputLabel
                    // eslint-disable-next-line i18next/no-literal-string
                    name="OAuth2 > CLIENT ID"
                    tooltip={t('form.oAuth2ClientIdTooltip')}
                  />
                  <TextInput
                    fieldName="clientId"
                    register={register}
                    required
                  />
                  <InputErrorMessage error={errors?.clientId} />
                </div>

                <div className="flex flex-col gap-1">
                  <InputLabel
                    // eslint-disable-next-line i18next/no-literal-string
                    name="OAuth2 > CLIENT SECRET"
                    tooltip={t('form.oAuth2ClientSecretTooltip')}
                  />
                  <TextInput
                    fieldName="clientSecret"
                    register={register}
                    required
                  />
                  <InputErrorMessage error={errors?.clientSecret} />
                </div>

                <div className="flex flex-col gap-1">
                  <InputLabel
                    // eslint-disable-next-line i18next/no-literal-string
                    name="Bot > TOKEN"
                    tooltip={t('form.botTokenTooltip')}
                  />
                  <TextInput
                    fieldName="botToken"
                    register={register}
                    required
                  />
                  <InputErrorMessage error={errors?.botToken} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <InputLabel name={'4. ' + t('title.addBotToServer')} title />
              <Button
                center
                disabled={!canAddBot}
                size="lg"
                type="submit"
                variant="primary"
              >
                {t('button.goToDiscordBotRegistration')}
                <ArrowOutwardRounded className="!text-icon-button-primary" />
              </Button>
            </div>
          </form>
        ) : finishingRegistration ? (
          <>
            <p className="secondary-text mb-1">
              {t('info.discordNotifierFinishSetupExplanation')}
            </p>

            <div className="flex flex-col gap-2">
              <InputLabel name={'5. ' + t('title.finishSetup')} title />
              <Button
                center
                loading={loadingRegistration}
                onClick={doRegister}
                size="lg"
                variant="primary"
              >
                {t('button.registerDiscordBotWithDaoDao')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="secondary-text">
              {t('info.discordNotifierBeginSetupExplanation')}
            </p>

            <Button
              center
              onClick={() => setRegistering(true)}
              size="lg"
              variant="primary"
            >
              {t('button.setUpNewNotifier')}
            </Button>
          </>
        )
      ) : (
        <ConnectWallet />
      )}

      {!registering &&
        !finishingRegistration &&
        (registrations.length > 0 || refreshing) && (
          <>
            <div className="mt-2 space-y-1">
              <p className="primary-text">{t('title.yourNotifiers')}</p>
              <p className="caption-text mb-2">
                {t('info.otherNotifiersNotShown')}
              </p>
            </div>

            <div className="space-y-3">
              {registrations.map(({ id, guild, channel }) => (
                <div
                  key={id}
                  className="flex flex-row items-center justify-between gap-3 pl-2"
                >
                  {!!guild.iconHash && (
                    <div
                      className="h-7 w-7 shrink-0 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://cdn.discordapp.com/icons/${guild.id}/${guild.iconHash}.png?size=128)`,
                      }}
                    ></div>
                  )}

                  <p className="secondary-text grow text-base">
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    {guild.name} • #{channel.name}
                  </p>

                  <div className="flex shrink-0 flex-row items-stretch gap-1">
                    <IconButtonLink
                      Icon={ArrowOutwardRounded}
                      href={`https://discord.com/channels/${guild.id}/${channel.id}`}
                      variant="ghost"
                    />
                    <IconButton
                      Icon={DeleteRounded}
                      disabled={loadingRegistration}
                      iconClassName="text-icon-interactive-error"
                      onClick={() => onDelete(id)}
                      variant="ghost"
                    />
                  </div>
                </div>
              ))}
            </div>

            {refreshing && <Loader size={32} />}
          </>
        )}
    </Modal>
  )
}
