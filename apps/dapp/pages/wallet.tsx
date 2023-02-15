// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { GetStaticProps, NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { walletTransactionAtom } from '@dao-dao/state'
import {
  ConnectWallet,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
} from '@dao-dao/stateful'
import {
  WalletActionsProvider,
  useActions,
  useLoadActions,
} from '@dao-dao/stateful/actions'
import {
  Loader,
  Wallet,
  WalletDisconnected,
  WalletProps,
} from '@dao-dao/stateless'
import { WalletTransactionForm } from '@dao-dao/types'
import { cwMsgToEncodeObject, processError } from '@dao-dao/utils'

const InnerWallet = () => {
  const { t } = useTranslation()

  const {
    connected,
    address: walletAddress,
    signingCosmWasmClient,
  } = useWallet()

  const actions = useActions()
  const loadedActions = useLoadActions(actions)

  const [_walletTransactionAtom, setWalletTransactionAtom] = useRecoilState(
    walletTransactionAtom
  )

  const formMethods = useForm<WalletTransactionForm>({
    mode: 'onChange',
    // Don't clone every render.
    defaultValues: useMemo(
      () => cloneDeep(_walletTransactionAtom),
      [_walletTransactionAtom]
    ),
  })
  // Trigger validation on first render, in case loaded from localStorage.
  useEffect(() => {
    formMethods.trigger()
  }, [formMethods])

  const walletTransaction = formMethods.watch()
  // Debounce saving latest data to atom and thus localStorage every 10 seconds.
  useEffect(() => {
    // Deep clone to prevent values from becoming readOnly.
    const timeout = setTimeout(
      () => setWalletTransactionAtom(cloneDeep(walletTransaction)),
      10000
    )
    return () => clearTimeout(timeout)
  }, [setWalletTransactionAtom, walletTransaction])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [txHash, setTxHash] = useState('')
  const execute: WalletProps['execute'] = useCallback(
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

  return (
    <Wallet
      SuspenseLoader={SuspenseLoader}
      actions={actions}
      connected={connected}
      error={error}
      execute={execute}
      formMethods={formMethods}
      loadedActions={loadedActions}
      loading={loading}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
      txHash={txHash}
    />
  )
}

const WalletPage: NextPage = () => {
  const { address: walletAddress = '', connected, status } = useWallet()

  return connected ? (
    <WalletActionsProvider
      // If walletAddress changes, refresh actions.
      key={walletAddress}
    >
      {/* Suspend to prevent hydration error since we load state on first render from localStorage. */}
      <SuspenseLoader fallback={<Loader />}>
        <InnerWallet />
      </SuspenseLoader>
    </WalletActionsProvider>
  ) : (
    <WalletDisconnected
      autoConnecting={
        status === WalletConnectionStatus.Initializing ||
        status === WalletConnectionStatus.AttemptingAutoConnection
      }
      connectWalletButton={<ConnectWallet />}
      rightSidebarContent={<ProfileDisconnectedCard />}
    />
  )
}

export default WalletPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
