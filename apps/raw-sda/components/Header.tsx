import { PlusIcon } from '@heroicons/react/solid'
import {
  IWalletManagerContext,
  WalletConnectionStatus,
  useWalletManager,
} from '@noahsaso/cosmodal'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import {
  ConnectWalletButton,
  MobileNav,
  useDaoInfoContext,
} from '@dao-dao/common'
import { Airdrop, Governance, Hash, Pie } from '@dao-dao/icons'
import { useWalletBalance } from '@dao-dao/state'
import { NavItem, NavItemData } from '@dao-dao/ui'
import { NATIVE_DECIMALS, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { Footer, Logo, WalletAvatarIcon } from '@/components'
import { AIRDROP_URL } from '@/util'

export const Header = () => {
  const router = useRouter()

  // If on error page, these hooks will throw errors. Ignore since Header is
  // rendered on error pages.
  let walletManager: IWalletManagerContext | undefined
  let walletBalance = 0
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    walletManager = useWalletManager()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { walletBalance: _walletBalance } = useWalletBalance()
    walletBalance = _walletBalance ?? 0
  } catch {}

  const {
    status,
    connectedWallet: { name: walletName } = { name: undefined },
    disconnect,
  } = walletManager ?? {
    connectedWallet: {},
  }

  // If on error page, this hook will throw an error. Ignore it since Header is
  // rendered on error pages.
  let daoName: string | undefined
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { name } = useDaoInfoContext()
    daoName = name
  } catch {}

  const [mobileNavVisible, setMobileNavVisible] = useState(false)

  const navItems = useMemo<NavItemData[]>(
    () => [
      ...(AIRDROP_URL
        ? [
            {
              renderIcon: (color, mobile) => (
                <Airdrop
                  color={color}
                  height={mobile ? 16 : 14}
                  width={mobile ? 16 : 14}
                />
              ),
              label: 'Airdrop',
              href: AIRDROP_URL,
              active: false,
              external: true,
            },
          ]
        : []),
      {
        renderIcon: (color, mobile) => (
          <Pie
            color={color}
            height={mobile ? 16 : 14}
            width={mobile ? 16 : 14}
          />
        ),
        label: 'Stake',
        href: '/',
        active: router.pathname === '/',
        external: false,
      },
      {
        renderIcon: (color, mobile) => (
          <Governance
            color={color}
            height={mobile ? 16 : 14}
            width={mobile ? 16 : 14}
          />
        ),
        label: 'Vote',
        href: '/vote',
        active: router.pathname === '/vote',
        external: false,
      },
      // Dynamic parameters are only available once isReady is true and
      // we are not displaying a fallback page.
      ...(router.isReady &&
      !router.isFallback &&
      router.pathname === '/vote/[proposalId]'
        ? [
            {
              renderIcon: (color, mobile) => (
                <Hash
                  color={color}
                  height={mobile ? 16 : 14}
                  width={mobile ? 16 : 14}
                />
              ),
              label: `Proposal ${router.query.proposalId as string}`,
              href: router.asPath,
              active: true,
              external: false,
            },
          ]
        : []),
      ...(router.pathname === '/propose'
        ? [
            {
              renderIcon: (color, mobile) => (
                <PlusIcon
                  color={color}
                  height={mobile ? 19 : 17}
                  width={mobile ? 19 : 17}
                />
              ),
              label: 'Propose',
              href: '/propose',
              active: true,
              external: false,
            },
          ]
        : []),
    ],
    [
      router.pathname,
      router.isReady,
      router.isFallback,
      router.query.proposalId,
      router.asPath,
    ]
  )

  return (
    <header
      className={clsx(
        'grid grid-cols-2 items-center py-4 px-6 h-20 sm:grid-cols-3 md:grid-cols-[2fr_3fr_2fr]',
        { 'border-b border-inactive': !mobileNavVisible }
      )}
    >
      <Link href="/">
        <a className="flex flex-row gap-4 items-center w-full">
          <Logo className="rounded-full border border-default" size={36} />

          <p className="font-studiofeixen text-[18px]">{daoName}</p>
        </a>
      </Link>

      {/* Mobile */}
      <MobileNav
        Footer={Footer}
        WalletAvatarIcon={WalletAvatarIcon}
        items={navItems}
        setVisible={setMobileNavVisible}
        visible={mobileNavVisible}
      />

      {/* Desktop */}
      <div className="hidden flex-row gap-2 justify-self-center items-center sm:flex">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>

      <div
        className={clsx('hidden h-10 sm:block', {
          'w-full': status === WalletConnectionStatus.Connected,
          'justify-self-end': status !== WalletConnectionStatus.Connected,
        })}
      >
        {status === WalletConnectionStatus.Connected ? (
          <div className="flex flex-row flex-1 gap-3 justify-end items-center h-full">
            <div className="flex flex-col items-end text-right link-text">
              <span>{walletName}</span>
              <span className="font-mono text-secondary capitalize gradient-text">
                {walletBalance.toLocaleString(undefined, {
                  maximumFractionDigits: NATIVE_DECIMALS,
                })}{' '}
                {nativeTokenLabel(NATIVE_DENOM)}
              </span>
            </div>

            <div className="cursor-pointer" onClick={disconnect}>
              <WalletAvatarIcon height={40} width={40} />
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <ConnectWalletButton />
          </div>
        )}
      </div>
    </header>
  )
}
