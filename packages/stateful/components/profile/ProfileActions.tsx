import { toHex } from '@cosmjs/encoding'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { meTransactionAtom, walletChainIdAtom } from '@dao-dao/state'
import {
  ProfileActionsProps,
  ProfileActions as StatelessProfileActions,
  useChain,
  useHoldingKey,
  useUpdatingRef,
} from '@dao-dao/stateless'
import {
  AccountTxForm,
  AccountTxSave,
  cwMsgToEncodeObject,
} from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  SITE_URL,
  decodeJsonFromBase64,
  getActionBuilderPrefillPath,
  isErrorWithSubstring,
  objectMatchesStructure,
  processError,
} from '@dao-dao/utils'

import { useActionEncodeContext } from '../../actions'
import {
  useProfile,
  useQueryLoadingDataWithError,
  useTransactionSavesKvpkClient,
  useWallet,
} from '../../hooks'
import { SuspenseLoader } from '../SuspenseLoader'
import { WalletChainSwitcher } from '../wallet'

export const ProfileActions = ({
  actionsReadOnlyMode,
}: Pick<ProfileActionsProps, 'actionsReadOnlyMode'>) => {
  const { t } = useTranslation()

  const {
    address: walletAddress = '',
    getSigningClient,
    chain,
  } = useWallet({
    loadAccount: true,
  })
  const { profile } = useProfile()

  const meTransactionSave = useRecoilValue(meTransactionAtom(chain.chainId))
  // Only set defaults once to prevent unnecessary useForm re-renders.
  const [firstMeTransactionSave] = useState(() => cloneDeep(meTransactionSave))

  const formMethods = useForm<AccountTxForm>({
    mode: 'onChange',
    defaultValues: firstMeTransactionSave,
  })

  // Trigger validation on first render, in case loaded from localStorage.
  useEffect(() => {
    formMethods.trigger()
  }, [formMethods])

  // Load from prefill query.
  const router = useRouter()
  const setWalletChainId = useSetRecoilState(walletChainIdAtom)
  const [loadedFromPrefill, setLoadedFromPrefill] = useState(false)
  useEffect(() => {
    const potentialPrefill = router.query.prefill
    if (typeof potentialPrefill !== 'string' || !potentialPrefill) {
      return
    }

    // Try to parse as JSON.
    let prefillData
    try {
      prefillData = JSON.parse(potentialPrefill)
    } catch (error) {
      console.error(error)
    }

    // Try to parse as base64.
    if (!prefillData) {
      try {
        prefillData = decodeJsonFromBase64(potentialPrefill)
      } catch (error) {
        console.error(error)
      }
    }

    // If prefillData looks valid, use it.
    if (
      objectMatchesStructure(prefillData, {
        actions: {},
      })
    ) {
      // Switch chain if chainId is specified in prefill data.
      if (typeof prefillData.chainId === 'string') {
        setWalletChainId(prefillData.chainId)
      }

      formMethods.reset(prefillData)
      setLoadedFromPrefill(true)
    }
  }, [formMethods, router.query, setWalletChainId])

  const holdingAltForDirectSign = useHoldingKey({ key: 'alt' })

  const [error, setError] = useState('')
  const [txHash, setTxHash] = useState('')
  const execute: ProfileActionsProps['execute'] = useCallback(
    async (data) => {
      if (!walletAddress) {
        setError(t('error.logInToContinue'))
        return
      }

      setError('')
      setTxHash('')

      const doExecute = async (direct: boolean) => {
        const signingCosmWasmClient = await getSigningClient(
          direct ? 'direct' : 'amino'
        )

        const encodeObjects = data.map((msg) =>
          cwMsgToEncodeObject(chain.chainId, msg, walletAddress)
        )
        const tx = await signingCosmWasmClient.signAndBroadcast(
          walletAddress,
          encodeObjects,
          CHAIN_GAS_MULTIPLIER
        )

        toast.success(t('success.transactionExecuted'))
        setTxHash(tx.transactionHash)
      }

      try {
        try {
          await doExecute(holdingAltForDirectSign)
        } catch (err) {
          // If signature verification failed with amino, try direct sign.
          if (
            !holdingAltForDirectSign &&
            isErrorWithSubstring(err, 'signature verification failed')
          ) {
            console.log(
              'Signature verification failed with amino, trying direct sign...'
            )
            await doExecute(true)
          } else {
            // Otherwise, throw the original error.
            throw err
          }
        }
      } catch (err) {
        console.error(err)
        const error = processError(err)
        setError(error)
      }
    },
    [chain.chainId, getSigningClient, holdingAltForDirectSign, t, walletAddress]
  )

  const { isWalletConnected, client: transactionSavesKvpkClient } =
    useTransactionSavesKvpkClient()

  const savesLoading = useQueryLoadingDataWithError(
    !profile.loading
      ? transactionSavesKvpkClient.listQuery({ uuid: profile.data.uuid })
      : undefined,
    (data) =>
      data
        .map(({ value }) => value as AccountTxSave)
        .sort((a, b) => a.name.localeCompare(b.name))
  )
  const [saving, setSaving] = useState(false)

  const save = async (save: AccountTxSave) => {
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    setSaving(true)
    try {
      const nameHash = toHex(
        new Uint8Array(
          await crypto.subtle.digest(
            'SHA-512',
            new TextEncoder().encode(save.name)
          )
        )
      )

      await transactionSavesKvpkClient.set({
        key: nameHash,
        value: save,
      })

      return true
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSaving(false)
    }

    return false
  }

  const deleteSave = async (save: AccountTxSave) => {
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return false
    }

    try {
      const nameHash = toHex(
        new Uint8Array(
          await crypto.subtle.digest(
            'SHA-512',
            new TextEncoder().encode(save.name)
          )
        )
      )

      await transactionSavesKvpkClient.delete({
        key: nameHash,
      })

      return true
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    }

    return false
  }

  const actionEncodeContext = useActionEncodeContext()

  // Copy draft link function.
  const copyDraftLink = useCallback(async () => {
    const actions = formMethods.getValues('actions')
    const url = SITE_URL + getActionBuilderPrefillPath(actions, chain.chainId)
    navigator.clipboard.writeText(url)
    toast.success(t('info.copiedLinkToClipboard'))
  }, [chain.chainId, formMethods, t])

  return (
    <FormProvider {...formMethods}>
      <StatelessProfileActions
        SuspenseLoader={SuspenseLoader}
        WalletChainSwitcher={WalletChainSwitcher}
        actionEncodeContext={actionEncodeContext}
        actionsReadOnlyMode={actionsReadOnlyMode}
        copyDraftLink={copyDraftLink}
        deleteSave={deleteSave}
        error={error}
        execute={execute}
        holdingAltForDirectSign={holdingAltForDirectSign}
        loadedFromPrefill={loadedFromPrefill}
        save={save}
        saves={savesLoading}
        saving={saving}
        txHash={txHash}
      />

      <FormSaver />
    </FormProvider>
  )
}

// Component responsible for listening to form changes and save it to local
// storage periodically.
const FormSaver = () => {
  const { chainId } = useChain()
  const { watch, getValues } = useFormContext<AccountTxForm>()

  const setWalletTransactionAtom = useSetRecoilState(meTransactionAtom(chainId))

  const saveQueuedRef = useRef(false)
  const saveLatestProposalRef = useUpdatingRef(() =>
    setWalletTransactionAtom(cloneDeep(getValues()))
  )

  const data = watch()

  // Save latest data to atom (and thus localStorage) every second.
  useEffect(() => {
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
  }, [saveLatestProposalRef, data])

  return null
}
