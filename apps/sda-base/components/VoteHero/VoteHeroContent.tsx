import { useDaoInfoContext } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { VoteHeroHeader } from './VoteHeroHeader'

export const VoteHeroContentLoader = () => {
  const {
    components: { VoteHeroStats },
  } = useVotingModuleAdapter()

  return (
    <>
      <VoteHeroHeader image={<Loader size="100%" />} />
      <VoteHeroStats loader />
    </>
  )
}

export const VoteHeroContent = () => {
  const { name, description } = useDaoInfoContext()

  const {
    components: { VoteHeroStats },
  } = useVotingModuleAdapter()

  return (
    <>
      <VoteHeroHeader
        description={description}
        image={<Logo className="h-full w-full" />}
        title={name}
      />
      <VoteHeroStats />
    </>
  )
}
