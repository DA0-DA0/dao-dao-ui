// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { SignMode } from 'interchain-rpc/main/codegen/cosmos/tx/signing/v1beta1/signing'
import { SimulateRequest } from 'interchain-rpc/main/codegen/cosmos/tx/v1beta1/service'
import {
  AuthInfo,
  Fee,
  Tx,
  TxBody,
} from 'interchain-rpc/main/codegen/cosmos/tx/v1beta1/tx'
import cloneDeep from 'lodash.clonedeep'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  cosmosRpcClientForChainSelector,
  proposalCreatedCardPropsAtom,
  proposalDraftsAtom,
  refreshProposalsIdAtom,
  useVotingModule,
} from '@dao-dao/state'
import {
  DaoPageWrapper,
  DaoPageWrapperProps,
  SuspenseLoader,
} from '@dao-dao/stateful'
import {
  CwdProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '@dao-dao/stateful/proposal-module-adapter'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import {
  CreateProposal,
  Loader,
  Logo,
  PageLoader,
  ProfileDisconnectedCard,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  CosmosMsgFor_Empty,
  ProposalDraft,
  ProposalPrefill,
} from '@dao-dao/types'
import { SITE_URL, cwMsgToEncodeObject } from '@dao-dao/utils'

import { ProfileNewProposalCard } from '@/components'

// TODO(v2): Save latest proposal to localStorage, separate from drafts.
// TODO(v2): Fix errors getting stuck when removing components with errors (I
// think this is when it happens). Can't click preview or submit sometimes even
// tho there are no visible errors.
const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })
  const { connected, status, signingCosmWasmClient } = useWallet()

  const [selectedProposalModule, setSelectedProposalModule] = useState(
    // Default to single choice proposal module or first otherwise.
    daoInfo.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        CwdProposalSingleAdapter.id
    ) ?? daoInfo.proposalModules[0]
  )
  // Set once prefill has been assessed, indicating NewProposal can load now.
  const [prefillChecked, setPrefillChecked] = useState(false)

  const proposalModuleAdapterCommon = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        chainId: daoInfo.chainId,
        coreAddress: daoInfo.coreAddress,
        Loader,
        Logo,
      }),
    [daoInfo.chainId, daoInfo.coreAddress, selectedProposalModule]
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

  const setProposalCreatedCardProps = useSetRecoilState(
    proposalCreatedCardPropsAtom
  )

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

      // Navigate to proposal (underneath the creation modal).
      router.push(`/dao/${info.dao.coreAddress}/proposals/${info.id}`)
    },
    [
      deleteDraft,
      draftIndex,
      refreshProposals,
      router,
      setProposalCreatedCardProps,
    ]
  )

  const cosmosRpcClient = useRecoilValue(
    cosmosRpcClientForChainSelector(daoInfo.chainId)
  )
  // Simulate executing Cosmos messages on-chain to check errors before a
  // proposal is created. We can't just use the simulate function on
  // SigningCosmWasmClient or SigningStargateClient because they include signer
  // info from the wallet. We want to simulate these messages coming from the
  // DAO, so we don't want wallet signing info included. Those simulate
  // functions internally call this function:
  // https://github.com/cosmos/cosmjs/blob/2c3b27eeb3622a6108086267ba6faf3984251be3/packages/stargate/src/modules/tx/queries.ts#L47
  // We can copy this simulate function and leave out the wallet-specific fields
  // (i.e. sequence) and unnecessary fields (i.e. publicKey, memo) to simulate
  // these messages from the DAO core address.
  const simulateMsgs = useCallback(
    async (msgs: CosmosMsgFor_Empty[]): Promise<void> => {
      // Need signing client to access protobuf type registry.
      if (!signingCosmWasmClient) {
        throw new Error(t('error.connectWalletToContinue'))
      }

      const encodeObjects = msgs.map((msg) => {
        const encoded = cwMsgToEncodeObject(msg, daoInfo.coreAddress)
        return signingCosmWasmClient.registry.encodeAsAny(encoded)
      })

      const tx = Tx.fromPartial({
        authInfo: AuthInfo.fromPartial({
          fee: Fee.fromPartial({}),
          signerInfos: [
            {
              modeInfo: {
                single: { mode: SignMode.SIGN_MODE_UNSPECIFIED },
              },
            },
          ],
        }),
        body: TxBody.fromPartial({
          messages: encodeObjects,
          memo: '',
        }),
        signatures: [new Uint8Array()],
      })

      const request = SimulateRequest.fromPartial({
        txBytes: Tx.encode(tx).finish(),
      })

      await cosmosRpcClient.tx.v1beta1.simulate(request)
    },
    [cosmosRpcClient.tx.v1beta1, daoInfo.coreAddress, signingCosmWasmClient, t]
  )

  return (
    <FormProvider {...formMethods}>
      <CreateProposal
        daoInfo={daoInfo}
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
              simulateMsgs={simulateMsgs}
              unloadDraft={unloadDraft}
            />
          </SuspenseLoader>
        }
        notMember={
          isMember === false &&
          // Only confirm not a member once wallet status has stopped trying
          // to connect. If autoconnecting, we don't want to flash "you're not
          // a member" text yet.
          status === WalletConnectionStatus.ReadyForConnection
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
