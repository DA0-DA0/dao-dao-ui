import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import {
  Button,
  TreasuryBalances as StatelessTreasuryBalances,
} from '@dao-dao/ui'
import { NATIVE_DECIMALS, nativeTokenDecimals } from '@dao-dao/utils'
import Tooltip from '@reach/tooltip'

import { isMemberSelector } from 'selectors/cosm'
import {
  cw20Balances,
  cw20TokenInfo,
  nativeBalance,
  walletAddress,
  walletTokenBalanceLoading,
} from 'selectors/treasury'

import { ProposalList } from './ProposalList'

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

  const nativeTokens = nativeBalances.map(({ denom, amount }) => ({
    denom: denom,
    amount,
    decimals: nativeTokenDecimals(denom) || NATIVE_DECIMALS,
  }))

  return (
    <StatelessTreasuryBalances
      cw20Tokens={cw20Tokens}
      nativeTokens={nativeTokens}
    />
  )
}

export function ContractProposalsDispaly({
  contractAddress,
  proposalCreateLink,
  multisig,
}: {
  contractAddress: string
  proposalCreateLink: string
  multisig?: boolean
}) {
  const wallet = useRecoilValue(walletAddress)
  const loading = useRecoilValue(walletTokenBalanceLoading(wallet))

  const member = useRecoilValue(isMemberSelector(contractAddress)).member
  const tooltip = !member
    ? `You must have voting power to create a proposal.${
        multisig ? '' : ' Consider staking some tokens.'
      }`
    : undefined

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link href={member ? proposalCreateLink : '#'} passHref>
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!!tooltip || loading} size="sm">
                {loading ? 'Loading...' : 'New proposal'}
              </Button>
            </Tooltip>
          </a>
        </Link>
      </div>
      <div className="px-4 mt-4">
        <ProposalList contractAddress={contractAddress} multisig={multisig} />
      </div>
    </>
  )
}
