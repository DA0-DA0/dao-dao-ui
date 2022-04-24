import { Suspense } from 'react'

import { useRecoilValue } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import {
  StakeComponent as StatelessStakeComponent,
  TemplateComponent,
} from '@dao-dao/ui/components/templates'

import { Logo } from '../Logo'
import { DAO_ADDRESS } from '@/util/constants'

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
  <Suspense
    fallback={
      <div className="p-3 my-2 bg-primary rounded-lg">
        <div className="animate-spin">
          <Logo height={40} width={40} />
        </div>
      </div>
    }
  >
    <InnerStakeComponent {...props} />
  </Suspense>
)
