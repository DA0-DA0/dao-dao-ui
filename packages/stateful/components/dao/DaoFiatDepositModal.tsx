import { useTranslation } from 'react-i18next'

import { KadoModal, useDaoInfoContext } from '@dao-dao/stateless'
import { DaoFiatDepositModalProps } from '@dao-dao/types'

export const DaoFiatDepositModal = (props: DaoFiatDepositModalProps) => {
  const { t } = useTranslation()
  const {
    chainId: daoChainId,
    coreAddress,
    polytoneProxies,
  } = useDaoInfoContext()

  // Deposit address depends on if the token is on the DAO's native chain or one
  // of its polytone chains.
  const depositAddress =
    props.chainId === daoChainId ? coreAddress : polytoneProxies[props.chainId]

  return (
    <KadoModal
      header={{
        title: t('title.depositFiat'),
        subtitle: t('info.depositFiatDescription'),
      }}
      toAddress={depositAddress}
      {...props}
    />
  )
}
