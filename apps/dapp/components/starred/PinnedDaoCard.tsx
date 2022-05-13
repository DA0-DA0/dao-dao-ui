import { FC } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ContractCard, LoadingContractCard } from '../ContractCard'
import { SuspenseLoader } from '../SuspenseLoader'
import { pinnedDaosAtom } from '@/atoms/pinned'
import { memberDaoSelector } from '@/selectors/daos'
import { cw20TokenInfo } from '@/selectors/treasury'
import { addToken } from '@/util/addToken'

interface PinnedDaoCardProps {
  address: string
}

const InnerPinnedDaoCard: FC<PinnedDaoCardProps> = ({ address }) => {
  const listInfo = useRecoilValue(memberDaoSelector(address))
  const tokenInfo = useRecoilValue(cw20TokenInfo(listInfo.gov_token))

  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(address)

  return (
    <ContractCard
      balance={listInfo.balance}
      description={listInfo.dao.description}
      href={`/dao/${address}`}
      imgUrl={listInfo.dao.image_url}
      name={listInfo.dao.name}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
          addToken(listInfo.gov_token)
        }
      }}
      pinned={pinned}
      proposals={listInfo.proposals}
      weight={convertMicroDenomToDenomWithDecimals(
        listInfo.weight,
        tokenInfo.decimals
      )}
    />
  )
}

export const PinnedDaoCard: FC<PinnedDaoCardProps> = (props) => (
  <SuspenseLoader fallback={<LoadingContractCard />}>
    <InnerPinnedDaoCard {...props} />
  </SuspenseLoader>
)
