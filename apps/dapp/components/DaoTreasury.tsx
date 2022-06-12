import { PlusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { Button, Loader, SuspenseLoader } from '@dao-dao/ui'

import { TreasuryBalances, useOrgInfoContext } from '@/components'
import { addToken } from '@/util'

export const DaoTreasury: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)

  return (
    <div>
      <div className="flex gap-1 justify-between">
        <h2 className="primary-text">Treasury</h2>
        {governanceTokenAddress && (
          <Button
            onClick={() => addToken(governanceTokenAddress)}
            variant="ghost"
          >
            Add Token <PlusSmIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
      <SuspenseLoader fallback={<Loader />}>
        <TreasuryBalances />
      </SuspenseLoader>
    </div>
  )
}
