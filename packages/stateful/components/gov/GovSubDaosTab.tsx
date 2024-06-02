import {
  DaoCardLoader,
  GridCardContainer,
  SubDaosTab as StatelessSubDaosTab,
  useChain,
} from '@dao-dao/stateless'
import { getSupportedChainConfig } from '@dao-dao/utils'

import { GovActionsProvider } from '../../actions'
import { useLoadingDaos } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { DaoCard } from '../dao/DaoCard'

export const GovSubDaosTab = () => {
  const { chain_id: chainId } = useChain()

  const subDaos = useLoadingDaos({
    loading: false,
    data:
      getSupportedChainConfig(chainId)?.subDaos?.map((coreAddress) => ({
        chainId,
        coreAddress,
      })) ?? [],
  })

  return (
    <GovActionsProvider
      loader={
        <GridCardContainer>
          {[...Array(3)].map((_, index) => (
            <DaoCardLoader key={index} />
          ))}
        </GridCardContainer>
      }
    >
      <StatelessSubDaosTab
        ButtonLink={ButtonLink}
        DaoCard={DaoCard}
        hideCreateButton
        isMember={false}
        subDaos={
          subDaos.loading
            ? subDaos
            : {
                loading: false,
                updating: subDaos.updating,
                data: subDaos.data.flatMap((subDao) => subDao || []),
              }
        }
      />
    </GovActionsProvider>
  )
}
