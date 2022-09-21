// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'

import {
  DaoPageWrapper,
  DaoPageWrapperProps,
  SuspenseLoader,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import {
  CwProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { useVotingModule } from '@dao-dao/state'
import { CreateProposal, Loader, Logo, PageLoader } from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

import { ProfileNewProposalCard } from '@/components'
import { useRouter } from 'next/router'

const InnerProposalCreate = () => {
  const router = useRouter()
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

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
    const potentialDefaultValue = router.query.prefill
    if (!router.isReady || typeof potentialDefaultValue !== 'string') {
      return
    }

    try {
      const data = JSON.parse(potentialDefaultValue)
      if (
        data.constructor.name === 'Object' &&
        'proposalModuleAddress' in data &&
        'data' in data
      ) {
        // Attempt to find proposal module to prefill and set if found.
        const matchingProposalModule = daoInfo.proposalModules.find(
          ({ address }) => data.proposalModuleAddress === address
        )
        if (matchingProposalModule) {
          setSelectedProposalModule(matchingProposalModule)
          setPrefill(data.data)
        }
      }
      // If failed to parse, do nothing.
    } catch {}

    setPrefillChecked(true)
  }, [router.query.prefill, router.isReady])

  return (
    <CreateProposal
      daoInfo={daoInfo}
      isMember={isMember}
      newProposal={
        prefillChecked ? (
          // TODO: Display proposal created card or navigate on success.
          <SelectedNewProposal
            onCreateSuccess={(proposalId) => alert(proposalId)}
            prefill={prefill}
          />
        ) : (
          <Loader />
        )
      }
      proposalModule={selectedProposalModule}
      rightSidebarContent={
        <ProfileNewProposalCard proposalModule={selectedProposalModule} />
      }
      setProposalModule={setSelectedProposalModule}
    />
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
