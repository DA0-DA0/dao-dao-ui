import { useTranslation } from 'react-i18next'

import { Trans } from '@dao-dao/common'
import { Discord } from '@dao-dao/icons'

export const MembershipPlaceholder = () => {
  const { t } = useTranslation()

  return (
    <div className="grow p-5 space-y-2 text-base rounded-lg border text-tertiary border-default">
      <p>{t('info.votingModuleNotYetSupported')}</p>

      <p>
        <Trans i18nKey="info.votingModuleAdapterCreationDiscord">
          Want to help us support this voting module? Join the{' '}
          <a
            className="inline-flex flex-row gap-1 items-center hover:opacity-70 transition text-secondary"
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
