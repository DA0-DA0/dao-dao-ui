import { ProfileDisplayProps } from '@dao-dao/types'

import { ProfileDisplay } from '../../../../../components'
import { Identity } from '../../types'

export interface IdentityProfileDisplayProps
  extends Omit<
    ProfileDisplayProps,
    'address' | 'hexPublicKey' | 'loadingProfile'
  > {
  identity: Identity
}

export const IdentityProfileDisplay = ({
  identity: { address, publicKey },
  ...props
}: IdentityProfileDisplayProps) => (
  <ProfileDisplay address={address} hexPublicKey={publicKey} {...props} />
)
