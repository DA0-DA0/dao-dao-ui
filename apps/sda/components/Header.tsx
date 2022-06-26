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
    'flex flex-row gap-2 items-center p-3 rounded-lg link-text',
    {
      'text-accent bg-accent-transparent': active,
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
        className="flex flex-row gap-2 justify-self-end items-center py-2 px-4 text-sm text-body bg-primary rounded-md cursor-pointer sm:hidden"
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
          'overflow-y-auto fixed inset-0 top-20 z-10 p-4 bg-white',
          {
            hidden: !visible,
            'flex flex-col sm:hidden': visible,
          }
        )}
      >
        {status === WalletConnectionStatus.Connected ? (
          <div className="flex flex-row gap-3 justify-between items-center py-2 px-4 w-full rounded-md border border-default">
            <div className="flex flex-col link-text">
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
          <ConnectWalletButton contentContainerClassName="justify-center" />
        )}

        <div className="flex flex-col gap-1 items-stretch px-1 mt-4 mb-10">
          {items.map((item) => (
            <NavItem key={item.href} item={item} mobile />
          ))}
        </div>

        <Footer />
      </div>
    </>
  )
}
