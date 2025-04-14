import { useDao } from '@dao-dao/stateless'

import { LinkWrapper } from '../../../../../../components'
import {
  useMembership,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../hooks'
import { retroactiveCompensationQueries } from '../../queries'
import { StatefulSurveyRowProps } from '../../types'
import { SurveyRow as StatelessSurveyRow } from '../stateless/SurveyRow'

export const SurveyRow = ({
  survey: fallbackSurvey,
}: StatefulSurveyRowProps) => {
  const { isWalletConnected, hexPublicKey } = useWallet({
    loadAccount: true,
  })
  const dao = useDao()

  // Load survey from query in case list is out of date.
  const loadingSurvey = useQueryLoadingDataWithError(
    retroactiveCompensationQueries.survey({
      daoAddress: dao.coreAddress,
      walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
      uuid: fallbackSurvey.survey.uuid,
    })
  )

  const survey =
    loadingSurvey.loading || loadingSurvey.errored
      ? fallbackSurvey
      : loadingSurvey.data

  // Voting power at time of survey creation, which determines what access level
  // this wallet has.
  const { isMember = false } = useMembership({
    blockHeight: fallbackSurvey.survey.createdAtBlockHeight,
  })

  return (
    <StatelessSurveyRow
      LinkWrapper={LinkWrapper}
      connected={isWalletConnected}
      isMember={isMember}
      survey={survey}
    />
  )
}
