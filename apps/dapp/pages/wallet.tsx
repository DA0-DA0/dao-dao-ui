// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { walletActions } from '@dao-dao/actions'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  Action,
  ActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import {
  ProfileHomeDisconnectedCard,
  Wallet,
  WalletForm,
  WalletProps,
} from '@dao-dao/ui'
import { processError } from '@dao-dao/utils'

import { ProfileHomeCard } from '@/components'

const WalletPage: NextPage = () => {
  const { t } = useTranslation()

  const {
    connected,
    address: walletAddress,
    signingCosmWasmClient,
  } = useWallet()

  // Call relevant action hooks in the same order every time.
  const actionsWithData: Partial<
    Record<
      ActionKey,
      {
        action: Action
        transform: ReturnType<UseTransformToCosmos>
        defaults: ReturnType<UseDefaults>
      }
    >
  > = walletActions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(walletAddress ?? ''),
        defaults: action.useDefaults(walletAddress ?? ''),
      },
    }),
    {}
  )

  const formMethods = useForm<WalletForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      actionData: [],
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const execute: WalletProps['execute'] = useCallback(
    async (data) => {
      if (!signingCosmWasmClient || !walletAddress) {
        setError(t('error.connectWalletToContinue'))
        return
      }

      setLoading(true)
      setError('')

      try {
        // TODO: Make this work.
        const tx = await signingCosmWasmClient.signAndBroadcast(
          walletAddress,
          data,
          'auto'
        )
      } catch (err) {
        const error = processError(err)
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [signingCosmWasmClient, t, walletAddress]
  )

  return (
    <Wallet
      actions={walletActions}
      actionsWithData={actionsWithData}
      connected={connected}
      error={error}
      execute={execute}
      formMethods={formMethods}
      loading={loading}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileHomeDisconnectedCard />
      }
      walletAddress={walletAddress ?? ''}
    />
  )
}

export default WalletPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
