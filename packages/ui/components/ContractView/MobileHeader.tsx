import { FC } from 'react'

import {
  GradientHero,
  Logo,
  StarButton,
  CopyToClipboardMobile,
} from '@dao-dao/ui'
import { HEADER_IMAGES_ENABLED } from '@dao-dao/utils'
import { MemberCheck } from '@dao-dao/icons'

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
}) => (
  <div className="flex flex-row gap-6 justify-around flex-wrap w-full p-6">
    <div className="relative">
      {imageUrl && HEADER_IMAGES_ENABLED ? (
        <div
          aria-label="DAO's Custom Logo"
          className="w-[72px] h-[72px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      ) : (
        <Logo alt="DAO DAO logo" height={72} width={72} />
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
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex flex-row justify-between">
        <h1 className="header-text">{name}</h1>
        <div className="flex gap-5">
          {member && (
            <div className="flex flex-row gap-2 items-center">
              <MemberCheck fill="currentColor" width="16px" />
            </div>
          )}
          <StarButton onPin={onPin} pinned={pinned} />
        </div>
      </div>
      <CopyToClipboardMobile value={contractAddress} />
    </div>
  </div>
)
