import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { PlusSmIcon } from '@heroicons/react/outline'

import { Button } from '@components'

import { daoSelector } from 'selectors/daos'
import { addToken } from 'util/addToken'

import { TreasuryBalances } from './ContractView'

export function DaoTreasury({ address }: { address: string }) {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))

  const addTokenCallback = useCallback(() => {
    addToken(daoInfo.gov_token)
  }, [daoInfo.gov_token])

  return (
    <div>
      <div className="flex justify-between gap-1">
        <h2 className="primary-text">DAO Treasury</h2>
        <Button onClick={addTokenCallback} variant="ghost">
          Add Token <PlusSmIcon className="h-4 w-4" />
        </Button>
      </div>
      <TreasuryBalances address={address} />
    </div>
  )
}
