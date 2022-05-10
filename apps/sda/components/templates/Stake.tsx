import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  StakeComponent as StatelessStakeComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { SuspenseLoader } from '..'
import { DAO_ADDRESS } from '@/util'

const InnerStakeComponent: TemplateComponent = (props) => {
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(DAO_ADDRESS)) ?? []

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
