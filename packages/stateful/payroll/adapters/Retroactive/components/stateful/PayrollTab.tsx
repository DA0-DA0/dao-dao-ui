import { useWallet, useWalletManager } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { ConnectWallet, Loader, useDaoInfoContext } from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { useVotingModule } from '../../../../../hooks/useVotingModule'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { NewSurvey } from '../../types'
import { PayrollTab as StatelessPayrollTab } from '../stateless/PayrollTab'

export const PayrollTab = () => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const { connect } = useWalletManager()
  const { connected } = useWallet(chainId)

  return (
    <>
      <p className="title-text mb-6 text-text-body">
        {t('title.retroactiveCompensation')}
      </p>

      {connected ? (
        <SuspenseLoader fallback={<Loader />}>
          <InnerPayrollTab />
        </SuspenseLoader>
      ) : (
        <ConnectWallet onConnect={connect} />
      )}
    </>
  )
}

export const InnerPayrollTab = () => {
  const { coreAddress } = useDaoInfoContext()
  const { address: walletAddress = '' } = useWallet()
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  const status = useRecoilValue(
    statusSelector({
      daoAddress: coreAddress,
      walletAddress,
    })
  )

  const postRequest = usePostRequest()

  const [createLoading, setCreateLoading] = useState(false)
  const onCreate = useCallback(
    async (survey: NewSurvey) => {
      setCreateLoading(true)

      try {
        await postRequest(`/${coreAddress}`, { survey })
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      }

      setCreateLoading(false)
    },
    [coreAddress, postRequest]
  )

  return (
    <StatelessPayrollTab
      createLoading={createLoading}
      isMember={isMember}
      onCreate={onCreate}
      status={status}
    />
  )
}
