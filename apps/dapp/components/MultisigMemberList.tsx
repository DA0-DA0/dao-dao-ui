import { FC } from 'react'

import { MultisigMemberList as StatelessMultisigMemberList } from '@dao-dao/ui'
import { useRecoilValue } from 'recoil'
import { listMembers, memberWeight, totalWeight } from '@/selectors/multisigs'
import { walletAddressSelector } from '@/../../packages/state'
import { SuspenseLoader } from './SuspenseLoader'
import { Loader } from '@/../../packages/ui/components/Loader'

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
