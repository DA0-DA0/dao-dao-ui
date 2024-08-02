import { useQueryClient } from '@tanstack/react-query'

import { cwVestingExtraQueries } from '@dao-dao/state/query'
import { VestingPaymentLine as StatelessVestingPaymentLine } from '@dao-dao/stateless'
import { StatefulVestingPaymentLineProps } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../hooks'
import { EntityDisplay } from '../EntityDisplay'

export const VestingPaymentLine = ({
  vestingInfo: fallbackInfo,
  ...props
}: StatefulVestingPaymentLineProps) => {
  const queryClient = useQueryClient()

  // Use info passed into props as fallback, since it came from the list query;
  // the individual query updates more frequently.
  const freshInfo = useQueryLoadingDataWithError(
    cwVestingExtraQueries.info(queryClient, {
      chainId: fallbackInfo.chainId,
      address: fallbackInfo.vestingContractAddress,
    })
  )

  const vestingInfo =
    freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data

  return (
    <StatelessVestingPaymentLine
      {...props}
      EntityDisplay={EntityDisplay}
      vestingInfo={vestingInfo}
    />
  )
}
