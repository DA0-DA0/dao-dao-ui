import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { ConnectWalletButton } from '@dao-dao/common'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { refreshProposalsIdAtom, useVotingModule } from '@dao-dao/state'
import {
  Breadcrumbs,
  CopyToClipboard,
  Loader,
  Logo,
  PageLoader,
  SuspenseLoader,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  DAOPageWrapper,
  DAOPageWrapperProps,
  SmallScreenNav,
  useDAOInfoContext,
} from '@/components'
import { makeGetDAOStaticProps } from '@/server/makeGetDAOStaticProps'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name, proposalModules } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })
  const {
    components: { ProposalCreateAddresses },
  } = useVotingModuleAdapter()

  const {
    components: { ProposalCreateInfo, CreateProposalForm },
  } = useMemo(
    // TODO: Make a switcher and pick which proposal module to use.
    () =>
      matchAndLoadCommon(proposalModules[0], {
        coreAddress,
        Logo,
        Loader,
      }),
    [coreAddress, proposalModules]
  )

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const onCreateSuccess = useCallback(
    (proposalId: string) => {
      refreshProposals()
      router.push(`/dao/${coreAddress}/proposals/${proposalId}`)
    },
    [coreAddress, refreshProposals, router]
  )

  return (
    <>
      <SmallScreenNav />

      <div className="flex flex-col gap-14 justify-center p-6 md:flex-row md:gap-8">
        <div className="md:w-2/3">
          <Breadcrumbs
            className="mb-6"
            crumbs={[
              ['/home', t('title.home')],
              [`/dao/${coreAddress}`, name],
              [router.asPath, t('title.createAProposal')],
            ]}
          />

          <h2 className="mb-6 font-medium lg:hidden">
            {t('title.createAProposal')}
          </h2>

          {!isMember && (
            <p className="-mt-4 mb-6 text-error caption-text">
              {t('error.mustBeMemberToCreateProposal')}
            </p>
          )}

          <SuspenseLoader fallback={<Loader />}>
            <CreateProposalForm
              ConnectWalletButton={ConnectWalletButton}
              connected={connected}
              onCreateSuccess={onCreateSuccess}
              walletAddress={walletAddress}
            />
          </SuspenseLoader>
        </div>

        <div className="flex-1">
          <h2 className="mb-4 font-medium text-medium">
            {t('title.addresses')}
          </h2>

          <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center mb-8">
            <p className="font-mono text-sm text-tertiary">
              {t('info.daoAddress')}
            </p>
            <div className="col-span-2">
              <CopyToClipboard value={coreAddress} />
            </div>

            <ProposalCreateAddresses />
          </div>

          <h2 className="mb-4 font-medium text-medium">
            {t('title.proposalInfo')}
          </h2>
          <ProposalCreateInfo className="md:flex-col md:items-stretch md:p-0 md:border-0" />
        </div>
      </div>
    </>
  )
}

const ProposalCreatePage: NextPage<DAOPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DAOPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      <InnerProposalCreate />
    </SuspenseLoader>
  </DAOPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDAOStaticProps(({ t }) => ({
  followingTitle: t('title.createAProposal'),
}))
