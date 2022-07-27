import { useTranslation } from 'react-i18next'

import { PinOutline, PinSolid } from '@dao-dao/icons'

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
        <PinSolid
          className="inline mr-1 w-4 h-4 text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <PinOutline className="inline mr-1 w-4 h-4" />
      )}
      <span className="hidden md:block">
        {pinned ? t('info.pinned') : t('info.pin')}
      </span>
    </button>
  )
}
