import { FC } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { contractInstantiateTimeSelector } from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  ContractHeaderLoader,
  ContractHeader as StatelessContractHeader,
  SuspenseLoader,
} from '@dao-dao/ui'

import { useOrgInfoContext } from './OrgPageWrapper'

const ContractHeaderInternal: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )
  const establishedDate = useRecoilValueLoadable(
    contractInstantiateTimeSelector(coreAddress)
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

export const ContractHeader: FC = () => (
  <SuspenseLoader fallback={<ContractHeaderLoader />}>
    <ContractHeaderInternal />
  </SuspenseLoader>
)
