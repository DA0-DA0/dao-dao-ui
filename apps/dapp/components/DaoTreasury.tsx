import { PlusSmIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { Button } from '@dao-dao/ui'

import { daoSelector } from 'selectors/daos'
import { addToken } from 'util/addToken'

import { TreasuryBalances } from './ContractView'

export function DaoTreasury({ address }: { address: string }) {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValueLoadable(daoSelector(contractAddress))

  const addTokenCallback = useCallback(() => {
    if (daoInfo.state == 'hasValue') addToken(daoInfo.getValue().gov_token)
  }, [daoInfo])

  return (
    <div>
      <div className="flex gap-1 justify-between">
        <h2 className="primary-text">Treasury</h2>
        <Button onClick={addTokenCallback} variant="ghost">
          Add Token <PlusSmIcon className="w-4 h-4" />
        </Button>
      </div>
      <TreasuryBalances address={address} />
    </div>
  )
}
