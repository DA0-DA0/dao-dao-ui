import { Coin } from '@cosmjs/stargate'
import HelpTooltip from 'components/HelpTooltip'
import {
  convertMicroDenomToDenom,
  convertFromMicroDenom,
} from 'util/conversion'
import { Cw20CoinVerified } from '@dao_dao/types/contracts/cw3-dao'
import { TokenInfoResponse } from '@dao_dao/types/contracts/cw20-stakeable'

function TokenBalance({
  amount,
  denom,
  symbol,
}: {
  amount: string
  denom: string
  symbol?: string
}) {
  symbol = symbol || convertFromMicroDenom(denom)

  return (
    <div className="card bordered shadow-lg card-side mr-2">
      <div className="card-body py-6">
        <h2 className="card-title">{symbol}</h2>
        <p>{convertMicroDenomToDenom(amount)}</p>
        {/* <p>-</p> */}
      </div>
    </div>
  )
}

function TokenBalances({
  native,
  cw20,
  cw20Wallet,
  cw20info,
}: {
  native: Coin[]
  cw20: Cw20CoinVerified[]
  cw20Wallet: Cw20CoinVerified[]
  cw20info: TokenInfoResponse[]
}) {
  return (
    <>
      <h3 className="text-2xl mb-2">
        Your Token Balances{' '}
        <HelpTooltip text="How many of each governance token you own" />
      </h3>
      <div className="flex">
        {cw20Wallet
          ? cw20Wallet.map((balance, index) => (
              <TokenBalance
                key={balance.address}
                amount={balance.amount}
                denom={cw20info[index]?.name}
                symbol={cw20info[index]?.symbol}
              />
            ))
          : null}
      </div>
      <h3 className="text-2xl mb-2">
        Treasury Token Balances{' '}
        <HelpTooltip text="How many of each governance token the treasury owns" />
      </h3>
      <div className="flex">
        {native.map((coin) => (
          <TokenBalance
            key={coin.denom}
            amount={coin.amount}
            denom={coin.denom}
          />
        ))}

        {cw20.length == cw20info.length
          ? cw20.map((balance, index) => (
              <TokenBalance
                key={balance.address}
                amount={balance.amount}
                denom={cw20info[index]?.name}
                symbol={cw20info[index]?.symbol}
              />
            ))
          : null}
      </div>
    </>
  )
}

export default TokenBalances
