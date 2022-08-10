// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useRecoilValueLoadable } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { contractInstantiateTimeSelector } from '@dao-dao/state'
import {
  ContractHeaderLoader,
  ContractHeader as StatelessContractHeader,
  SuspenseLoader,
} from '@dao-dao/ui'

const ContractHeaderInternal = () => {
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

export const ContractHeader = () => (
  <SuspenseLoader fallback={<ContractHeaderLoader />}>
    <ContractHeaderInternal />
  </SuspenseLoader>
)
