import { useGovernanceTokenInfo } from '@dao-dao/state'
import {
  MintComponent as StatelessMintComponent,
  TemplateComponent,
  TemplateComponentLoader,
} from '@dao-dao/ui/components/templates'

import { useOrgInfoContext } from '../OrgPageWrapper'
import { SuspenseLoader } from '../SuspenseLoader'

const InnerMintComponent: TemplateComponent = (props) => {
  const { coreAddress } = useOrgInfoContext()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)

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
