import { StarIcon as StarOutline } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'
import { FC } from 'react'

import { useThemeContext } from '../../theme'

export interface StarButtonProps {
  pinned: boolean
  onPin: () => void
}

export const StarButton: FC<StarButtonProps> = ({ pinned, onPin }) => {
  const { accentColor } = useThemeContext()

  return (
    <button
      className="flex flex-row items-center text-left text-brand link-text"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <StarSolid
          className="inline mr-1 w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <StarOutline className="inline mr-1 w-[20px]" />
      )}
      <span className="inline hidden md:block">
        {pinned ? 'Starred' : 'Star'}
      </span>
    </button>
  )
}
