import { ClearAll, Delete, Refresh, Settings } from '@mui/icons-material'
import clsx from 'clsx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  IconButton,
  LogInRequiredPage,
  Inbox as StatelessInbox,
  Tooltip,
  useAppContext,
} from '@dao-dao/stateless'
import { SITE_URL, processError } from '@dao-dao/utils'

import { useInboxApi, useWallet } from '../../hooks'
import { ConnectWallet } from '../ConnectWallet'
import { InboxMainItemRenderer } from '../inbox'
import { PageHeaderContent } from '../PageHeaderContent'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'

export const Inbox: NextPage = () => {
  const { t } = useTranslation()
  const api = useInboxApi()
  const {
    asPath,
    query: { code },
    isReady,
    replace,
  } = useRouter()
  const { isWalletConnected, isWalletConnecting } = useWallet()

  const { inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  const { ready, verify: doVerify } = api

  const verify = useCallback(async () => {
    if (ready && isReady) {
      if (typeof code === 'string') {
        if (await doVerify(code)) {
          toast.success(t('info.emailVerified'))
        }
      } else {
        toast.error(t('error.invalidCode'))
      }

      replace('/inbox/settings', undefined, { shallow: true })
    }
  }, [code, isReady, replace, ready, t, doVerify])

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  const shouldBeSpinningRefresh = isWalletConnected && inbox.refreshing
  useEffect(() => {
    shouldBeSpinningRefresh && setRefreshSpinning(true)
  }, [shouldBeSpinningRefresh])

  const [checked, setChecked] = useState({} as Record<string, boolean>)
  const onCheck = useCallback(
    (id: string) =>
      setChecked((prev) => ({
        ...prev,
        [id]: !prev[id],
      })),
    []
  )
  const countChecked = Object.values(checked).filter(Boolean).length
  const [checking, setChecking] = useState(false)
  const clearChecked = useCallback(async () => {
    setChecking(true)
    try {
      // If none checked, clear all.
      const toClear = !countChecked
        ? inbox.items.map(({ id }) => id)
        : Object.entries(checked).flatMap(([id, checked]) =>
            checked ? [id] : []
          )

      if (toClear.length && (await api.clear(toClear))) {
        setChecked({})
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setChecking(false)
    }
  }, [api, checked, countChecked, inbox.items])

  return (
    <>
      <NextSeo
        description={t('info.inboxDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.inbox'),
          description: t('info.inboxDescription'),
        }}
        title={t('title.inbox')}
      />

      <PageHeaderContent
        className="mx-auto max-w-5xl"
        expandBorderToEdge
        rightNode={
          <div className="flex flex-row items-center gap-2 self-stretch border-r border-border-secondary pr-4">
            <Tooltip title={t('button.refresh')}>
              <IconButton
                Icon={Refresh}
                iconClassName={clsx(refreshSpinning && 'animate-spin-medium')}
                // If spinning but no longer refreshing, stop after iteration.
                onAnimationIteration={
                  refreshSpinning && !shouldBeSpinningRefresh
                    ? () => setRefreshSpinning(false)
                    : undefined
                }
                onClick={() => {
                  // Perform one spin even if refresh completes immediately.
                  // It will stop after 1 iteration if `refreshing` does not
                  // become true.
                  setRefreshSpinning(true)
                  inbox.refresh()
                }}
                variant="ghost"
              />
            </Tooltip>

            {/* Matches clear button in InboxMainItemRenderer */}
            <Tooltip
              title={
                countChecked
                  ? t('button.clearSelected', {
                      count: countChecked,
                    })
                  : t('button.clearAll')
              }
            >
              <IconButton
                Icon={countChecked ? Delete : ClearAll}
                disabled={!api.ready || api.updating}
                loading={checking}
                onClick={clearChecked}
                variant={countChecked ? 'primary' : 'ghost'}
              />
            </Tooltip>

            <Tooltip title={t('button.settings')}>
              <IconButton
                Icon={Settings}
                disabled={!api.ready}
                onClick={() =>
                  replace('/inbox/settings', undefined, { shallow: true })
                }
                variant="ghost"
              />
            </Tooltip>
          </div>
        }
        title={t('title.inbox')}
      />

      {isWalletConnected ? (
        <StatelessInbox
          InboxMainItemRenderer={InboxMainItemRenderer}
          api={api}
          checked={checked}
          connected={isWalletConnected}
          onCheck={onCheck}
          rightSidebarContent={<ProfileHomeCard />}
          state={inbox}
          verify={verify}
        />
      ) : (
        <LogInRequiredPage
          connectWalletButton={<ConnectWallet />}
          connecting={isWalletConnecting}
          rightSidebarContent={<ProfileDisconnectedCard />}
        />
      )}
    </>
  )
}
