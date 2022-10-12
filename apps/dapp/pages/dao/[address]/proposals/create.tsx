// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import {
  DaoPageWrapper,
  DaoPageWrapperProps,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import {
  BaseNewProposalProps,
  CwProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/proposal-module-adapter'
import { proposalDraftsAtom, useVotingModule } from '@dao-dao/state'
import { ProposalDraft, ProposalPrefill } from '@dao-dao/tstypes'
import {
  CreateProposal,
  Loader,
  Logo,
  ProfileDisconnectedCard,
  ProposalCreatedModal,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

import { ProfileNewProposalCard } from '@/components'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
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
  // Set once prefill has been assessed, indicating NewProposal can load now.
  const [prefillChecked, setPrefillChecked] = useState(false)

  const proposalModuleAdapterCommon = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        coreAddress: daoInfo.coreAddress,
        Loader,
        Logo,
      }),
    [daoInfo.coreAddress, selectedProposalModule]
  )

  const {
    fields: { defaultNewProposalForm, newProposalFormTitleKey },
    components: { NewProposal },
  } = proposalModuleAdapterCommon

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: defaultNewProposalForm,
  })

  const loadPrefill = useCallback(
    ({ id, data }: ProposalPrefill<any>) => {
      // Attempt to find proposal module to prefill and set if found.
      const matchingProposalModule = daoInfo.proposalModules.find(
        ({ contractName }) =>
          matchProposalModuleAdapter(contractName)?.id === id
      )

      if (matchingProposalModule) {
        setSelectedProposalModule(matchingProposalModule)
        formMethods.reset(data)
      }
    },
    [daoInfo.proposalModules, formMethods]
  )

  // Prefill form with data from parameter once ready.
  useEffect(() => {
    if (!router.isReady || prefillChecked) {
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
        loadPrefill(prefillData)
      }
      // If failed to parse, do nothing.
    } catch (error) {
      console.error(error)
    } finally {
      setPrefillChecked(true)
    }
  }, [
    router.query.prefill,
    router.isReady,
    daoInfo.proposalModules,
    formMethods,
    prefillChecked,
    loadPrefill,
  ])

  const [createdProposal, setCreatedProposal] =
    useState<Parameters<BaseNewProposalProps['onCreateSuccess']>[0]>()

  const [drafts, setDrafts] = useRecoilState(
    proposalDraftsAtom(daoInfo.coreAddress)
  )
  const [draftIndex, setDraftIndex] = useState<number>()
  const draft =
    draftIndex !== undefined && drafts.length > draftIndex
      ? drafts[draftIndex]
      : undefined
  const loadDraft = useCallback(
    (loadIndex: number) => {
      // Already saving to a selected draft or draft doesn't exist.
      if (draftIndex || loadIndex >= drafts.length) {
        return
      }

      const draft = drafts[loadIndex]
      if (!draft) {
        toast.error(t('error.loadingData'))
      }
      // Deep clone to prevent values from being readOnly.
      loadPrefill(cloneDeep(draft.proposal))
      setDraftIndex(loadIndex)
    },
    [draftIndex, drafts, loadPrefill, t]
  )
  const deleteDraft = useCallback(
    (deleteIndex: number) => {
      setDrafts((drafts) => drafts.filter((_, index) => index !== deleteIndex))
      setDraftIndex(undefined)
    },
    [setDrafts]
  )
  const unloadDraft = () => setDraftIndex(undefined)

  const proposalData = formMethods.watch()
  const proposalName = formMethods.watch(newProposalFormTitleKey)
  const saveDraft = useCallback(() => {
    // Already saving to a selected draft.
    if (draft) {
      return
    }

    const newDraft: ProposalDraft = {
      name: proposalName,
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      proposal: {
        id: proposalModuleAdapterCommon.id,
        data: proposalData,
      },
    }

    setDrafts([newDraft, ...drafts])
    setDraftIndex(0)
  }, [
    draft,
    drafts,
    proposalData,
    proposalModuleAdapterCommon.id,
    setDrafts,
    proposalName,
  ])

  // Debounce saving draft every 3 seconds.
  const [draftSaving, setDraftSaving] = useState(false)
  useEffect(() => {
    if (draftIndex === undefined) {
      return
    }

    // If created proposal, clear draft and don't update.
    if (createdProposal) {
      setDrafts((drafts) => drafts.filter((_, index) => index !== draftIndex))
      return
    }

    // Save after 3 seconds.
    setDraftSaving(true)
    const timeout = setTimeout(() => {
      setDrafts((drafts) =>
        drafts.map((savedDraft, index) =>
          index === draftIndex
            ? {
                ...savedDraft,
                name: proposalName,
                lastUpdatedAt: Date.now(),
                proposal: {
                  id: proposalModuleAdapterCommon.id,
                  // Deep clone to prevent values from becoming readOnly.
                  data: cloneDeep(proposalData),
                },
              }
            : savedDraft
        )
      )
      setDraftSaving(false)
    }, 3000)
    // Debounce.
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Instance changes every time, so compare stringified verison.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(proposalData),
    createdProposal,
    draftIndex,
    setDrafts,
    proposalName,
    proposalModuleAdapterCommon.id,
  ])

  return (
    <>
      <FormProvider {...formMethods}>
        <CreateProposal
          daoInfo={daoInfo}
          isMember={isMember}
          newProposal={
            prefillChecked ? (
              <NewProposal
                deleteDraft={deleteDraft}
                draft={draft}
                draftSaving={draftSaving}
                drafts={drafts}
                loadDraft={loadDraft}
                onCreateSuccess={setCreatedProposal}
                saveDraft={saveDraft}
                unloadDraft={unloadDraft}
              />
            ) : (
              <Loader />
            )
          }
          proposalModule={selectedProposalModule}
          rightSidebarContent={
            connected ? (
              <ProfileNewProposalCard
                proposalModuleAdapterCommon={proposalModuleAdapterCommon}
              />
            ) : (
              <ProfileDisconnectedCard />
            )
          }
          setProposalModule={setSelectedProposalModule}
        />
      </FormProvider>

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
    <InnerProposalCreate />
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
