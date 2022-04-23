import { ComponentType, FunctionComponent, SVGProps, useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Profile, Airdrop, Pie, Governance, Hash } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import { WalletConnect } from '@dao-dao/ui'
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  SITE_TITLE,
} from '@dao-dao/utils'
import clsx from 'clsx'

import { Logo } from '@/components'

interface NavItemData {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  href: string
}

interface NavItemProps {
  item: NavItemData
  path: string
}

const NavItem: FunctionComponent<NavItemProps> = ({
  item: { Icon, label, href },
  path,
}) => {
  const isActive = path === href

  return (
    <Link key={href} href={href}>
      <a
        className={clsx('flex flex-row gap-2 items-center p-3 rounded-lg', {
          'text-accent bg-dark-accent': isActive,
          'text-body hover:bg-card': !isActive,
        })}
      >
        {Icon && (
          <Icon
            color={isActive ? 'rgb(var(--accent))' : 'rgba(var(--dark), 0.95)'}
            height={14}
            width={14}
          />
        )}
        <p className="hidden lg:block">{label}</p>
      </a>
    </Link>
  )
}

export const Header: FunctionComponent = () => {
  const router = useRouter()
  const { connect, connected, address, name, nativeBalance } = useWallet()

  const walletBalance =
    nativeBalance !== undefined
      ? convertMicroDenomToDenomWithDecimals(nativeBalance, NATIVE_DECIMALS)
      : 0
  const humanDenom =
    convertDenomToHumanReadableDenom(NATIVE_DENOM).toUpperCase()

  const navItems = useMemo<NavItemData[]>(
    () => [
      {
        Icon: Airdrop,
        label: 'Airdrop',
        href: '/airdrop',
      },
      {
        Icon: Pie,
        label: 'Tokenomics',
        href: '/',
      },
      {
        Icon: Governance,
        label: 'Governance',
        href: '/governance',
      },
      ...(/^\/proposal\/\d+$/.test(router.asPath)
        ? [
            {
              Icon: Hash,
              label: router.query.proposalId as string,
              href: router.asPath,
            },
          ]
        : []),
    ],
    [router.asPath, router.query]
  )

  return (
    <header className="grid grid-cols-3 items-center py-4 px-6">
      <div className="flex flex-row gap-2 items-center w-full md:gap-4">
        <Logo height={40} width={40} />
        <p className="hidden text-xl md:block">{SITE_TITLE}</p>
      </div>

      <div className="flex flex-row gap-2 justify-self-center items-center">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} path={router.asPath} />
        ))}
      </div>

      <div
        className={clsx('h-10', {
          'w-full': connected,
          'justify-self-end': !connected,
        })}
      >
        {connected ? (
          <div className="flex flex-row flex-1 gap-3 justify-end items-center h-full">
            <div className="flex flex-col items-end text-right link-text">
              <span>{name}</span>
              <span className="text-secondary capitalize">
                {walletBalance} {humanDenom}
              </span>
            </div>

            <Profile height={40} width={40} />
          </div>
        ) : (
          <WalletConnect
            handleConnect={connect}
            walletAddress={address ?? ''}
            walletBalance={walletBalance}
            walletBalanceDenom={humanDenom}
            walletName={name}
          />
        )}
      </div>
    </header>
  )
}
