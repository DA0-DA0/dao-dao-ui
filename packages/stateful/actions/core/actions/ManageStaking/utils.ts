import { ChainId } from '@dao-dao/types'

export const isManageStakingAllowedInGovContext = (chainId: string) =>
  chainId === ChainId.NeutronMainnet || chainId === ChainId.NeutronTestnet
