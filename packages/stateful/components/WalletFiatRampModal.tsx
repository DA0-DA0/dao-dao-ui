import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'

import { KadoModal, ModalProps } from '@dao-dao/stateless'

export const WalletFiatRampModal = (props: Omit<ModalProps, 'header'>) => {
  const { t } = useTranslation()
  const { address } = useWallet()

  return (
    <KadoModal
      header={{
        title: t('title.exchangeStableCoin'),
        subtitle: t('info.exchangeStableCoinDescription'),
      }}
      toAddress={address}
      {...props}
    />
  )
}
