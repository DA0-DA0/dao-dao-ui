import { toHex } from '@cosmjs/encoding'
import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { meTransactionAtom, refreshSavedTxsAtom } from '@dao-dao/state'
import {
  SuspenseLoader,
  savedTxsSelector,
  temporarySavedTxsAtom,
  useCfWorkerAuthPostRequest,
} from '@dao-dao/stateful'
import { useLoadedActionsAndCategories } from '@dao-dao/stateful/actions'
import {
  MeTransactionBuilder as StatelessMeTransactionBuilder,
  useCachedLoading,
} from '@dao-dao/stateless'
import {
  MeTransactionBuilderProps,
  MeTransactionForm,
  MeTransactionSave,
} from '@dao-dao/types'
import {
  KVPK_API_BASE,
  ME_SAVED_TX_PREFIX,
  cwMsgToEncodeObject,
  processError,
} from '@dao-dao/utils'

export const MeTransactionBuilder = () => {
  const { t } = useTranslation()

  const {
    address: walletAddress = '',
    publicKey,
    signingCosmWasmClient,
  } = useWallet()

  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const [_meTransactionAtom, setWalletTransactionAtom] =
    useRecoilState(meTransactionAtom)

  const formMethods = useForm<MeTransactionForm>({
    mode: 'onChange',
    // Don't clone every render.
    defaultValues: useMemo(
      () => cloneDeep(_meTransactionAtom),
      [_meTransactionAtom]
    ),
  })
  // Trigger validation on first render, in case loaded from localStorage.
  useEffect(() => {
    formMethods.trigger()
  }, [formMethods])

  // Load from prefill query.
  const router = useRouter()
  useEffect(() => {
    if (router.query.prefill) {
      try {
        const prefill = JSON.parse(router.query.prefill as string)
        formMethods.reset(prefill)
      } catch (err) {
        console.error(err)
      }
    }
  }, [formMethods, router.query])

  const meTransaction = formMethods.watch()
  // Debounce saving latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(
      () => setWalletTransactionAtom(cloneDeep(meTransaction)),
      10000
    )
    return () => clearTimeout(timeout)
  }, [setWalletTransactionAtom, meTransaction])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [txHash, setTxHash] = useState('')
  const execute: MeTransactionBuilderProps['execute'] = useCallback(
    async (data) => {
      if (!signingCosmWasmClient || !walletAddress) {
        setError(t('error.connectWalletToContinue'))
        return
      }

      setLoading(true)
      setError('')
      setTxHash('')

      try {
        const encodeObjects = data.map((msg) =>
          cwMsgToEncodeObject(msg, walletAddress)
        )
        const tx = await signingCosmWasmClient.signAndBroadcast(
          walletAddress,
          encodeObjects,
          'auto'
        )

        toast.success(t('success.transactionExecuted'))
        setTxHash(tx.transactionHash)
      } catch (err) {
        console.error(err)
        const error = processError(err)
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [signingCosmWasmClient, t, walletAddress]
  )

  const { ready: txSavesReady, postRequest: postTxSavesRequest } =
    useCfWorkerAuthPostRequest(KVPK_API_BASE, 'Transaction Saves')

  const setRefreshSaves = useSetRecoilState(refreshSavedTxsAtom)
  const refreshSaves = useCallback(
    () => setRefreshSaves((id) => id + 1),
    [setRefreshSaves]
  )

  const setTemporarySaves = useSetRecoilState(
    temporarySavedTxsAtom(publicKey?.hex ?? '')
  )
  const savesLoading = useCachedLoading(
    publicKey?.hex ? savedTxsSelector(publicKey.hex) : undefined,
    []
  )
  const [saving, setSaving] = useState(false)

  const save = async (save: MeTransactionSave) => {
    if (!txSavesReady) {
      toast.error(t('error.connectWalletToContinue'))
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

      const key = ME_SAVED_TX_PREFIX + nameHash
      await postTxSavesRequest('/set', {
        key,
        value: save,
      })

      setTemporarySaves((prev) => ({
        ...prev,
        [key]: save,
      }))
      refreshSaves()

      return true
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setSaving(false)
    }

    return false
  }
  const deleteSave = async (save: MeTransactionSave) => {
    if (!txSavesReady) {
      toast.error(t('error.connectWalletToContinue'))
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

      const key = ME_SAVED_TX_PREFIX + nameHash
      await postTxSavesRequest('/set', {
        key,
        value: null,
      })

      setTemporarySaves((prev) => ({
        ...prev,
        [key]: null,
      }))
      refreshSaves()

      return true
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    }

    return false
  }

  return (
    <StatelessMeTransactionBuilder
      SuspenseLoader={SuspenseLoader}
      categories={categories}
      deleteSave={deleteSave}
      error={error}
      execute={execute}
      formMethods={formMethods}
      loadedActions={loadedActions}
      loading={loading}
      save={save}
      saves={savesLoading}
      saving={saving}
      txHash={txHash}
    />
  )
}
