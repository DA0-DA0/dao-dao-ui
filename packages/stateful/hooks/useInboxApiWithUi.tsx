import { ClearAll, Delete, Refresh, Settings } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { IconButton, Tooltip, useAppContext } from '@dao-dao/stateless'
import { InboxApiWithUi, InboxLoadedItem } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { IconButtonLink } from '../components'
import { useInboxApi } from './useInboxApi'
import { useWallet } from './useWallet'

export type UseInboxApiWithUiOptions = {
  /**
   * Whether or not we are currently on the notifications page or in the popup.
   */
  mode: 'page' | 'popup'
}

export const useInboxApiWithUi = ({
  mode,
}: UseInboxApiWithUiOptions): InboxApiWithUi => {
  const { t } = useTranslation()
  const api = useInboxApi()
  const {
    query: { code },
    isReady,
    replace,
  } = useRouter()
  const { isWalletConnected } = useWallet()

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

      replace('/notifications/settings', undefined, { shallow: true })
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
  const countChecked = Object.values(checked).filter(Boolean).length
  const onCheck = useCallback(
    (item: InboxLoadedItem) =>
      setChecked((prev) => ({
        ...prev,
        [item.chainId + ':' + item.id]: !prev[item.chainId + ':' + item.id],
      })),
    []
  )

  const [checking, setChecking] = useState(false)
  const clearChecked = useCallback(async () => {
    setChecking(true)
    try {
      // If none checked, clear all.
      const toClear = !countChecked
        ? inbox.items
        : Object.entries(checked).flatMap(([key, checked]) =>
            checked
              ? {
                  chainId: key.split(':')[0],
                  id: key.split(':')[1],
                }
              : []
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

  const refreshButton = (
    <Tooltip title={t('button.refresh')}>
      <IconButton
        Icon={Refresh}
        disabled={!api.ready}
        iconClassName={clsx(refreshSpinning && 'animate-spin-medium')}
        // If spinning but no longer refreshing, stop after iteration.
        onAnimationIteration={
          refreshSpinning && !shouldBeSpinningRefresh
            ? () => setRefreshSpinning(false)
            : undefined
        }
        onClick={() => {
          // Perform one spin even if refresh completes immediately. It will
          // stop after 1 iteration if `refreshing` does not become true.
          setRefreshSpinning(true)
          inbox.refresh()
        }}
        size={mode === 'popup' ? 'sm' : undefined}
        variant="ghost"
      />
    </Tooltip>
  )
  const clearButton = (
    // Matches clear button in InboxMainItemRenderer
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
        disabled={!api.ready || api.updating || !inbox.items.length}
        loading={checking}
        onClick={clearChecked}
        size={mode === 'popup' ? 'sm' : undefined}
        variant={countChecked ? 'brand' : 'ghost'}
      />
    </Tooltip>
  )
  const settingsButton = (
    <Tooltip title={t('button.settings')}>
      <IconButtonLink
        Icon={Settings}
        disabled={!api.ready}
        href="/notifications/settings"
        replace={mode === 'page'}
        shallow
        size={mode === 'popup' ? 'sm' : undefined}
        variant="ghost"
      />
    </Tooltip>
  )

  return {
    api,
    checked,
    onCheck,
    verify,
    buttons: {
      refresh: refreshButton,
      clear: clearButton,
      settings: settingsButton,
    },
  }
}
