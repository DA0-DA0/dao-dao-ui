import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  MobileHeader as StatelessMobileHeader,
  MobileHeaderLoader,
} from '@dao-dao/ui'

import { SuspenseLoader } from './SuspenseLoader'
import { pinnedDaosAtom } from '@/atoms/pinned'
import { isMemberSelector } from '@/selectors/cosm'
import { daoSelector } from '@/selectors/daos'
import { addToken } from '@/util/addToken'

export interface MobileHeaderProps {
  contractAddress: string
}

const MobileHeaderInternal: FC<MobileHeaderProps> = ({ contractAddress }) => {
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const { member } = useRecoilValue(isMemberSelector(contractAddress))
  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(contractAddress)

  return (
    <StatelessMobileHeader
      contractAddress={contractAddress}
      imageUrl={daoInfo.config.image_url || ''}
      member={member}
      name={daoInfo.config.name}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== contractAddress))
        } else {
          setPinnedDaos((p) => p.concat([contractAddress]))
          addToken(daoInfo.gov_token)
        }
      }}
      pinned={pinned}
    />
  )
}

export const MobileHeader: FC<MobileHeaderProps> = (props) => (
  <SuspenseLoader fallback={<MobileHeaderLoader {...props} />}>
    <MobileHeaderInternal {...props} />
  </SuspenseLoader>
)
