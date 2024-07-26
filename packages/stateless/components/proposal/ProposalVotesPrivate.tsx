import { Lock } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export type ProposalVotesPrivateProps = {
  className?: string
}

export const ProposalVotesPrivate = ({
  className,
}: ProposalVotesPrivateProps) => {
  const { t } = useTranslation()

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <p className="primary-text">{t('title.votesCast')}</p>

      <div className="flex flex-row gap-1.5 items-center">
        <Lock className="!h-5 !w-5 !text-icon-secondary" />
        <p className="body-text text-text-secondary">
          {t('info.votesPrivateOnSecretNetwork')}
        </p>
      </div>
    </div>
  )
}
