import { Coin } from '@cosmjs/stargate'
import { Cw20Balance } from 'types/cw-dao'
import { TokenInfo } from 'types/cw20'
import {
  convertMicroDenomToDenom,
  convertFromMicroDenom,
} from 'util/conversion'

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
  cw20info,
}: {
  native: Coin[]
  cw20: Cw20Balance[]
  cw20info: TokenInfo[]
}) {
  return (
    <>
      <h3 className="text-2xl mb-2">Token Balances</h3>
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
