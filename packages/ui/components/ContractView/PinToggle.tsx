import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '../../theme'

export interface PinToggleProps {
  pinned: boolean
  onPin: () => void
}

export const PinToggle = ({ pinned, onPin }: PinToggleProps) => {
  const { t } = useTranslation()
  const { accentColor } = useThemeContext()

  return (
    <button
      className="flex flex-row items-center text-left text-brand link-text"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <BookmarkIconSolid
          className="inline mr-1 w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <BookmarkIconOutline className="inline mr-1 w-[20px]" />
      )}
      <span className="hidden md:block">
        {pinned ? t('info.pinned') : t('info.pin')}
      </span>
    </button>
  )
}
