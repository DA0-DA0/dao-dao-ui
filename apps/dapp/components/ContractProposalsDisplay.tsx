import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { stakedValueSelector } from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import { Button, Tooltip } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'

import { useOrgInfoContext } from './OrgPageWrapper'
import { ProposalList } from './proposals/ProposalList'
import { SuspenseLoader } from './SuspenseLoader'

export const ContractProposalsDisplay: FC = () => {
  const { coreAddress } = useOrgInfoContext()
  const { address: walletAddress } = useWallet()
  const { stakingContractAddress } = useOrgInfoContext()

  const walletStakedLoadable = useRecoilValueLoadable(
    walletAddress
      ? stakedValueSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )
  const isMember =
    walletStakedLoadable.state === 'hasValue' &&
    !isNaN(Number(walletStakedLoadable.contents?.value)) &&
    Number(walletStakedLoadable.contents?.value) > 0

  const tooltip = isMember
    ? undefined
    : 'You must have voting power to create a proposal. Consider staking some tokens.'

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={`/org/${coreAddress}/proposals/create`}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!isMember} size="sm">
                New proposal
              </Button>
            </Tooltip>
          </a>
        </Link>
      </div>
      <div className="mt-4 mb-8 md:px-4">
        <SuspenseLoader fallback={<Loader />}>
          <ProposalList />
        </SuspenseLoader>
      </div>
    </>
  )
}
