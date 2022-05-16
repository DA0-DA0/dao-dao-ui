import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { nativeBalancesSelector, useWallet } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { allCw20BalancesSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { stakedValueSelector } from '@dao-dao/state/recoil/selectors/clients/stake-cw20'
import {
  Button,
  TreasuryBalances as StatelessTreasuryBalances,
  Tooltip,
} from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { useOrgInfoContext } from './OrgPageWrapper'
import { ProposalList } from './proposals/ProposalList'
import { SuspenseLoader } from './SuspenseLoader'

export const TreasuryBalances: FC = () => {
  const { coreAddress } = useOrgInfoContext()

  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(coreAddress)) ?? []

  const cw20List =
    useRecoilValue(allCw20BalancesSelector({ contractAddress: coreAddress })) ??
    []
  const cw20Info = useRecoilValue(
    waitForAll(
      cw20List.map(({ addr }) =>
        tokenInfoSelector({ contractAddress: addr, params: [] })
      )
    )
  ).filter(Boolean) as TokenInfoResponse[]

  const cw20Tokens = cw20Info.map((info, idx) => ({
    symbol: info.symbol,
    amount: cw20List[idx].balance,
    decimals: info.decimals,
  }))

  const nativeTokens = nativeBalances.length
    ? nativeBalances.map(({ denom, amount }) => ({
        denom: denom,
        amount,
        decimals: nativeTokenDecimals(denom) || NATIVE_DECIMALS,
      }))
    : [{ denom: NATIVE_DENOM, amount: '0', decimals: NATIVE_DECIMALS }]

  return (
    <StatelessTreasuryBalances
      cw20Tokens={cw20Tokens}
      nativeTokens={nativeTokens}
    />
  )
}

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
