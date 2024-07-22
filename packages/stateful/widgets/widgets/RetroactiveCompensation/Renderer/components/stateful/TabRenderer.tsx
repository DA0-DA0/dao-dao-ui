import { ButtonLink } from '../../../../../../components'
import { useMembership } from '../../../../../../hooks'
import { PagePath } from '../../types'
import { TabRenderer as StatelessTabRenderer } from '../stateless/TabRenderer'
import { CreateSurvey } from './pages/CreateSurvey'
import { Home } from './pages/Home'
import { Submit } from './pages/Submit'

export const TabRenderer = () => {
  const { isMember = false } = useMembership()

  return (
    <StatelessTabRenderer
      ButtonLink={ButtonLink}
      isMember={isMember}
      pages={{
        [PagePath.Home]: Home,
        [PagePath.Create]: CreateSurvey,
        [PagePath.Submit]: Submit,
      }}
    />
  )
}
