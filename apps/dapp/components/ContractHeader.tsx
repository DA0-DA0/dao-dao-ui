import { FC } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  ContractHeader as StatelessContractHeader,
  ContractHeaderLoader,
} from '@dao-dao/ui'

import { SuspenseLoader } from './SuspenseLoader'
import { contractInstantiateTime } from '@/selectors/contracts'
import { daoSelector } from '@/selectors/daos'

export interface ContractHeaderProps {
  contractAddress: string
}

const ContractHeaderInternal: FC<ContractHeaderProps> = ({
  contractAddress,
}) => {
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const establishedDate = useRecoilValueLoadable(
    contractInstantiateTime(contractAddress)
  )

  return (
    <StatelessContractHeader
      description={daoInfo.config.description}
      established={
        (establishedDate.state === 'hasValue' && establishedDate.getValue()) ||
        undefined
      }
      imgUrl={daoInfo.config.image_url || undefined}
      name={daoInfo.config.name}
    />
  )
}

export const ContractHeader: FC<ContractHeaderProps> = (props) => (
  <SuspenseLoader fallback={<ContractHeaderLoader />}>
    <ContractHeaderInternal {...props} />
  </SuspenseLoader>
)
