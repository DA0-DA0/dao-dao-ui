import { useThemeContext } from '../../theme'

export interface BalanceIconProps {
  iconURI?: string
}

export const BalanceIcon = ({ iconURI }: BalanceIconProps) => {
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

export const UnknownAssetBalanceIcon = () => (
  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-disabled text-black">
    ?
  </div>
)
