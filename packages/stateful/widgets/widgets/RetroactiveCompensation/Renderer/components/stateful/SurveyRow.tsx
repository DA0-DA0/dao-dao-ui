import { LinkWrapper } from '../../../../../../components'
import { useMembership, useWallet } from '../../../../../../hooks'
import { StatefulSurveyRowProps } from '../../types'
import { SurveyRow as StatelessSurveyRow } from '../stateless/SurveyRow'

export const SurveyRow = ({ survey }: StatefulSurveyRowProps) => {
  const { isWalletConnected } = useWallet()

  // Voting power at time of survey creation, which determines what access level
  // this wallet has.
  const { isMember = false } = useMembership({
    blockHeight: survey.survey.createdAtBlockHeight,
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
