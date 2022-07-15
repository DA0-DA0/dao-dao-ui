import { FC } from 'react'

import {
  HorizontalInfo,
  HorizontalInfoSection,
  SuspenseLoader,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter/react'

import { useDAOInfoContext } from './DAOPageWrapper'

const FallbackDisplay: FC = () => (
  <HorizontalInfo>
    <HorizontalInfoSection>
      <></>
    </HorizontalInfoSection>
  </HorizontalInfo>
)

export const DaoHorizontalInfoDisplay: FC = () => {
  const {
    ui: { DaoHorizontalInfoDisplayInternal },
  } = useVotingModuleAdapter()
  const { coreAddress } = useDAOInfoContext()

  return (
    <SuspenseLoader fallback={<FallbackDisplay />}>
      <DaoHorizontalInfoDisplayInternal coreAddress={coreAddress} />
    </SuspenseLoader>
  )
}
