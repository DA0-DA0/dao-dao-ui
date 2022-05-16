import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { useWallet } from '@dao-dao/state'
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
import {
  cw20Balances,
  cw20TokenInfo,
  nativeBalance,
  walletTokenBalanceLoading,
} from '@/selectors/treasury'

export function TreasuryBalances({ address }: { address: string }) {
  return null
  const nativeBalances = useRecoilValue(nativeBalance(address))

  const cw20List = useRecoilValue(cw20Balances(address))
  const cw20Info = useRecoilValue(
    waitForAll(cw20List.map(({ address }) => cw20TokenInfo(address)))
  )

  const cw20Tokens = cw20Info.map((info, idx) => ({
    symbol: info.symbol,
    amount: cw20List[idx].amount,
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

interface ContractProposalsDisplayProps {
  contractAddress: string
  proposalCreateLink: string
}

export const ContractProposalsDisplay: FC<ContractProposalsDisplayProps> = ({
  contractAddress,
  proposalCreateLink,
}) => {
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

  const loading =
    useRecoilValue(walletTokenBalanceLoading(walletAddress ?? '')) ||
    walletStakedLoadable.state === 'loading'

  const tooltip = isMember
    ? undefined
    : 'You must have voting power to create a proposal. Consider staking some tokens.'

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={proposalCreateLink}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!!tooltip || loading} size="sm">
                New proposal
              </Button>
            </Tooltip>
          </a>
        </Link>
      </div>
      <div className="mt-4 mb-8 md:px-4">
        <SuspenseLoader fallback={<Loader />}>
          <ProposalList contractAddress={contractAddress} />
        </SuspenseLoader>
      </div>
    </>
  )
}
