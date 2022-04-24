import { Suspense } from 'react'

import {
  MintComponent as StatelessMintComponent,
  TemplateComponent,
} from '@dao-dao/ui/components/templates'

import { Logo } from '../Logo'
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
  <Suspense
    fallback={
      <div className="p-3 my-2 bg-primary rounded-lg">
        <div className="animate-spin">
          <Logo height={40} width={40} />
        </div>
      </div>
    }
  >
    <InnerMintComponent {...props} />
  </Suspense>
)
