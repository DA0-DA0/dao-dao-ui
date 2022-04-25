import { FunctionComponent, ReactNode, useMemo } from 'react'

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
import { PlusIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

import { Logo } from '@/components'

interface NavItemData {
  renderIcon: (color: string) => ReactNode
  label: string
  href: string
}

interface NavItemProps {
  item: NavItemData
  path: string
}

const NavItem: FunctionComponent<NavItemProps> = ({
  item: { renderIcon, label, href },
  path,
}) => {
  const isActive = path === href

  return (
    <Link key={href} href={href}>
      <a
        className={clsx('flex flex-row gap-2 items-center p-3 rounded-lg', {
          'text-accent bg-accent-transparent': isActive,
          'text-body hover:bg-card': !isActive,
        })}
      >
        {renderIcon(
          isActive ? 'rgb(var(--accent))' : 'rgba(var(--dark), 0.95)'
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
        renderIcon: (color) => <Airdrop color={color} height={14} width={14} />,
        label: 'Airdrop',
        href: '/airdrop',
      },
      {
        renderIcon: (color) => <Pie color={color} height={14} width={14} />,
        label: 'Tokenomics',
        href: '/',
      },
      {
        renderIcon: (color) => (
          <Governance color={color} height={14} width={14} />
        ),
        label: 'Governance',
        href: '/governance',
      },
      ...(/^\/proposal\/\d+$/.test(router.asPath)
        ? [
            {
              renderIcon: (color) => (
                <Hash color={color} height={14} width={14} />
              ),
              label: router.query.proposalId as string,
              href: router.asPath,
            },
          ]
        : []),
      ...(/^\/propose/.test(router.asPath)
        ? [
            {
              renderIcon: (color) => (
                <PlusIcon color={color} height={17} width={17} />
              ),
              label: 'Propose',
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
        <p className="hidden font-studiofeixen text-xl md:block">
          {SITE_TITLE}
        </p>
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
