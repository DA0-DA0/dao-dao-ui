import { XIcon } from '@heroicons/react/outline'
import { MenuIcon } from '@heroicons/react/solid'
import {
  IWalletManagerContext,
  WalletConnectionStatus,
  useWalletManager,
} from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { ComponentType, Dispatch, SVGProps, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { useWalletProfile } from '@dao-dao/state'
import { NavItem, NavItemData } from '@dao-dao/ui'
import { NATIVE_DECIMALS, NATIVE_DENOM, nativeTokenLabel } from '@dao-dao/utils'

import { ConnectWalletButton } from './ConnectWalletButton'

export interface MobileNavProps {
  setVisible: Dispatch<SetStateAction<boolean>>
  items: NavItemData[]
  visible: boolean
  Footer: ComponentType
  WalletAvatarIcon: ComponentType<SVGProps<SVGSVGElement>>
}

export const MobileNav = ({
  setVisible,
  items,
  visible,
  Footer,
  WalletAvatarIcon,
}: MobileNavProps) => {
  const { t } = useTranslation()

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
          'styled-scrollbar fixed inset-0 top-20 z-10 overflow-y-auto bg-white p-4',
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
        ) : status !== undefined ? (
          <ConnectWalletButton contentContainerClassName="justify-center" />
        ) : null}

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
