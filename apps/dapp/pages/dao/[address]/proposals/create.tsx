// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import {
  DaoPageWrapper,
  DaoPageWrapperProps,
  SuspenseLoader,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import {
  BaseNewProposalProps,
  CwProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { useVotingModule } from '@dao-dao/state'
import { ProposalPrefill } from '@dao-dao/tstypes'
import {
  CreateProposal,
  Loader,
  Logo,
  PageLoader,
  ProfileDisconnectedCard,
  ProposalCreatedModal,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

import { ProfileNewProposalCard } from '@/components'

const InnerProposalCreate = () => {
  const router = useRouter()
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })
  const { connected } = useWallet()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module or first otherwise.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        CwProposalSingleAdapter.id
    ) ?? daoInfo.proposalModules[0]
  )
  const [prefill, setPrefill] = useState<any>(undefined)
  // Set once prefill has been assessed, indicating NewProposal can load now.
  const [prefillChecked, setPrefillChecked] = useState(false)

  const SelectedNewProposal = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        coreAddress: daoInfo.coreAddress,
        Loader,
        Logo,
      }).components.NewProposal,
    [daoInfo.coreAddress, selectedProposalModule]
  )

  // Prefill form with data from parameter once ready.
  useEffect(() => {
    if (!router.isReady) {
      return
    }

    try {
      const potentialDefaultValue = router.query.prefill
      if (typeof potentialDefaultValue !== 'string') {
        return
      }

      const prefillData = JSON.parse(potentialDefaultValue)
      if (
        prefillData.constructor.name === 'Object' &&
        'id' in prefillData &&
        'data' in prefillData
      ) {
        const { id, data } = prefillData as ProposalPrefill<any>

        // Attempt to find proposal module to prefill and set if found.
        const matchingProposalModule = daoInfo.proposalModules.find(
          ({ contractName }) =>
            matchProposalModuleAdapter(contractName)?.id === id
        )

        if (matchingProposalModule) {
          setSelectedProposalModule(matchingProposalModule)
          setPrefill(data)
        }
      }
      // If failed to parse, do nothing.
    } catch (error) {
      console.error(error)
    } finally {
      setPrefillChecked(true)
    }
  }, [router.query.prefill, router.isReady, daoInfo.proposalModules])

  const [createdProposal, setCreatedProposal] =
    useState<Parameters<BaseNewProposalProps['onCreateSuccess']>[0]>()

  return (
    <>
      <CreateProposal
        daoInfo={daoInfo}
        isMember={isMember}
        newProposal={
          prefillChecked ? (
            <SelectedNewProposal
              onCreateSuccess={setCreatedProposal}
              prefill={prefill}
            />
          ) : (
            <Loader />
          )
        }
        proposalModule={selectedProposalModule}
        rightSidebarContent={
          connected ? (
            <ProfileNewProposalCard proposalModule={selectedProposalModule} />
          ) : (
            <ProfileDisconnectedCard />
          )
        }
        setProposalModule={setSelectedProposalModule}
      />

      {createdProposal && (
        <ProposalCreatedModal
          itemProps={{
            dao: {
              coreAddress: daoInfo.coreAddress,
              imageUrl: daoInfo.imageUrl,
            },
            ...createdProposal,
          }}
          modalProps={{
            onClose: () => setCreatedProposal(undefined),
          }}
        />
      )}
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
