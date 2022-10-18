import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'
import { Discord } from '@dao-dao/icons'

export const Placeholder = () => {
  const { t } = useTranslation()

  return (
    <div className="text-tertiary border-default grow space-y-2 rounded-lg border p-5 text-base">
      <p>{t('info.votingModuleNotYetSupported')}</p>

      <p>
        <Trans i18nKey="info.votingModuleAdapterCreationDiscord">
          Want to help us support this voting module? Join the{' '}
          <a
            className="text-secondary inline-flex flex-row items-center gap-1 transition hover:opacity-70"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            DAO DAO Discord
            <Discord className="inline" />
          </a>{' '}
          and post in #dao-help.
        </Trans>
      </p>
    </div>
  )
}
