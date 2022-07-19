import { FC } from 'react'

import { Loader, SuspenseLoader } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { DaoTreasury } from './DaoTreasury'

interface DaoInfoProps {
  hideTreasury?: boolean
}

const InnerDaoInfo = ({ hideTreasury }: DaoInfoProps) => {
  const {
    components: { DaoInfoContent },
  } = useVotingModuleAdapter()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-10 sm:justify-around">
      <DaoInfoContent />

      {!hideTreasury && (
        <SuspenseLoader fallback={<Loader />}>
          <DaoTreasury />
        </SuspenseLoader>
      )}
    </div>
  )
}

export const DaoInfo: FC<DaoInfoProps> = (props) => (
  <SuspenseLoader fallback={<Loader />}>
    <InnerDaoInfo {...props} />
  </SuspenseLoader>
)
