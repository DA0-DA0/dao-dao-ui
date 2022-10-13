import { HomeIcon, PlusIcon } from '@heroicons/react/solid'
import {
  IWalletManagerContext,
  WalletConnectionStatus,
  useWalletManager,
} from '@noahsaso/cosmodal'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { ConnectWalletButton, MobileNav } from '@dao-dao/common'
import { Governance, Hash } from '@dao-dao/icons'
import { useWalletProfile } from '@dao-dao/state'
import { NavItem, NavItemData, useDaoInfoContext } from '@dao-dao/ui'
import { NATIVE_DECIMALS, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'
import { MembershipPageInfo } from '@dao-dao/voting-module-adapter/types'

import { Footer, Logo, WalletAvatarIcon } from '@/components'

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
    const { walletBalance: _walletBalance } = useWalletProfile()
    walletBalance = _walletBalance ?? 0
  } catch {}

  const {
    status,
    connectedWallet: { name: walletName } = { name: undefined },
    disconnect,
  } = walletManager ?? {}

  // If on error page, this hook will throw an error. Ignore it since Header is
  // rendered on error pages.
  let daoName: string | undefined
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { name } = useDaoInfoContext()
    daoName = name
  } catch {}

  // If on error page, this hook will throw an error. Ignore it since Header is
  // rendered on error pages.
  let membershipPageInfo: MembershipPageInfo | undefined
  try {
    membershipPageInfo =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useVotingModuleAdapter().fields.membershipPageInfo
  } catch {}

  const [mobileNavVisible, setMobileNavVisible] = useState(false)

  const navItems = useMemo<NavItemData[]>(
    () => [
      {
        renderIcon: (mobile) => (
          <HomeIcon height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
        ),
        label: 'Home',
        href: '/',
        active: router.pathname === '/',
        external: false,
      },
      ...(membershipPageInfo
        ? [
            {
              ...membershipPageInfo,
              href: '/member',
              active: router.pathname === '/member',
              external: false,
            },
          ]
        : []),
      {
        renderIcon: (mobile) => (
          <Governance height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
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
              renderIcon: (mobile) => (
                <Hash height={mobile ? 16 : 14} width={mobile ? 16 : 14} />
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
              renderIcon: (mobile) => (
                <PlusIcon height={mobile ? 19 : 17} width={mobile ? 19 : 17} />
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
      membershipPageInfo,
    ]
  )

  return (
    <header
      className={clsx(
        'grid h-20 grid-cols-2 items-center py-4 px-6 sm:grid-cols-3 md:grid-cols-[2fr_3fr_2fr]',
        { 'border-b border-inactive': !mobileNavVisible }
      )}
    >
      <Link href="/">
        <a className="flex w-full flex-row items-center gap-4">
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
      <div className="hidden flex-row items-center gap-2 justify-self-center sm:flex">
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
          <div className="flex h-full flex-1 flex-row items-center justify-end gap-3">
            <div className="link-text flex flex-col items-end text-right">
              <span>{walletName}</span>
              <span className="gradient-text font-mono capitalize text-secondary">
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
        ) : status !== undefined ? (
          <div className="hidden md:block">
            <ConnectWalletButton />
          </div>
        ) : null}
      </div>
    </header>
  )
}
