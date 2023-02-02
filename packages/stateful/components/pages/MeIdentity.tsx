import { coins } from '@cosmjs/amino'
import { toHex } from '@cosmjs/encoding'
import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshCheckmarkStatusAtom } from '@dao-dao/state/recoil'
import {
  MeIdentity as StatelessMeIdentity,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  CHECKMARK_API_BASE,
  CHECKMARK_CONTRACT,
  CHECKMARK_PAYMENT_CONTRACT,
  loadableToLoadingDataWithError,
  processError,
} from '@dao-dao/utils'

import { useDelete } from '../../hooks/contracts/CwCheckmark'
import { usePay } from '../../hooks/contracts/CwReceipt'
import { useCfWorkerAuthPostRequest } from '../../hooks/useCfWorkerAuthPostRequest'
import { checkmarkStatusSelector } from '../../recoil'

export const MeIdentity = () => {
  const { t } = useTranslation()

  const { publicKey, address: walletAddress = '' } = useWallet()

  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    CHECKMARK_API_BASE,
    'Checkmark'
  )

  const setRefreshCheckmarkStatus = useSetRecoilState(
    refreshCheckmarkStatusAtom
  )
  const refreshCheckmarkStatus = () => setRefreshCheckmarkStatus((id) => id + 1)

  const loadingStatus = loadableToLoadingDataWithError(
    useCachedLoadable(
      publicKey?.hex ? checkmarkStatusSelector(publicKey.hex) : undefined
    )
  )

  const pay = usePay({
    contractAddress: CHECKMARK_PAYMENT_CONTRACT,
    sender: walletAddress,
  })
  const _deleteCheckmark = useDelete({
    contractAddress: CHECKMARK_CONTRACT,
    sender: walletAddress,
  })

  const [beginningVerification, setBeginningVerification] = useState(false)
  const [verificationSessionId, setVerificationSessionId] = useState('')
  const beginVerification = async () => {
    if (!ready) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setBeginningVerification(true)
    try {
      // Create session.
      const { sessionId } = await fetch('/api/createSession').then((res) =>
        res.json()
      )

      // Pay $1 JUNO for session.
      const hashedSessionId = toHex(
        new Uint8Array(
          await crypto.subtle.digest(
            'SHA-512',
            new TextEncoder().encode(sessionId)
          )
        )
      )
      await pay(
        {
          id: hashedSessionId,
        },
        'auto',
        undefined,
        coins(1000000, 'ujuno')
      )

      // Tell checkmark about session.
      await postRequest('/create', {
        sessionId,
      })

      setVerificationSessionId(sessionId)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setBeginningVerification(false)
    }
  }

  // Clear data and refresh checkmark status.
  const onFinishVerification = () => {
    setVerificationSessionId('')
    refreshCheckmarkStatus()
  }

  const [deletingCheckmark, setDeletingCheckmark] = useState(false)
  const deleteCheckmark = async () => {
    if (!walletAddress) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setDeletingCheckmark(true)
    try {
      await _deleteCheckmark()
      refreshCheckmarkStatus()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setDeletingCheckmark(false)
    }
  }

  return (
    <StatelessMeIdentity
      beginVerification={beginVerification}
      deleteCheckmark={deleteCheckmark}
      deletingCheckmark={deletingCheckmark}
      loadingStatus={loadingStatus}
      onFinishVerification={onFinishVerification}
      verificationSessionId={
        beginningVerification
          ? { loading: true }
          : { loading: false, data: verificationSessionId }
      }
    />
  )
}
