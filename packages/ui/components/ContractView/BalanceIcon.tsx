import { FC } from 'react'

import { useThemeContext } from '../../theme'

export interface BalanceIconProps {
  iconURI?: string
}

export const BalanceIcon: FC<BalanceIconProps> = ({ iconURI }) => {
  const { accentColor } = useThemeContext()

  return (
    <div
      className="h-4 w-4 rounded-full bg-brand bg-cover bg-center"
      style={{
        ...(!!accentColor && { backgroundColor: accentColor }),
        backgroundImage: iconURI ? `url(${iconURI})` : '',
      }}
    ></div>
  )
}
