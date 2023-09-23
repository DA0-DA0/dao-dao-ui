import { useTranslation } from 'react-i18next'

import { KadoModal, useDaoInfoContext } from '@dao-dao/stateless'
import { DaoFiatDepositModalProps } from '@dao-dao/types'
import { getDaoAccount } from '@dao-dao/utils'

export const DaoFiatDepositModal = ({
  chainId,
  accountType,
  ...props
}: DaoFiatDepositModalProps) => {
  const { t } = useTranslation()

  const daoInfo = useDaoInfoContext()
  // Deposit address depends on what the account type is of the token owner.
  let depositAddress = getDaoAccount({
    daoInfo,
    chainId,
    accountType,
  })
  // Default to the DAO's native chain and address if no deposit address found.
  chainId = depositAddress ? chainId : daoInfo.chainId
  depositAddress ||= daoInfo.coreAddress

  return (
    <KadoModal
      chainId={chainId}
      header={{
        title: t('title.depositFiat'),
        subtitle: t('info.depositFiatDescription'),
      }}
      toAddress={depositAddress}
      {...props}
    />
  )
}
