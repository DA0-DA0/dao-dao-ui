import { useRecoilValue } from 'recoil'
import { nativeBalance, cw20Balances } from 'selectors/treasury'
import { useDaoConfig } from 'hooks/dao'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import HelpTooltip from 'components/HelpTooltip'
import StakedUnstakedTokenBalances from './StakedUnstakedTokenBalances'

function Treasury({ contractAddress }: { contractAddress: string }) {
  const nativeBalances = useRecoilValue(nativeBalance(contractAddress))
  const cw20balances = useRecoilValue(cw20Balances(contractAddress))
  const tokenAddresses = cw20balances.map(({ address }) => address)

  const { daoInfo } = useDaoConfig(contractAddress)

  return (
    <div className="text-left">
      <h3 className="text-2xl mb-2">
        Your Governance Token Balances{' '}
        <HelpTooltip text="How many of the governance token you own. Staked tokens can be used to vote. Unstaked tokens can be transfered and used for proposal deposits." />
      </h3>
      <StakedUnstakedTokenBalances
        tokenAddresses={tokenAddresses}
        govTokenStakingAddress={daoInfo?.staking_contract as string}
        govTokenAddress={daoInfo?.gov_token as string}
      />

      <h3 className="text-2xl mt-8 mb-2">
        Treasury Token Balances{' '}
        <HelpTooltip text="How many of each token the treasury owns" />
      </h3>
      <TokenBalances native={nativeBalances} cw20Balances={cw20balances} />

      <h3 className="text-2xl mt-8 mb-2">Transfers</h3>
      <Transfers contract_address={contractAddress} />
    </div>
  )
}

export default Treasury
