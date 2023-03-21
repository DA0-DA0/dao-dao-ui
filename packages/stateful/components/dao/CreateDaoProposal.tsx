import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  latestProposalSaveAtom,
  proposalCreatedCardPropsAtom,
  proposalDraftsAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import {
  CreateProposal,
  PageLoader,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  ProposalDraft,
  ProposalPrefill,
} from '@dao-dao/types'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import {
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '../../proposal-module-adapter'
import { ProfileDisconnectedCard, ProfileNewProposalCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'

export const CreateDaoProposal = () => {
  const { t } = useTranslation()
  const { goToDaoProposal, router } = useNavHelpers()
  const daoInfo = useDaoInfoContext()
  const { connected } = useWallet()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module or first otherwise.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        DaoProposalSingleAdapterId
    ) ?? daoInfo.proposalModules[0]
  )
  // Set once prefill has been assessed, indicating NewProposal can load now.
  const [prefillChecked, setPrefillChecked] = useState(false)

  const proposalModuleAdapterCommon = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        chainId: daoInfo.chainId,
        coreAddress: daoInfo.coreAddress,
      }),
    [daoInfo.chainId, daoInfo.coreAddress, selectedProposalModule]
  )

  const {
    fields: { makeDefaultNewProposalForm, newProposalFormTitleKey },
    components: { NewProposal },
  } = proposalModuleAdapterCommon

  const [latestProposalSave, setLatestProposalSave] = useRecoilState(
    latestProposalSaveAtom(daoInfo.coreAddress)
  )
  const formMethods = useForm({
    mode: 'onChange',
    // Don't clone every render.
    defaultValues: useMemo(
      () => ({
        ...makeDefaultNewProposalForm(),
        ...cloneDeep(latestProposalSave),
      }),
      [latestProposalSave, makeDefaultNewProposalForm]
    ),
  })

  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  const proposalData = formMethods.watch()
  // Save latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // If created proposal, don't save.
    if (proposalCreatedCardProps) {
      return
    }

    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(
      () => setLatestProposalSave(cloneDeep(proposalData)),
      10000
    )
    return () => clearTimeout(timeout)
  }, [proposalCreatedCardProps, setLatestProposalSave, proposalData])

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
    draftIndex,
    setDrafts,
    proposalName,
    proposalModuleAdapterCommon.id,
  ])

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const onCreateSuccess: BaseNewProposalProps['onCreateSuccess'] = useCallback(
    (info) => {
      // Show modal.
      setProposalCreatedCardProps(info)

      // Delete draft.
      if (draftIndex !== undefined) {
        deleteDraft(draftIndex)
      }

      // Refresh proposals state.
      refreshProposals()

      // Clear saved form data.
      setLatestProposalSave({})

      // Navigate to proposal (underneath the creation modal).
      goToDaoProposal(info.dao.coreAddress, info.id)
    },
    [
      deleteDraft,
      draftIndex,
      goToDaoProposal,
      refreshProposals,
      setLatestProposalSave,
      setProposalCreatedCardProps,
    ]
  )

  return (
    <FormProvider {...formMethods}>
      <CreateProposal
        daoInfo={daoInfo}
        matchAdapter={matchProposalModuleAdapter}
        newProposal={
          <SuspenseLoader
            fallback={<PageLoader />}
            forceFallback={!prefillChecked}
          >
            <NewProposal
              deleteDraft={deleteDraft}
              draft={draft}
              draftSaving={draftSaving}
              drafts={drafts}
              loadDraft={loadDraft}
              onCreateSuccess={onCreateSuccess}
              saveDraft={saveDraft}
              unloadDraft={unloadDraft}
            />
          </SuspenseLoader>
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
  )
}
