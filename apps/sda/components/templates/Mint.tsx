import { Suspense } from 'react'

import {
  MintComponent as StatelessMintComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { useGovernanceTokenInfo } from '@/hooks'

const InnerMintComponent: TemplateComponent = (props) => {
  const { governanceTokenInfo } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govTokenSymbol: governanceTokenInfo?.symbol ?? 'gov tokens',
      }}
    />
  )
}

export const MintComponent: TemplateComponent = (props) => (
  <Suspense fallback={<TemplateComponentLoader />}>
    <InnerMintComponent {...props} />
  </Suspense>
)
