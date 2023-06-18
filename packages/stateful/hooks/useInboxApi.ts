import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { temporaryClearedInboxApiItemsAtom } from '@dao-dao/state'
import { INBOX_API_BASE, processError } from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'

export type UseInboxApiReturn = {
  clear: (idOrIds: string | string[]) => void
  ready: boolean
}

export const useInboxApi = (): UseInboxApiReturn => {
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
    'Clear Inbox Items'
  )

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
        await postRequest('/clear', {
          ids,
        })

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

  return {
    clear,
    ready,
  }
}
