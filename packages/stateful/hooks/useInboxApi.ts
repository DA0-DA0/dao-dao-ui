import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { temporaryClearedInboxApiItemsAtom } from '@dao-dao/state'
import { InboxApi, InboxApiConfig, InboxApiUpdateConfig } from '@dao-dao/types'
import { INBOX_API_BASE, processError } from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'

export const useInboxApi = (): InboxApi => {
  const { t } = useTranslation()
  const { address = '' } = useWallet()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(
    temporaryClearedInboxApiItemsAtom(address)
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    INBOX_API_BASE,
    'Inbox'
  )

  const [config, setConfig] = useState<InboxApiConfig>()

  const clear = useCallback(
    async (idOrIds: string | string[]) => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const ids = [idOrIds].flat()
        await postRequest(
          '/clear',
          {
            ids,
          },
          'Clear Inbox Items'
        )

        setTemporary((prev) => [...prev, ...ids])

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, setTemporary, t, updating]
  )

  const updateConfig = useCallback(
    async (data: InboxApiUpdateConfig, signatureType = 'Save Inbox Config') => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const config = await postRequest<InboxApiConfig>(
          '/config',
          data,
          signatureType
        )
        setConfig(config)

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, t, updating]
  )

  const loadConfig = useCallback(
    async () => updateConfig({}, 'Load Inbox Config'),
    [updateConfig]
  )

  const resendVerificationEmail = useCallback(async () => {
    if (!ready) {
      toast.error(t('error.logInToContinue'))
      return false
    }
    if (updating) {
      return false
    }

    setUpdating(true)

    try {
      const config = await postRequest<InboxApiConfig>(
        '/config',
        { resend: true },
        'Resend Inbox Verification Email'
      )
      setConfig(config)

      return true
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      return false
    } finally {
      setUpdating(false)
    }
  }, [postRequest, ready, t, updating])

  const verify = useCallback(
    async (code: string) => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        await postRequest<InboxApiConfig>(
          '/config',
          { verify: code },
          'Verify Inbox Email'
        )

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, t, updating]
  )

  return {
    ready,
    updating,
    clear,
    loadConfig,
    updateConfig,
    resendVerificationEmail,
    verify,
    config,
  }
}
