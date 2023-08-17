import { usdPriceSelector } from '@dao-dao/state'
import {
  ChainProvider,
  TokenCard as StatelessTokenCard,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TokenCardInfo } from '@dao-dao/types'

import { ButtonLink } from '../ButtonLink'
import { EntityDisplay } from '../EntityDisplay'

export const GovTokenCard = (props: TokenCardInfo) => {
  const loadingPrice = useCachedLoading(
    usdPriceSelector({
      chainId: props.token.chainId,
      denomOrAddress: props.token.denomOrAddress,
    }),
    undefined
  )

  return (
    <ChainProvider chainId={props.token.chainId}>
      <StatelessTokenCard
        {...props}
        ButtonLink={ButtonLink}
        EntityDisplay={EntityDisplay}
        lazyInfo={
          loadingPrice.loading
            ? loadingPrice
            : {
                loading: false,
                data: {
                  usdUnitPrice: loadingPrice.data,
                  stakingInfo: undefined,
                  totalBalance: props.unstakedBalance,
                },
              }
        }
      />
    </ChainProvider>
  )
}
