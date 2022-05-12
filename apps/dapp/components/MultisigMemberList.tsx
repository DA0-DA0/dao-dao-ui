import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { walletAddressSelector } from '@dao-dao/state'
import { MultisigMemberList as StatelessMultisigMemberList } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'

import { SuspenseLoader } from './SuspenseLoader'
import { listMembers, memberWeight, totalWeight } from '@/selectors/multisigs'

export interface MultisigMemberListProps {
  contractAddress: string
  primaryText?: boolean
}

const MultisigMemberListInternal: FC<MultisigMemberListProps> = ({
  contractAddress,
  primaryText,
}) => {
  const weightTotal = useRecoilValue(totalWeight(contractAddress))
  const visitorWeight = useRecoilValue(memberWeight(contractAddress))
  const memberList = useRecoilValue(listMembers(contractAddress))
  const walletAddress = useRecoilValue(walletAddressSelector)

  return (
    <StatelessMultisigMemberList
      memberList={memberList}
      primaryText={primaryText}
      totalWeight={weightTotal}
      visitorAddress={walletAddress}
      visitorWeight={visitorWeight}
    />
  )
}

export const MultisigMemberList: FC<MultisigMemberListProps> = (props) => (
  <SuspenseLoader fallback={<Loader />}>
    <MultisigMemberListInternal {...props} />
  </SuspenseLoader>
)
