import { useTranslation } from 'react-i18next'

import { KadoModal, ModalProps, useDaoInfo } from '@dao-dao/stateless'

export const DaoFiatDepositModal = (props: Omit<ModalProps, 'header'>) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfo()

  return (
    <KadoModal
      header={{
        title: t('title.depositFiat'),
        subtitle: t('info.depositFiatDescription'),
      }}
      toAddress={coreAddress}
      {...props}
    />
  )
}
