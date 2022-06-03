import { PlusSmIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { useGovernanceTokenInfo } from '@dao-dao/state'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { Button, SuspenseLoader } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'

import { useOrgInfoContext } from './OrgPageWrapper'
import { TreasuryBalances } from './TreasuryBalances'
import { addToken } from '@/util/addToken'

export const DaoTreasury: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)

  if (!config) {
    throw new Error('Failed to load data.')
  }

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
