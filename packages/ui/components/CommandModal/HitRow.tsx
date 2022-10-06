import clsx from 'clsx'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Hit, HitType } from '@dao-dao/tstypes/ui/CommandModal'

import { Loader } from '../Loader'

export interface HitRowProps {
  hit: Hit
  selected: boolean
  onClick: () => void
  loading: boolean
}

export const HitRow = forwardRef<HTMLDivElement, HitRowProps>(function HitRow(
  { hit, selected, onClick, loading },
  ref
) {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'group flex flex-row gap-2 items-center p-3 bg-transparent hover:bg-background-interactive-hover rounded-md transition cursor-pointer',
        selected && 'bg-background-interactive-hover'
      )}
      onClick={onClick}
      ref={ref}
    >
      {hit.hitType === HitType.Daos ? (
        <div
          aria-label={t('info.daosLogo')}
          className="w-[24px] h-[24px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${hit.imageUrl})`,
          }}
        ></div>
      ) : (
        <div className="flex justify-center items-center w-[24px] h-[24px] text-lg">
          {hit.icon}
        </div>
      )}

      <p className="font-medium body-text">{hit.name}</p>

      {loading && (
        <div className="flex flex-row grow justify-end items-center">
          <Loader fill={false} size={20} />
        </div>
      )}
    </div>
  )
})
