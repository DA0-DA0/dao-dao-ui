import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { ButtonLink } from '../../../../../components'
import { useMembership } from '../../../../../hooks/useMembership'
import { vestingPaymentsSelector } from '../../state'
import { PayrollTab as StatelessPayrollTab } from '../stateless/PayrollTab'
import { VestingPaymentCard } from './VestingPaymentCard'

export const PayrollTab = () => {
  const { coreAddress, chainId } = useDaoInfoContext()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const setRefresh = useSetRecoilState(refreshVestingAtom(''))
  // Refresh vesting data every 30 seconds.
  useEffect(() => {
    const interval = setInterval(() => setRefresh((id) => id + 1), 30000)
    return () => clearInterval(interval)
  }, [setRefresh])

  const vestingPaymentsLoading = loadableToLoadingData(
    useCachedLoadable(
      vestingPaymentsSelector({
        coreAddress,
        chainId,
      })
    ),
    []
  )

  // TODO: Fill in action.
  // const createVestingPaymentHref = useEncodedDaoProposalSinglePrefill({
  //   actions: [],
  // })
  const createVestingPaymentHref = '#'

  return (
    <StatelessPayrollTab
      ButtonLink={ButtonLink}
      VestingPaymentCard={VestingPaymentCard}
      createVestingPaymentHref={createVestingPaymentHref}
      isMember={isMember}
      vestingPaymentsLoading={vestingPaymentsLoading}
    />
  )
}
