import { FC } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  ContractHeader as StatelessContractHeader,
  ContractHeaderLoader,
} from '@dao-dao/ui'

import { SuspenseLoader } from './SuspenseLoader'
import { contractInstantiateTime } from '@/selectors/contracts'

export interface ContractHeaderProps {
  contractAddress: string
}

const ContractHeaderInternal: FC<ContractHeaderProps> = ({
  contractAddress,
}) => {
  const config = useRecoilValue(configSelector({ contractAddress }))
  const establishedDate = useRecoilValueLoadable(
    contractInstantiateTime(contractAddress)
  )

  if (!config) throw new Error('Failed to load data.')

  return (
    <StatelessContractHeader
      description={config.description}
      established={
        (establishedDate.state === 'hasValue' && establishedDate.getValue()) ||
        undefined
      }
      imgUrl={config.image_url ?? undefined}
      name={config.name}
    />
  )
}

export const ContractHeader: FC<ContractHeaderProps> = (props) => (
  <SuspenseLoader fallback={<ContractHeaderLoader />}>
    <ContractHeaderInternal {...props} />
  </SuspenseLoader>
)
