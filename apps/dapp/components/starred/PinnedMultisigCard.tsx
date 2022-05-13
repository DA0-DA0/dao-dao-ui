import { FC } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { NATIVE_DENOM } from '@dao-dao/utils'

import { ContractCard, LoadingContractCard } from '../ContractCard'
import { SuspenseLoader } from '../SuspenseLoader'
import { pinnedMultisigsAtom } from '@/atoms/pinned'
import { isMemberSelector } from '@/selectors/cosm'
import { proposalCount } from '@/selectors/daos'
import { sigSelector } from '@/selectors/multisigs'
import { nativeBalance } from '@/selectors/treasury'

interface PinnedMultisigCardProps {
  address: string
}

const InnerPinnedMultisigCard: FC<PinnedMultisigCardProps> = ({ address }) => {
  const config = useRecoilValue(sigSelector(address)).config
  const weight = useRecoilValue(isMemberSelector(address)).weight
  const proposals = useRecoilValue(proposalCount(address))
  const balance = useRecoilValue(nativeBalance(address))
  const chainBalance = balance.find((coin) => coin.denom == NATIVE_DENOM)
  const chainNativeBalance = chainBalance?.amount || '0'

  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  return (
    <ContractCard
      balance={chainNativeBalance}
      description={config.description}
      href={`/multisig/${address}`}
      imgUrl={config.image_url}
      name={config.name}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
      pinned={pinned}
      proposals={proposals}
      weight={weight}
    />
  )
}

export const PinnedMultisigCard: FC<PinnedMultisigCardProps> = (props) => (
  <SuspenseLoader fallback={<LoadingContractCard />}>
    <InnerPinnedMultisigCard {...props} />
  </SuspenseLoader>
)
