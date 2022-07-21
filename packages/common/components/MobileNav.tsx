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

import { useWalletBalance } from '@dao-dao/state'
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
    const { walletBalance: _walletBalance } = useWalletBalance()
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
          'overflow-y-auto fixed inset-0 top-20 z-10 p-4 bg-white styled-scrollbar',
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
