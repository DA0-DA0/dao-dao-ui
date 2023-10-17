import { AccountData, StdSignDoc } from '@cosmjs/amino'
import { DirectSignDoc, SimpleAccount, WalletAccount } from '@cosmos-kit/core'
import { useIframe } from '@cosmos-kit/react-lite'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { v4 as uuidv4 } from 'uuid'

import {
  proposalCreatedCardPropsAtom,
  proposalDraftsAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state/recoil'
import {
  Loader,
  Modal,
  AppsTab as StatelessAppsTab,
  WarningCard,
  useChainContext,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  CosmosMsgFor_Empty,
  PartialCategorizedActionKeyAndData,
  PartialCategorizedActionKeyAndDataNoId,
  ProposalDraft,
} from '@dao-dao/types'
import {
  DaoProposalSingleAdapterId,
  SITE_URL,
  aminoTypes,
  decodeMessages,
  decodedStargateMsgToCw,
  getDaoAccountAddress,
  getDaoAccountChainId,
  getFallbackImage,
  maybeMakePolytoneExecuteMessage,
  protobufToCwMsg,
} from '@dao-dao/utils'
import { TxBody } from '@dao-dao/utils/protobuf/codegen/cosmos/tx/v1beta1/tx'

import { useActionsForMatching } from '../../../actions'
import { useWallet } from '../../../hooks/useWallet'
import {
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '../../../proposal-module-adapter'
import { NewProposalForm as NewSingleChoiceProposalForm } from '../../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { ConnectWallet } from '../../ConnectWallet'
import { SuspenseLoader } from '../../SuspenseLoader'
import { ConnectedWalletDisplay, DisconnectWallet } from '../../wallet'

export const AppsTab = () => {
  const { t } = useTranslation()
  const {
    name,
    imageUrl,
    chainId: currentChainId,
    coreAddress,
    polytoneProxies,
    proposalModules,
    accounts,
  } = useDaoInfoContext()

  // Ensure we have a single choice proposal module to use for proposals.
  const singleChoiceProposalModuleExists = proposalModules.some(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      DaoProposalSingleAdapterId
  )

  const [msgs, setMsgs] = useState<CosmosMsgFor_Empty[]>()
  const [fullScreen, setFullScreen] = useState(false)

  const addressForChainId = (chainId: string) =>
    getDaoAccountAddress({
      accounts,
      chainId,
    }) || ''
  const chainIdForAddress = (address: string) =>
    getDaoAccountChainId({
      accounts,
      address,
    })

  const decodeDirect = (sender: string, signDocBodyBytes: Uint8Array) => {
    const chainId = chainIdForAddress(sender)
    if (!chainId) {
      toast.error(t('error.daoAccountNotFound'))
      return
    }

    const encodedMessages = TxBody.decode(signDocBodyBytes).messages
    const messages = encodedMessages.map((msg) =>
      maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        protobufToCwMsg(msg).msg
      )
    )
    setMsgs(messages)
  }
  const decodeAmino = (sender: string, signDoc: StdSignDoc) => {
    const chainId = chainIdForAddress(sender)
    if (!chainId) {
      toast.error(t('error.daoAccountNotFound'))
      return
    }

    const messages = signDoc.msgs.map((msg) =>
      maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        decodedStargateMsgToCw(aminoTypes.fromAmino(msg)).msg
      )
    )
    setMsgs(messages)
  }

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
    accountReplacement: async (chainId) => ({
      username: name,
      address: addressForChainId(chainId),
      pubkey: await getPubKey(chainId),
    }),
    walletClientOverrides: {
      // @ts-ignore
      signAmino: (_chainId: string, signer: string, signDoc: StdSignDoc) => {
        decodeAmino(signer, signDoc)
      },
      // @ts-ignore
      signDirect: (
        _chainId: string,
        signer: string,
        signDoc: DirectSignDoc
      ) => {
        if (!signDoc?.bodyBytes) {
          return {
            type: 'execute',
          }
        }

        decodeDirect(signer, signDoc.bodyBytes)
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
      getAccount: async (chainId: string) => ({
        type: 'success',
        value: {
          address: addressForChainId(chainId),
          algo: 'secp256k1',
          pubkey: await getPubKey(chainId),
          username: name,
        } as WalletAccount,
      }),
      getSimpleAccount: (chainId: string) => ({
        type: 'success',
        value: {
          namespace: 'cosmos',
          chainId,
          address: addressForChainId(chainId),
          username: name,
        } as SimpleAccount,
      }),
    },
    aminoSignerOverrides: {
      signAmino: (signerAddress, signDoc) => {
        decodeAmino(signerAddress, signDoc)

        return {
          type: 'error',
          error: 'Handled by DAO browser.',
        }
      },
      getAccounts: async () => ({
        type: 'success',
        // Will be overridden by `accountReplacement` function for the
        // appropriate chain, so just put filler data.
        value: [
          {
            address: coreAddress,
            algo: 'secp256k1',
            pubkey: await getPubKey(currentChainId),
          },
          ...(await Promise.all(
            Object.entries(polytoneProxies).map(async ([chainId, address]) => ({
              address,
              algo: 'secp256k1',
              pubkey: await getPubKey(chainId),
            }))
          )),
        ] as AccountData[],
      }),
    },
    directSignerOverrides: {
      signDirect: (signerAddress, signDoc) => {
        decodeDirect(signerAddress, signDoc.bodyBytes)

        return {
          type: 'error',
          error: 'Handled by DAO browser.',
        }
      },
      getAccounts: async () => ({
        type: 'success',
        // Will be overridden by `accountReplacement` function for the
        // appropriate chain, so just put filler data.
        value: [
          {
            address: coreAddress,
            algo: 'secp256k1',
            pubkey: await getPubKey(currentChainId),
          },
          ...(await Promise.all(
            Object.entries(polytoneProxies).map(async ([chainId, address]) => ({
              address,
              algo: 'secp256k1',
              pubkey: await getPubKey(chainId),
            }))
          )),
        ] as AccountData[],
      }),
    },
  })

  const getPubKey = async (chainId: string) => {
    // Wallet account secp256k1 public keys are expected to be 33 bytes starting
    // with 0x02 or 0x03. This will be used when simulating requests, but not
    // when signing since we intercept messages. This may cause problems with
    // some dApps if simulation fails...
    let pubKey
    try {
      pubKey = (await wallet.client.getAccount?.(chainId))?.pubkey
    } catch {
      pubKey = new Uint8Array([0x02, ...[...new Array(32)].map(() => 0)])
    }

    return pubKey
  }

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

  return singleChoiceProposalModuleExists ? (
    <>
      <StatelessAppsTab
        fullScreen={fullScreen}
        iframeRef={iframeRef}
        setFullScreen={setFullScreen}
      />

      {msgs && (
        <ActionMatcherAndProposer
          key={JSON.stringify(msgs)}
          msgs={msgs}
          setMsgs={setMsgs}
        />
      )}
    </>
  ) : (
    <WarningCard
      content={t('error.noSingleChoiceProposalModuleAppsDisabled')}
    />
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
  const { isWalletConnected } = useWallet()

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
  const actionData: PartialCategorizedActionKeyAndDataNoId[] =
    decodedMessages.map((message) => {
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
        categoryKey: actionMatch.category.key,
        actionKey: actionMatch.action.key,
        data: actionMatch.data,
      }
    })

  const formMethods = useForm<NewSingleChoiceProposalForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: actionData.map(
        (data): PartialCategorizedActionKeyAndData => ({
          _id: uuidv4(),
          ...data,
        })
      ),
    },
  })
  const proposalData = formMethods.watch()

  // If contents of matched action data change, update form.
  useDeepCompareEffect(() => {
    formMethods.reset({
      title: proposalData.title,
      description: proposalData.description,
      actionData: actionData.map(
        (data): PartialCategorizedActionKeyAndData => ({
          _id: uuidv4(),
          ...data,
        })
      ),
    })
  }, [actionData])

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
      backdropClassName="!z-[39]"
      containerClassName="sm:!max-w-[min(90dvw,64rem)] !w-full"
      footerContainerClassName="flex flex-row justify-between gap-8"
      footerContent={
        isWalletConnected ? (
          <>
            <ConnectedWalletDisplay className="min-w-0 overflow-hidden" />
            <DisconnectWallet />
          </>
        ) : (
          <>
            <div></div>
            <ConnectWallet />
          </>
        )
      }
      header={{
        title: t('title.createProposal'),
        subtitle: t('info.appsProposalDescription'),
      }}
      onClose={() => setMsgs(undefined)}
      visible
    >
      <FormProvider {...formMethods}>
        <SuspenseLoader fallback={<Loader />}>
          <NewProposal
            actionsReadOnlyMode
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
