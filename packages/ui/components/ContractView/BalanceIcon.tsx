import { useThemeContext } from '../../theme'

export interface BalanceIconProps {
  iconURI?: string
}

export const BalanceIcon = ({ iconURI }: BalanceIconProps) => {
  const { accentColor } = useThemeContext()

  return (
    <div
      className="w-4 h-4 bg-brand bg-center bg-cover rounded-full"
      style={{
        ...(!!accentColor && { backgroundColor: accentColor }),
        backgroundImage: iconURI ? `url(${iconURI})` : '',
      }}
    ></div>
  )
}

export const UnknownAssetBalanceIcon = () => (
  <div className="flex justify-center items-center w-4 h-4 text-black bg-disabled rounded-full">
    ?
  </div>
)
