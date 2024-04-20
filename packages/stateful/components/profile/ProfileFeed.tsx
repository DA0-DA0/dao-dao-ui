import { ProfileFeed as StatelessProfileFeed } from '@dao-dao/stateless'

import { useFeed } from '../../feed'
import { LinkWrapper } from '../LinkWrapper'

export const ProfileFeed = () => {
  const feed = useFeed()

  return <StatelessProfileFeed LinkWrapper={LinkWrapper} state={feed} />
}
