import { LinkIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { Apr } from '@dao-dao/icons'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { useApr } from '@/hooks'
import { VOTE_EXTERNAL_URL } from '@/util'

import { Loader } from '../Loader'
import { Logo } from '../Logo'
import { VoteHeroHeader } from './VoteHeroHeader'

export const VoteHeroContentLoader = () => {
  const { t } = useTranslation()
  const {
    components: { VoteHeroStats },
  } = useVotingModuleAdapter()

  return (
    <>
      <VoteHeroHeader image={<Loader size="100%" />} />
      <VoteHeroStats
        additionalStats={[
          {
            Icon: Apr,
            title: t('title.apr') + ':',
            value: undefined,
          },
          ...(VOTE_EXTERNAL_URL
            ? [
                {
                  link: true,
                  Icon: LinkIcon,
                  title: 'junoswap.com',
                  value: VOTE_EXTERNAL_URL,
                },
              ]
            : []),
        ]}
      />
    </>
  )
}

export const VoteHeroContent = () => {
  const { t } = useTranslation()
  const { name, description } = useDaoInfoContext()

  const {
    components: { VoteHeroStats },
  } = useVotingModuleAdapter()

  const apr = useApr()
  if (apr === undefined) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <>
      <VoteHeroHeader
        description={description}
        image={<Logo className="w-full h-full" />}
        title={name}
      />
      <VoteHeroStats
        additionalStats={[
          {
            Icon: Apr,
            title: t('title.apr') + ':',
            value: (apr * 100).toLocaleString() + '%',
          },
          ...(VOTE_EXTERNAL_URL
            ? [
                {
                  link: true,
                  Icon: LinkIcon,
                  title: 'junoswap.com',
                  value: VOTE_EXTERNAL_URL,
                },
              ]
            : []),
        ]}
      />
    </>
  )
}
