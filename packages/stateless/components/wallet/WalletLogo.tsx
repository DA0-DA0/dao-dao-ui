import { Wallet } from '@cosmos-kit/core'
import clsx from 'clsx'

export type WalletLogoProps = {
  logo: Wallet['logo']
  className?: string
  size?: 'sm' | 'lg'
  dropShadow?: boolean
}

export const WalletLogo = ({
  logo,
  className,
  size = 'lg',
  dropShadow = false,
}: WalletLogoProps) =>
  typeof logo === 'string' ? (
    <div
      className={clsx(
        'bg-contain bg-center bg-no-repeat',
        {
          'h-6 w-6': size === 'sm',
          'h-10 w-10': size === 'lg',
        },
        className
      )}
      style={{
        backgroundImage: `url(${logo})`,
        filter: dropShadow
          ? 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 1))'
          : undefined,
      }}
    />
  ) : logo && 'major' in logo ? (
    <div
      className={clsx(
        'relative bg-contain bg-center bg-no-repeat',
        {
          'h-6 w-6': size === 'sm',
          'h-10 w-10': size === 'lg',
        },
        className
      )}
      style={{
        backgroundImage: `url(${logo.major})`,
        filter: dropShadow
          ? 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 1))'
          : undefined,
      }}
    >
      <div
        className={clsx('absolute bg-contain bg-center bg-no-repeat', {
          '-right-0.5 -bottom-0.5 h-2.5 w-2.5': size === 'sm',
          '-right-1 -bottom-1 h-4 w-4': size === 'lg',
        })}
        style={{
          backgroundImage: `url(${logo.minor})`,
        }}
      />
    </div>
  ) : null
