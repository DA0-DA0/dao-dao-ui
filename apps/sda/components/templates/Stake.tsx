import { Suspense } from 'react'

import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  StakeComponent as StatelessStakeComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

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
  <Suspense fallback={<TemplateComponentLoader />}>
    <InnerStakeComponent {...props} />
  </Suspense>
)
