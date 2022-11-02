import { AnalyticsOutlined, CopyAllOutlined } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'

export type ProposalInnerContentDisplayProps = {
  duplicate: () => void
  actionsDisplay: ReactNode
  showRaw: boolean
  setShowRaw: (showRaw: boolean) => void
}

export const ProposalInnerContentDisplay = ({
  duplicate,
  actionsDisplay,
  showRaw,
  setShowRaw,
}: ProposalInnerContentDisplayProps) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      {actionsDisplay}
      <div className="flex flex-row items-center gap-7">
        <Button onClick={() => setShowRaw(!showRaw)} variant="ghost">
          <AnalyticsOutlined className="text-icon-secondary" />
          <p className="secondary-text">
            {showRaw ? t('button.hideRawData') : t('button.showRawData')}
          </p>
        </Button>

        <Button onClick={duplicate} variant="ghost">
          <CopyAllOutlined className="text-icon-secondary" />
          <p className="secondary-text">{t('button.duplicate')}</p>
        </Button>
      </div>
    </div>
  )
}
