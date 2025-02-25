import { SubDaosTab as StatelessSubDaosTab, useChain } from '@dao-dao/stateless'
import { getSupportedChainConfig } from '@dao-dao/utils'

import { useLoadingDaos } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { DaoCard } from '../dao/DaoCard'

export const GovSubDaosTab = () => {
  const { chainId } = useChain()

  const subDaos = useLoadingDaos({
    loading: false,
    data:
      getSupportedChainConfig(chainId)?.subDaos?.map((coreAddress) => ({
        chainId,
        coreAddress,
      })) ?? [],
  })

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      isMember={true}
      subDaos={
        subDaos.loading
          ? {
              loading: true,
              errored: false,
            }
          : {
              loading: false,
              errored: false,
              updating: subDaos.updating,
              data: subDaos.data.flatMap((subDao) => subDao || []),
            }
      }
    />
  )
}
