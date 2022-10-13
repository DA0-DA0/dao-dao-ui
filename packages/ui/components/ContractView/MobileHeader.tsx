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
    <div className="flex w-full flex-row flex-wrap justify-around gap-6 p-6">
      <div className="relative">
        {imageUrl ? (
          <div
            aria-label={t('info.daosLogo')}
            className="h-[72px] w-[72px] rounded-full bg-cover bg-center"
            role="img"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <Logo size={72} />
        )}
        <div
          className="absolute -right-[10px] -bottom-1 rounded-full border border-light bg-center"
          style={{
            width: '32px',
            height: '32px',
            backgroundImage: 'url(/daotoken.jpg)',
          }}
        ></div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-row justify-between">
          <h1 className="header-text">{name}</h1>
          <div className="flex gap-5">
            {member && (
              <div className="flex flex-row items-center gap-2">
                <MemberCheck width="16px" />
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
  <div className="flex w-full flex-row flex-wrap justify-around gap-6 p-6">
    <div className="relative">
      <Loader size={72} />

      <div
        className="absolute -right-[10px] -bottom-1 rounded-full border border-light bg-center"
        style={{
          width: '32px',
          height: '32px',
          backgroundImage: 'url(/daotoken.jpg)',
        }}
      ></div>
    </div>
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-row justify-between">
        <h1 className="header-text mr-3 w-full animate-pulse rounded-sm bg-dark"></h1>
        <div className="flex gap-5">
          <PinToggle onPin={() => null} pinned={false} />
        </div>
      </div>
      <CopyToClipboardMobile value={contractAddress} />
    </div>
  </div>
)
