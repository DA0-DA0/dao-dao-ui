import cloneDeep from 'lodash.clonedeep'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  ProposalModuleSelector,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  DaoTabId,
  ProposalDraft,
  ProposalModule,
  ProposalPrefill,
} from '@dao-dao/types'
import {
  ContractName,
  DaoProposalSingleAdapterId,
  SITE_URL,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  ProposalModuleAdapterCommonProvider,
  matchAdapter as matchProposalModuleAdapter,
} from '../../proposal-module-adapter'
import { useProposalModuleAdapterCommonContext } from '../../proposal-module-adapter/react/context'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { ProposalDaoInfoCards } from './ProposalDaoInfoCards'

export const CreateDaoProposal = () => {
  const daoInfo = useDaoInfoContext()
  const [selectedProposalModule, setSelectedProposalModule] = useState(() => {
    // Ignore proposals with an approver pre-propose since those are
    // automatically managed by a pre-propose-approval contract in another DAO.
    const validProposalModules = daoInfo.proposalModules.filter(
      ({ prePropose }) =>
        prePropose?.contractName !== ContractName.PreProposeApprover
    )

    // Default to single choice proposal module or first otherwise.
    return (
      validProposalModules.find(
        ({ contractName }) =>
          // Default to single choice proposal module.
          matchProposalModuleAdapter(contractName)?.id ===
          DaoProposalSingleAdapterId
      ) ?? validProposalModules[0]
    )
  })

  return (
    <ProposalModuleAdapterCommonProvider
      coreAddress={daoInfo.coreAddress}
      proposalModule={selectedProposalModule}
    >
      <InnerCreateDaoProposal
        selectedProposalModule={selectedProposalModule}
        setSelectedProposalModule={setSelectedProposalModule}
      />
    </ProposalModuleAdapterCommonProvider>
  )
}

type InnerCreateDaoProposalProps = {
  selectedProposalModule: ProposalModule
  setSelectedProposalModule: Dispatch<SetStateAction<ProposalModule>>
}

const InnerCreateDaoProposal = ({
  selectedProposalModule,
  setSelectedProposalModule,
}: InnerCreateDaoProposalProps) => {
  const { t } = useTranslation()
  const { goToDaoProposal, router, getDaoProposalPath } = useDaoNavHelpers()
  const daoInfo = useDaoInfoContext()

  // Set once prefill has been assessed, indicating NewProposal can load now.
  const [prefillChecked, setPrefillChecked] = useState(false)

  const {
    id: proposalModuleAdapterCommonId,
    common: {
      fields: { makeDefaultNewProposalForm, newProposalFormTitleKey },
      components: { NewProposal },
    },
  } = useProposalModuleAdapterCommonContext()

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

  // Reset form to defaults and clear latest proposal save.
  const clear = useCallback(() => {
    formMethods.reset(makeDefaultNewProposalForm())
    setLatestProposalSave({})
  }, [formMethods, makeDefaultNewProposalForm, setLatestProposalSave])

  const [proposalCreatedCardProps, setProposalCreatedCardProps] =
    useRecoilState(proposalCreatedCardPropsAtom)

  const proposalData = formMethods.watch()

  const saveQueuedRef = useRef(false)
  const saveLatestProposalRef = useRef(() => {})
  saveLatestProposalRef.current = () =>
    setLatestProposalSave(
      // If created proposal, clear latest proposal save.
      proposalCreatedCardProps ? {} : cloneDeep(proposalData)
    )

  // Save latest data to atom and thus localStorage every second.
  useEffect(() => {
    // If created proposal, don't save.
    if (proposalCreatedCardProps) {
      return
    }

    // Queue save in 1 second if not already queued.
    if (saveQueuedRef.current) {
      return
    }
    saveQueuedRef.current = true

    // Save in one second.
    setTimeout(() => {
      saveLatestProposalRef.current()
      saveQueuedRef.current = false
    }, 1000)
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
    [daoInfo.proposalModules, formMethods, setSelectedProposalModule]
  )

  // Prefill form with data from parameter once ready.
  useEffect(() => {
    if (!router.isReady || prefillChecked) {
      return
    }

    const potentialDefaultValue = router.query.prefill
    if (typeof potentialDefaultValue !== 'string' || !potentialDefaultValue) {
      setPrefillChecked(true)
      return
    }

    // Try to parse as JSON.
    let prefillData
    try {
      prefillData = JSON.parse(potentialDefaultValue)
    } catch (error) {
      console.error(error)
    }

    // Try to parse as base64.
    if (!prefillData) {
      try {
        prefillData = decodeJsonFromBase64(potentialDefaultValue)
      } catch (error) {
        console.error(error)
      }
    }

    // If prefillData looks valid, use it.
    if (
      objectMatchesStructure(prefillData, {
        id: {},
        data: {},
      })
    ) {
      loadPrefill(prefillData)
    }

    setPrefillChecked(true)
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
        id: proposalModuleAdapterCommonId,
        data: proposalData,
      },
    }

    setDrafts([newDraft, ...drafts])
    setDraftIndex(0)
  }, [
    draft,
    drafts,
    proposalData,
    proposalModuleAdapterCommonId,
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
                  id: proposalModuleAdapterCommonId,
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
    proposalModuleAdapterCommonId,
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
      goToDaoProposal(info.dao.coreAddressOrId, info.id)
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

  const copyDraftLink = () => {
    navigator.clipboard.writeText(
      SITE_URL +
        getDaoProposalPath(daoInfo.coreAddress, 'create', {
          prefill: encodeJsonToBase64({
            id: proposalModuleAdapterCommonId,
            data: proposalData,
          }),
        })
    )
    toast.success(t('info.copiedLinkToClipboard'))
  }

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          homeTab: {
            id: DaoTabId.Proposals,
            sdaLabel: t('title.proposals'),
          },
          current: t('title.createProposal'),
        }}
      />

      <FormProvider {...formMethods}>
        <CreateProposal
          clear={clear}
          copyDraftLink={copyDraftLink}
          newProposal={
            <SuspenseLoader
              fallback={<PageLoader />}
              forceFallback={!prefillChecked}
            >
              <NewProposal
                ProposalDaoInfoCards={ProposalDaoInfoCards}
                deleteDraft={deleteDraft}
                draft={draft}
                draftSaving={draftSaving}
                drafts={drafts}
                loadDraft={loadDraft}
                onCreateSuccess={onCreateSuccess}
                proposalModuleSelector={
                  <ProposalModuleSelector
                    className="my-2"
                    matchAdapter={matchProposalModuleAdapter}
                    selected={selectedProposalModule.address}
                    setSelected={setSelectedProposalModule}
                  />
                }
                saveDraft={saveDraft}
                unloadDraft={unloadDraft}
              />
            </SuspenseLoader>
          }
        />
      </FormProvider>
    </>
  )
}
