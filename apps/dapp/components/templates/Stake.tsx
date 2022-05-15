import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  StakeComponent as StatelessStakeComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { useOrgInfoContext } from '../OrgPageWrapper'
import { SuspenseLoader } from '../SuspenseLoader'

const InnerStakeComponent: TemplateComponent = (props) => {
  const { coreAddress } = useOrgInfoContext()
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(coreAddress)) ?? []

  return (
    <StatelessStakeComponent
      {...props}
      options={{
        nativeBalances,
      }}
    />
  )
}

export const StakeComponent: TemplateComponent = (props) => (
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerStakeComponent {...props} />
  </SuspenseLoader>
)
