import { FC } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { contractInstantiateTimeSelector } from '@dao-dao/state'
import {
  ContractHeaderLoader,
  ContractHeader as StatelessContractHeader,
  SuspenseLoader,
} from '@dao-dao/ui'

const ContractHeaderInternal: FC = () => {
  const { coreAddress, name, description, imageUrl } = useDaoInfoContext()
  const establishedDate = useRecoilValueLoadable(
    contractInstantiateTimeSelector(coreAddress)
  )

  return (
    <StatelessContractHeader
      description={description}
      established={
        (establishedDate.state === 'hasValue' && establishedDate.getValue()) ||
        undefined
      }
      imgUrl={imageUrl ?? undefined}
      name={name}
    />
  )
}

export const ContractHeader: FC = () => (
  <SuspenseLoader fallback={<ContractHeaderLoader />}>
    <ContractHeaderInternal />
  </SuspenseLoader>
)
