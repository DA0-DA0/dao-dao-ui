import { ArrowOutwardRounded, DeleteRounded } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { DiscordNotifierRegistration } from '@dao-dao/state/recoil'
import { ModalProps } from '@dao-dao/types'

import { useDaoInfo } from '../../hooks'
import { Button } from '../buttons'
import { IconButton, IconButtonLink } from '../icon_buttons'
import { DiscordIcon } from '../icons'
import { Modal } from './Modal'

export type DiscordNotifierConfigureModalProps = Pick<
  ModalProps,
  'visible' | 'onClose'
> & {
  setup: () => void
  registrations: DiscordNotifierRegistration[]
  loading: boolean
  onDelete: (id: string) => Promise<void>
  connected: boolean
  ConnectWallet: ComponentType
}

export const DiscordNotifierConfigureModal = ({
  setup,
  registrations,
  loading,
  onDelete,
  connected,
  ConnectWallet,
  ...props
}: DiscordNotifierConfigureModalProps) => {
  const { t } = useTranslation()
  const { name: daoName } = useDaoInfo()

  return (
    <Modal
      {...props}
      contentContainerClassName="gap-4"
      header={{
        title: t('title.discordNotifier', { daoName }),
      }}
    >
      <p className="secondary-text">{t('info.discordNotifierExplanation')}</p>

      {connected ? (
        <Button
          center
          loading={loading}
          onClick={setup}
          size="lg"
          variant="secondary"
        >
          <DiscordIcon className="!h-5 !w-5" />
          <p>{t('button.setUpDiscordNotifier')}</p>
        </Button>
      ) : (
        <ConnectWallet />
      )}

      {registrations.length > 0 && (
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
                    disabled={loading}
                    iconClassName="text-icon-interactive-error"
                    onClick={() => onDelete(id)}
                    variant="ghost"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  )
}
