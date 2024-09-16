import { ActionComponent } from '@dao-dao/types/actions'

import { AddressInput } from '../../../../../components/AddressInput'
import { useGovernanceTokenInfo } from '../../hooks'
import { MintComponent as StatelessMintComponent } from './MintComponent'

export const Component: ActionComponent = (props) => {
  const { governanceToken } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govToken: governanceToken,
        AddressInput,
      }}
    />
  )
}
