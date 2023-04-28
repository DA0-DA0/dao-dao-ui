import { useTranslation } from 'react-i18next'

import { SteppedWalkthrough } from '../../SteppedWalkthrough'

export interface DaoCreateSidebarCardProps {
  pageIndex: number
}

export const DaoCreateSidebarCard = ({
  pageIndex,
}: DaoCreateSidebarCardProps) => {
  const { t } = useTranslation()

  return (
    <SteppedWalkthrough
      className="rounded-lg border border-border-primary"
      description={t('info.daoCreationProcessExplanation')}
      stepIndex={pageIndex}
      steps={[
        {
          label: t('info.createStep1'),
        },
        {
          label: t('info.createStep2'),
        },
        {
          label: t('info.createStep3'),
        },
        {
          label: t('info.createStep4'),
        },
      ]}
      textClassName="link-text"
      title={t('title.daoCreationProcess')}
    />
  )
}
