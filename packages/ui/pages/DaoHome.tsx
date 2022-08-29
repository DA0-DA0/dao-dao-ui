import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { formatDate } from '@dao-dao/utils'

import {
  Breadcrumbs,
  DaoImage,
  GradientHero,
  MarkdownPreview,
  PinToggle,
} from '../components'

export interface DaoHomeProps {
  pinned: boolean
  onPin: () => void
}

export const DaoHome = ({ pinned, onPin }: DaoHomeProps) => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContext()

  return (
    <div className="flex flex-col items-stretch mx-auto max-w-[1152px]">
      <GradientHero childContainerClassName="p-6 pt-0">
        <div className="flex flex-row gap-6 justify-between items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }]}
            current={daoInfo.name}
          />

          <PinToggle onPin={onPin} pinned={pinned} />
        </div>

        <div className="flex flex-col items-center py-10">
          <DaoImage imageUrl={daoInfo.imageUrl} size="lg" />

          <p className="mt-6 text-center hero-text">{daoInfo.name}</p>
          {daoInfo.created && (
            <p className="mt-2 text-text-tertiary primary-text">
              {t('info.establishedAbbr')} {formatDate(daoInfo.created)}
            </p>
          )}

          <MarkdownPreview
            className="mt-3 whitespace-pre-wrap body-text"
            markdown={daoInfo.description}
          />
        </div>
      </GradientHero>
    </div>
  )
}
