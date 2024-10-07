import { useTranslation } from 'react-i18next'

import { KadoModal, useDao } from '@dao-dao/stateless'
import { DaoFiatDepositModalProps } from '@dao-dao/types'

export const DaoFiatDepositModal = ({
  chainId,
  accountType,
  ...props
}: DaoFiatDepositModalProps) => {
  const { t } = useTranslation()

  const { chainId: daoChainId, coreAddress, accounts } = useDao()
  // Deposit address depends on the account type.
  let depositAddress = accounts.find(
    (account) => account.chainId === chainId && account.type === accountType
  )?.address
  // Default to the DAO's native chain and address if no deposit address found.
  chainId = depositAddress ? chainId : daoChainId
  depositAddress ||= coreAddress

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
