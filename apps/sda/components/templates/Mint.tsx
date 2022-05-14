import { useGovernanceTokenInfo } from '@dao-dao/state'
import {
  MintComponent as StatelessMintComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { SuspenseLoader } from '..'
import { DAO_ADDRESS } from '@/util'

const InnerMintComponent: TemplateComponent = (props) => {
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)

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
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerMintComponent {...props} />
  </SuspenseLoader>
)
