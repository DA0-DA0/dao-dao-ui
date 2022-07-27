import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { MemberCheck } from '@dao-dao/icons'
import { CopyToClipboardMobile, PinToggle } from '@dao-dao/ui'

import { Loader as DefaultLoader, LoaderProps } from '../Loader'
import { Logo as DefaultLogo, LogoProps } from '../Logo'

export interface MobileHeaderProps {
  imageUrl?: string
  name: string
  member: boolean
  pinned: boolean
  onPin: () => void
  contractAddress: string
  Logo?: ComponentType<LogoProps>
}

export const MobileHeader = ({
  imageUrl,
  name,
  member,
  pinned,
  onPin,
  contractAddress,
  Logo = DefaultLogo,
}: MobileHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row flex-wrap gap-6 justify-around p-6 w-full">
      <div className="relative">
        {imageUrl ? (
          <div
            aria-label={t('info.daosLogo')}
            className="w-[72px] h-[72px] bg-center bg-cover rounded-full"
            role="img"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <Logo size={72} />
        )}
        <div
          className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
          style={{
            width: '32px',
            height: '32px',
            backgroundImage: 'url(/daotoken.jpg)',
          }}
        ></div>
      </div>
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex flex-row justify-between">
          <h1 className="header-text">{name}</h1>
          <div className="flex gap-5">
            {member && (
              <div className="flex flex-row gap-2 items-center">
                <MemberCheck fill="currentColor" width="16px" />
              </div>
            )}
            <PinToggle onPin={onPin} pinned={pinned} />
          </div>
        </div>
        <CopyToClipboardMobile value={contractAddress} />
      </div>
    </div>
  )
}

export interface MobileHeaderLoaderProps {
  contractAddress: string
  Loader?: ComponentType<LoaderProps>
}

export const MobileHeaderLoader = ({
  contractAddress,
  Loader = DefaultLoader,
}: MobileHeaderLoaderProps) => (
  <div className="flex flex-row flex-wrap gap-6 justify-around p-6 w-full">
    <div className="relative">
      <Loader size={72} />

      <div
        className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
        style={{
          width: '32px',
          height: '32px',
          backgroundImage: 'url(/daotoken.jpg)',
        }}
      ></div>
    </div>
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex flex-row justify-between">
        <h1 className="mr-3 w-full bg-dark rounded-sm animate-pulse header-text"></h1>
        <div className="flex gap-5">
          <PinToggle onPin={() => null} pinned={false} />
        </div>
      </div>
      <CopyToClipboardMobile value={contractAddress} />
    </div>
  </div>
)
