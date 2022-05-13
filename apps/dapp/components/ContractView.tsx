import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, useRecoilValueLoadable, waitForAll } from 'recoil'

import { useWallet } from '@dao-dao/state'
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

import { ProposalList } from './ProposalList'
import { SuspenseLoader } from './SuspenseLoader'
import { isMemberSelector } from '@/selectors/cosm'
import {
  cw20Balances,
  cw20TokenInfo,
  nativeBalance,
  walletTokenBalanceLoading,
} from '@/selectors/treasury'

export function TreasuryBalances({ address }: { address: string }) {
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
  multisig?: boolean
}

export const ContractProposalsDisplay: FC<ContractProposalsDisplayProps> = ({
  contractAddress,
  proposalCreateLink,
  multisig,
}) => {
  const { address: walletAddress } = useWallet()
  const member = useRecoilValueLoadable(isMemberSelector(contractAddress))

  const loading =
    useRecoilValue(walletTokenBalanceLoading(walletAddress ?? '')) ||
    member.state === 'loading'

  const tooltip = !member
    ? `You must have voting power to create a proposal.${
        multisig ? '' : ' Consider staking some tokens.'
      }`
    : undefined

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link
          className={clsx(
            member.state === 'hasValue' &&
              member.getValue().member &&
              'pointer-events-none'
          )}
          href={proposalCreateLink}
          passHref
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
      <div className="mt-4 md:px-4">
        <SuspenseLoader fallback={<Loader />}>
          <ProposalList contractAddress={contractAddress} multisig={multisig} />
        </SuspenseLoader>
      </div>
    </>
  )
}
