import { InformationCircleIcon } from '@heroicons/react/outline'
import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  ConnectWalletButton,
  DaoPageWrapper,
  DaoPageWrapperProps,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { refreshProposalsIdAtom, useVotingModule } from '@dao-dao/state'
import {
  Breadcrumbs,
  CopyToClipboard,
  InputThemedText,
  Loader,
  Logo,
  PageLoader,
  SuspenseLoader,
  Tooltip,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { SmallScreenNav } from '@/components'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name, proposalModules } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })
  const {
    components: { ProposalModuleAddresses },
  } = useVotingModuleAdapter()

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

  const [selectedProposalModuleIndex, setSelectedProposalModuleIndex] =
    useState(0)
  const selectedProposalModule = proposalModules[selectedProposalModuleIndex]

  const selectedProposalModuleCommon = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        coreAddress,
        Logo,
        Loader,
      }),
    [coreAddress, selectedProposalModule]
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

          {proposalModules.length > 1 ? (
            <select
              className="py-2 px-3 mb-2 text-body bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition"
              onChange={({ target: { value } }) =>
                setSelectedProposalModuleIndex(Number(value))
              }
              value={selectedProposalModuleIndex}
            >
              {proposalModules.map(({ address, contractName }, index) => (
                <option key={address} value={index}>
                  {t(
                    `proposalModuleLabel.${
                      contractName.split(':').slice(-1)[0]
                    }`
                  )}{' '}
                  {t('title.proposals', { count: 1 })}
                </option>
              ))}
            </select>
          ) : (
            <Tooltip label={t('info.proposalModuleCreationTooltip')}>
              <div>
                <InputThemedText className="inline-flex flex-row gap-2 items-center px-3 mb-2">
                  <span>
                    {t(
                      `proposalModuleLabel.${
                        selectedProposalModule.contractName
                          .split(':')
                          .slice(-1)[0]
                      }`
                    )}{' '}
                    {t('title.proposals', { count: 1 })}
                  </span>

                  <InformationCircleIcon className="shrink-0 w-4 h-4 text-disabled cursor-help" />
                </InputThemedText>
              </div>
            </Tooltip>
          )}

          {selectedProposalModuleCommon && (
            <SuspenseLoader fallback={<Loader />}>
              <selectedProposalModuleCommon.components.CreateProposalForm
                ConnectWalletButton={ConnectWalletButton}
                connected={connected}
                onCreateSuccess={onCreateSuccess}
                walletAddress={walletAddress}
              />
            </SuspenseLoader>
          )}
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

            <ProposalModuleAddresses />
          </div>

          {selectedProposalModuleCommon && (
            <>
              <h2 className="mb-4 font-medium text-medium">
                {t('title.proposalInfo')}
              </h2>
              <selectedProposalModuleCommon.components.ProposalModuleInfo className="md:flex-col md:items-stretch md:p-0 md:border-0" />
            </>
          )}
        </div>
      </div>
    </>
  )
}

const ProposalCreatePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      <InnerProposalCreate />
    </SuspenseLoader>
  </DaoPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  getProps: ({ t, coreAddress }) => ({
    url: `${SITE_URL}/dao/${coreAddress}/proposals/create`,
    followingTitle: t('title.createAProposal'),
  }),
})
