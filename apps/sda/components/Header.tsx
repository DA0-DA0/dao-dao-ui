import { XIcon } from '@heroicons/react/outline'
import { MenuIcon, PlusIcon } from '@heroicons/react/solid'
import { WalletConnectionStatus, useWalletManager } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react'

import { ConnectWalletButton } from '@dao-dao/common'
import { useTranslation } from '@dao-dao/i18n'
import { Airdrop, Governance, Hash, Pie, Wallet } from '@dao-dao/icons'
import { useWalletBalance } from '@dao-dao/state'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  VotingModuleType,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { Footer, Logo, WalletAvatarIcon, useDAOInfoContext } from '@/components'
import { AIRDROP_URL } from '@/util'

interface NavItemData {
  renderIcon: (color: string, mobile: boolean) => ReactNode
  label: string
  href: string
  active: boolean
  external: boolean
}

interface NavItemProps {
  item: NavItemData
  mobile?: boolean
}

const NavItem: FunctionComponent<NavItemProps> = ({
  item: { renderIcon, label, href, active, external },
  mobile = false,
}) => {
  const aClassName = clsx(
    'link-text flex flex-row items-center gap-2 rounded-lg p-3',
    {
      'bg-accent-transparent text-accent': active,
      'text-body hover:bg-card': !active,
      'gap-4 text-base': mobile,
    }
  )
  const contents = (
    <>
      {renderIcon(
        active ? 'rgb(var(--accent))' : 'rgba(var(--dark), 0.95)',
        mobile
      )}
      <p className="sm:hidden lg:block">{label}</p>
    </>
  )

  return external ? (
    <a
      className={aClassName}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {contents}
    </a>
  ) : (
    <Link href={href}>
      <a className={aClassName}>{contents}</a>
    </Link>
  )
}

export const Header: FunctionComponent = () => {
  const router = useRouter()
  const {
    status,
    connectedWallet: { name: walletName } = {},
    disconnect,
  } = useWalletManager()
  const { walletBalance = 0 } = useWalletBalance()
  const { name: daoName, votingModuleType } = useDAOInfoContext()

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
      ...(votingModuleType === VotingModuleType.Cw4Voting
        ? [
            {
              renderIcon: (color, mobile) => (
                <Wallet
                  color={color}
                  height={mobile ? 16 : 14}
                  width={mobile ? 16 : 14}
                />
              ),
              label: 'Members',
              href: '/',
              active: router.pathname === '/',
              external: false,
            },
          ]
        : []),
      ...(votingModuleType === VotingModuleType.Cw20StakedBalanceVoting
        ? [
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
          ]
        : []),
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
      votingModuleType,
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
        ) : (
          <div className="hidden md:block">
            <ConnectWalletButton className="!w-auto" />
          </div>
        )}
      </div>
    </header>
  )
}

interface MobileNavProps {
  setVisible: Dispatch<SetStateAction<boolean>>
  items: NavItemData[]
  visible: boolean
}

const MobileNav: FunctionComponent<MobileNavProps> = ({
  setVisible,
  items,
  visible,
}) => {
  const { t } = useTranslation()
  const {
    status,
    connectedWallet: { name: walletName } = {},
    disconnect,
  } = useWalletManager()
  const { walletBalance = 0 } = useWalletBalance()

  return (
    <>
      <div
        className="flex cursor-pointer flex-row items-center gap-2 justify-self-end rounded-md bg-primary py-2 px-4 text-sm text-body sm:hidden"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? (
          <>
            <span>{t('button.close')}</span>
            <XIcon height="1.1rem" width="1.1rem" />
          </>
        ) : (
          <>
            <span>{items.find((item) => item.active)?.label ?? ''}</span>
            <MenuIcon height="1.1rem" width="1.1rem" />
          </>
        )}
      </div>

      <div
        className={clsx(
          'fixed inset-0 top-20 z-10 overflow-y-auto bg-white p-4',
          {
            hidden: !visible,
            'flex flex-col sm:hidden': visible,
          }
        )}
      >
        {status === WalletConnectionStatus.Connected ? (
          <div className="flex w-full flex-row items-center justify-between gap-3 rounded-md border border-default py-2 px-4">
            <div className="link-text flex flex-col">
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
        ) : (
          <ConnectWalletButton contentContainerClassName="justify-center" />
        )}

        <div className="mt-4 mb-10 flex flex-col items-stretch gap-1 px-1">
          {items.map((item) => (
            <NavItem key={item.href} item={item} mobile />
          ))}
        </div>

        <Footer />
      </div>
    </>
  )
}
