import { useTranslation } from 'react-i18next'

import { DiscordIcon } from '@dao-dao/stateless'

import { Trans } from '../../../components'

export const Placeholder = () => {
  const { t } = useTranslation()

  return (
    <div className="grow space-y-2 rounded-lg border border-border-primary p-5 text-base text-text-tertiary">
      <p>{t('info.votingModuleNotYetSupported')}</p>

      <p>
        <Trans i18nKey="info.votingModuleAdapterCreationDiscord">
          Want to help us support this voting module? Join the{' '}
          <a
            className="inline-flex flex-row items-center gap-1 text-text-secondary transition hover:opacity-70"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            DAO DAO Discord
            <DiscordIcon />
          </a>{' '}
          and post in #dao-help.
        </Trans>
      </p>
    </div>
  )
}
