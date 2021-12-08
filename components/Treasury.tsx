import { useRecoilValue } from 'recoil'
import { nativeBalance, cw20Balances } from 'selectors/treasury'
import WalletTokenBalances from 'components/WalletTokenBalances'
import Transfers from 'components/Transfers'
import TokenBalances from 'components/TokenBalances'
import HelpTooltip from 'components/HelpTooltip'

function Treasury({ contractAddress }: { contractAddress: string }) {
  const nativeBalances = useRecoilValue(nativeBalance(contractAddress))
  const cw20balances = useRecoilValue(cw20Balances(contractAddress))
  const tokenAddresses = cw20balances.map(({ address }) => address)

  return (
    <div className="text-left">
      <h3 className="text-2xl mb-2">
        Your Token Balances{' '}
        <HelpTooltip text="How many of each governance token you own" />
      </h3>
      <WalletTokenBalances tokenAddresses={tokenAddresses} />

      <h3 className="text-2xl mt-8 mb-2">
        Treasury Token Balances{' '}
        <HelpTooltip text="How many of each governance token the treasury owns" />
      </h3>
      <TokenBalances native={nativeBalances} cw20Balances={cw20balances} />

      <h3 className="text-2xl mt-8 mb-2">Transfers</h3>
      <Transfers contract_address={contractAddress} />
    </div>
  )
}

export default Treasury
