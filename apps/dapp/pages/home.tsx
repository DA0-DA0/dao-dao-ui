import { HeartIcon, PlusIcon, SparklesIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Button, Loader, LoadingScreen, SuspenseLoader } from '@dao-dao/ui'

import {
  FeaturedCard,
  PinnedDAOCard,
  PinnedProposalsList,
  SmallScreenNav,
} from '@/components'
import { usePinnedDAOs } from '@/hooks'
import { featuredDaos } from '@/util'

const InnerHome: FC = () => {
  const { t } = useTranslation()
  const { pinnedAddresses } = usePinnedDAOs()

  return (
    <>
      <SmallScreenNav />

      <div className="gap-y-6 px-4 md:py-6 md:px-6">
        <SuspenseLoader fallback={<Loader />}>
          <PinnedProposalsList />
        </SuspenseLoader>

        {pinnedAddresses.length > 0 && (
          <div>
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <HeartIcon className="inline w-4" />
                {t('info.favorited')}
              </div>
              <Link href="/dao/create" passHref>
                <Button size="sm">
                  <PlusIcon className="w-4 h-4" /> {t('button.create')}
                </Button>
              </Link>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
              {pinnedAddresses.map((address) => (
                <PinnedDAOCard key={address} address={address} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
            <div className="flex gap-1 items-center">
              <SparklesIcon className="inline w-4 " />
              {t('info.featured')}
            </div>
            {/* Show create button here if no pinned DAOs. */}
            {pinnedAddresses.length === 0 && (
              <Link href="/dao/create" passHref>
                <Button size="sm">
                  <PlusIcon className="w-4 h-4" /> {t('button.create')}
                </Button>
              </Link>
            )}
          </h2>

          <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
            {featuredDaos.map((props) => (
              <FeaturedCard {...props} key={props.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const HomePage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerHome />
  </SuspenseLoader>
)

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
