import { StdSignDoc } from '@cosmjs/amino'
import { DirectSignDoc } from '@cosmos-kit/core'
import { useIframe } from '@cosmos-kit/react-lite'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

import { TxBody } from '@dao-dao/protobuf/codegen/cosmos/tx/v1beta1/tx'
import {
  proposalCreatedCardPropsAtom,
  proposalDraftsAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state/recoil'
import {
  Loader,
  Modal,
  BrowserTab as StatelessBrowserTab,
  useChainContext,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  CosmosMsgFor_Empty,
  PartialCategorizedActionKeyAndData,
  ProposalDraft,
} from '@dao-dao/types'
import {
  DaoProposalSingleAdapterId,
  SITE_URL,
  aminoTypes,
  decodeMessages,
  decodedStargateMsgToCw,
  getFallbackImage,
  protobufToCwMsg,
} from '@dao-dao/utils'

import { useActionsForMatching } from '../../../actions'
import {
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '../../../proposal-module-adapter'
import { SuspenseLoader } from '../../SuspenseLoader'

export const BrowserTab = () => {
  const {
    name,
    imageUrl,
    chainId: currentChainId,
    coreAddress,
    polytoneProxies,
  } = useDaoInfoContext()

  const [msgs, setMsgs] = useState<CosmosMsgFor_Empty[]>()

  const decodeDirect = (signDocBodyBytes: Uint8Array) => {
    const encodedMessages = TxBody.decode(signDocBodyBytes).messages
    const messages = encodedMessages.map((msg) => protobufToCwMsg(msg).msg)
    setMsgs(messages)
  }
  const decodeAmino = (signDoc: StdSignDoc) => {
    const messages = signDoc.msgs.map(
      (msg) => decodedStargateMsgToCw(aminoTypes.fromAmino(msg)).msg
    )
    setMsgs(messages)
  }

  const addressForChainId = (chainId: string) =>
    (chainId === currentChainId ? coreAddress : polytoneProxies[chainId]) || ''

  const enableAndConnect = (chainIds: string | string[]) =>
    [chainIds].flat().some((chainId) => addressForChainId(chainId))
      ? {
          type: 'success',
        }
      : {
          type: 'error',
          error: `Unsupported chains: ${[chainIds].flat().join(', ')}.`,
        }

  const { wallet, iframeRef } = useIframe({
    walletInfo: {
      prettyName: name,
      logo: imageUrl || SITE_URL + getFallbackImage(coreAddress),
    },
    accountReplacement: (chainId) => ({
      username: name,
      address: addressForChainId(chainId),
    }),
    walletClientOverrides: {
      // @ts-ignore
      signAmino: (_chainId: string, _signer: string, signDoc: StdSignDoc) => {
        decodeAmino(signDoc)
      },
      // @ts-ignore
      signDirect: (
        _chainId: string,
        _signer: string,
        signDoc: DirectSignDoc
      ) => {
        if (!signDoc?.bodyBytes) {
          return {
            type: 'execute',
          }
        }

        decodeDirect(signDoc.bodyBytes)
      },
      enable: enableAndConnect,
      connect: enableAndConnect,
      sign: () => ({
        type: 'error',
        value: 'Unsupported.',
      }),
      signArbitrary: () => ({
        type: 'error',
        value: 'Unsupported.',
      }),
      suggestToken: () => ({
        type: 'success',
      }),
      addChain: () => ({
        type: 'success',
      }),
    },
    aminoSignerOverrides: {
      signAmino: (_signerAddress, signDoc) => {
        decodeAmino(signDoc)

        return {
          type: 'error',
          error: 'Handled by DAO browser.',
        }
      },
    },
    directSignerOverrides: {
      signDirect: (_signerAddress, signDoc) => {
        decodeDirect(signDoc.bodyBytes)

        return {
          type: 'error',
          error: 'Handled by DAO browser.',
        }
      },
    },
  })

  // Connect to iframe wallet on load if disconnected.
  const connectingRef = useRef(false)
  useEffect(() => {
    if (wallet && !wallet.isWalletConnected && !connectingRef.current) {
      connectingRef.current = true
      try {
        wallet.connect()
      } finally {
        connectingRef.current = false
      }
    }
  }, [wallet])

  return (
    <>
      <StatelessBrowserTab iframeRef={iframeRef} />
      {msgs && (
        <ActionMatcherAndProposer
          key={JSON.stringify(msgs)}
          msgs={msgs}
          setMsgs={setMsgs}
        />
      )}
    </>
  )
}

type ActionMatcherAndProposerProps = {
  msgs: CosmosMsgFor_Empty[]
  setMsgs: (msgs: CosmosMsgFor_Empty[] | undefined) => void
}

const ActionMatcherAndProposer = ({
  msgs,
  setMsgs,
}: ActionMatcherAndProposerProps) => {
  const { t } = useTranslation()
  const { coreAddress, proposalModules } = useDaoInfoContext()
  const { chain } = useChainContext()

  const singleChoiceProposalModule = proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      DaoProposalSingleAdapterId
  )
  const proposalModuleAdapterCommon = useMemo(
    () =>
      singleChoiceProposalModule &&
      matchAndLoadCommon(singleChoiceProposalModule, {
        chain,
        coreAddress,
      }),
    [chain, coreAddress, singleChoiceProposalModule]
  )

  if (!proposalModuleAdapterCommon) {
    throw new Error(t('error.noSingleChoiceProposalModule'))
  }

  const {
    fields: { newProposalFormTitleKey },
    components: { NewProposal },
  } = proposalModuleAdapterCommon

  const actionsForMatching = useActionsForMatching()

  const decodedMessages = useMemo(() => decodeMessages(msgs), [msgs])

  // Call relevant action hooks in the same order every time.
  const actionData: PartialCategorizedActionKeyAndData[] = decodedMessages.map(
    (message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      // There should always be a match since custom matches all. This should
      // never happen as long as the Custom action exists.
      if (!actionMatch?.match) {
        throw new Error(t('error.loadingData'))
      }

      return {
        _id: uuidv4(),
        categoryKey: actionMatch.category.key,
        actionKey: actionMatch.action.key,
        data: actionMatch.data,
      }
    }
  )

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData,
    },
  })
  const proposalData = formMethods.watch()

  const setProposalCreatedCardProps = useSetRecoilState(
    proposalCreatedCardPropsAtom
  )

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const [drafts, setDrafts] = useRecoilState(proposalDraftsAtom(coreAddress))
  const [draftIndex, setDraftIndex] = useState<number>()
  const draft =
    draftIndex !== undefined && drafts.length > draftIndex
      ? drafts[draftIndex]
      : undefined
  const deleteDraft = useCallback(
    (deleteIndex: number) => {
      setDrafts((drafts) => drafts.filter((_, index) => index !== deleteIndex))
      setDraftIndex(undefined)
    },
    [setDrafts]
  )
  const unloadDraft = () => setDraftIndex(undefined)

  const proposalName = formMethods.watch(newProposalFormTitleKey as any)
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

      // Close modal.
      setMsgs(undefined)
    },
    [
      deleteDraft,
      draftIndex,
      refreshProposals,
      setMsgs,
      setProposalCreatedCardProps,
    ]
  )

  return (
    <Modal
      containerClassName="sm:!max-w-[90vw] !w-full"
      header={{
        title: 'Propose',
      }}
      onClose={() => setMsgs(undefined)}
      visible
    >
      <FormProvider {...formMethods}>
        <SuspenseLoader fallback={<Loader />}>
          <NewProposal
            deleteDraft={deleteDraft}
            draft={draft}
            draftSaving={draftSaving}
            drafts={drafts}
            onCreateSuccess={onCreateSuccess}
            proposalModuleSelector={null}
            saveDraft={saveDraft}
            unloadDraft={unloadDraft}
          />
        </SuspenseLoader>
      </FormProvider>
    </Modal>
  )
}
