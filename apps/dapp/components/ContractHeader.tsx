import { FC } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  ContractHeader as StatelessContractHeader,
  ContractHeaderLoader,
} from '@dao-dao/ui'

import { useOrgInfoContext } from './OrgPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'
import { contractInstantiateTime } from '@/selectors/contracts'

const ContractHeaderInternal: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )
  const establishedDate = useRecoilValueLoadable(
    contractInstantiateTime(coreAddress)
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
