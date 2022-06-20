import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { MemberCheck } from '@dao-dao/icons'
import { CopyToClipboardMobile, HeartButton, Logo } from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'

export interface MobileHeaderProps {
  imageUrl?: string
  name: string
  member: boolean
  pinned: boolean
  onPin: () => void
  contractAddress: string
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  imageUrl,
  name,
  member,
  pinned,
  onPin,
  contractAddress,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row flex-wrap gap-6 justify-around p-6 w-full">
      <div className="relative">
        {imageUrl && HEADER_IMAGES_ENABLED ? (
          <div
            aria-label={t('daosLogo')}
            className="w-[72px] h-[72px] bg-center bg-cover rounded-full"
            role="img"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
        ) : (
          <Logo alt={t('daodaoLogo')} height={72} width={72} />
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
            <HeartButton onPin={onPin} pinned={pinned} />
          </div>
        </div>
        <CopyToClipboardMobile value={contractAddress} />
      </div>
    </div>
  )
}

export const MobileHeaderLoader: FC<{ contractAddress: string }> = ({
  contractAddress,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row flex-wrap gap-6 justify-around p-6 w-full">
      <div className="relative">
        <div className="animate-spin-medium">
          <Logo alt={t('daodaoLogo')} height={72} width={72} />
        </div>
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
            <HeartButton onPin={() => null} pinned={false} />
          </div>
        </div>
        <CopyToClipboardMobile value={contractAddress} />
      </div>
    </div>
  )
}
