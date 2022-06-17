import { HeartIcon as HeartOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/solid'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'

import { useThemeContext } from '../../theme'

export interface HeartButtonProps {
  pinned: boolean
  onPin: () => void
}

export const HeartButton: FC<HeartButtonProps> = ({ pinned, onPin }) => {
  const { accentColor } = useThemeContext()

  return (
    <button
      className="flex flex-row items-center text-left text-brand link-text"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <HeartSolid
          className="inline mr-1 w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <HeartOutline className="inline mr-1 w-[20px]" />
      )}
      <span className="hidden md:block">
        {pinned ? i18n.t('Favorited') : i18n.t('Favorite')}
      </span>
    </button>
  )
}
