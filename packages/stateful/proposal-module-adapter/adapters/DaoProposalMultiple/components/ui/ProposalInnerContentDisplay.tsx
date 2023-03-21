import { CopyAllOutlined } from '@mui/icons-material'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'

export type ProposalInnerContentDisplayProps = {
  duplicate: () => void
  duplicateLoading: boolean
  innerContentDisplay: ReactNode
}

export const ProposalInnerContentDisplay = ({
  duplicate,
  duplicateLoading,
  innerContentDisplay,
}: ProposalInnerContentDisplayProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3">
      {innerContentDisplay}

      <Button
        className="self-end"
        loading={duplicateLoading}
        onClick={duplicate}
        variant="ghost"
      >
        <CopyAllOutlined className="text-icon-secondary" />
        <p className="secondary-text">{t('button.duplicate')}</p>
      </Button>
    </div>
  )
}
