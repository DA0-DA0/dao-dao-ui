import { useQueryClient } from '@tanstack/react-query'

import { useDao } from '@dao-dao/stateless'

import { IconButtonLink } from '../../../../../../../components'
import {
  useMembership,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../../hooks'
import { retroactiveCompensationQueries } from '../../../queries'
import { Home as StatelessHome } from '../../stateless/pages/Home'
import { SurveyRow } from '../SurveyRow'

export const Home = () => {
  const dao = useDao()
  const { hexPublicKey } = useWallet({
    loadAccount: true,
  })
  const { isMember = false } = useMembership()
  const queryClient = useQueryClient()

  const loadingSurveys = useQueryLoadingDataWithError(
    retroactiveCompensationQueries.listSurveys(queryClient, {
      daoAddress: dao.coreAddress,
      walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
    })
  )

  return (
    <StatelessHome
      IconButtonLink={IconButtonLink}
      SurveyRow={SurveyRow}
      isMember={isMember}
      loadingSurveys={loadingSurveys}
    />
  )
}
