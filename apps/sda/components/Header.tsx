import { PlusIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, ReactNode, useMemo } from 'react'

import { Airdrop, Pie, Governance, Hash, WalletAvatar } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
} from '@dao-dao/utils'

import { Logo, WalletConnectButton, useDAOInfoContext } from '@/components'

interface NavItemData {
  renderIcon: (color: string) => ReactNode
  label: string
  href: string
  isActive: boolean
}

interface NavItemProps {
  item: NavItemData
}

const NavItem: FunctionComponent<NavItemProps> = ({
  item: { renderIcon, label, href, isActive },
}) => (
  <Link key={href} href={href}>
    <a
      className={clsx(
        'flex flex-row gap-2 items-center p-3 rounded-lg link-text',
        {
          'text-accent bg-accent-transparent': isActive,
          'text-body hover:bg-card': !isActive,
        }
      )}
    >
      {renderIcon(isActive ? 'rgb(var(--accent))' : 'rgba(var(--dark), 0.95)')}
      <p className="hidden lg:block">{label}</p>
    </a>
  </Link>
)

export const Header: FunctionComponent = () => {
  const router = useRouter()
  const { connected, name: walletName, nativeBalance, disconnect } = useWallet()
  const { name: daoName } = useDAOInfoContext()

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
        isActive: router.pathname === '/airdrop',
      },
      {
        renderIcon: (color) => <Pie color={color} height={14} width={14} />,
        label: 'Stake',
        href: '/',
        isActive: router.pathname === '/',
      },
      {
        renderIcon: (color) => (
          <Governance color={color} height={14} width={14} />
        ),
        label: 'Vote',
        href: '/vote',
        isActive: router.pathname === '/vote',
      },
      // Dynamic parameters are only available once isReady is true and
      // we are not displaying a fallback page.
      ...(router.isReady &&
      !router.isFallback &&
      router.pathname === '/proposal/[proposalId]'
        ? [
            {
              renderIcon: (color) => (
                <Hash color={color} height={14} width={14} />
              ),
              label: router.query.proposalId as string,
              href: router.asPath,
              isActive: true,
            },
          ]
        : []),
      ...(router.pathname === '/propose'
        ? [
            {
              renderIcon: (color) => (
                <PlusIcon color={color} height={17} width={17} />
              ),
              label: 'Propose',
              href: '/propose',
              isActive: true,
            },
          ]
        : []),
    ],
    [
      router.asPath,
      router.pathname,
      router.query,
      router.isReady,
      router.isFallback,
    ]
  )

  return (
    <header className="grid grid-cols-3 items-center py-4 px-6">
      <Link href="/">
        <a className="flex flex-row gap-2 items-center w-full md:gap-4">
          <Logo size={32} />

          <p className="hidden font-studiofeixen md:block text-[18p]">
            {daoName}
          </p>
        </a>
      </Link>

      <div className="flex flex-row gap-2 justify-self-center items-center">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} />
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
              <span>{walletName}</span>
              <span className="text-secondary capitalize">
                {walletBalance} {humanDenom}
              </span>
            </div>

            <div className="cursor-pointer" onClick={disconnect}>
              <WalletAvatar height={40} width={40} />
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <WalletConnectButton />
          </div>
        )}
      </div>
    </header>
  )
}
