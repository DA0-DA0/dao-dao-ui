import { LockClosedIcon } from '@heroicons/react/outline'
import TokenBalance from 'components/TokenBalance'
import {
  convertMicroDenomToDenom,
  convertFromMicroDenom,
} from 'util/conversion'
import { useRecoilValue } from 'recoil'
import { cw20TokenInfo } from 'selectors/treasury'

export default function StakedTokenBalance({
  tokenAddress,
  amount,
}: {
  tokenAddress: string
  amount: string
}) {
  const tokenInfo = useRecoilValue(cw20TokenInfo(tokenAddress))
  const symbol = tokenInfo.symbol || convertFromMicroDenom(tokenInfo.name)

  return (
    <div className="card bordered shadow-lg mr-2">
      <div className="card-body pt-6 pb-0">
        <h2 className="card-title">{'Staked ' + symbol}</h2>
        <p className="w-full text-center">{convertMicroDenomToDenom(amount)}</p>
      </div>
    </div>
  )
}
