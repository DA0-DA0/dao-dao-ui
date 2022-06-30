import { HeartIcon as HeartOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/solid'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'

import { useThemeContext } from '../../theme'

export interface HeartButtonProps {
  pinned: boolean
  onPin: () => void
}

export const HeartButton: FC<HeartButtonProps> = ({ pinned, onPin }) => {
  const { t } = useTranslation()
  const { accentColor } = useThemeContext()

  return (
    <button
      className="link-text flex flex-row items-center text-left text-brand"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <HeartSolid
          className="mr-1 inline w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <HeartOutline className="mr-1 inline w-[20px]" />
      )}
      <span className="hidden md:block">
        {pinned ? t('info.favorited') : t('info.favorite')}
      </span>
    </button>
  )
}
