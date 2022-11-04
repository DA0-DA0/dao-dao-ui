import { ArrowForwardIos } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ModalProps } from '@dao-dao/types'

import { ButtonLink } from '../buttons/ButtonLink'
import { Modal } from './Modal'

export type InstallKeplrModalProps = Pick<ModalProps, 'visible' | 'onClose'>

export const InstallKeplrModal = (props: InstallKeplrModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      {...props}
      footerContent={
        <ButtonLink center className="w-full" href="https://www.keplr.app/">
          {t('button.installKeplr')} <ArrowForwardIos className="!h-4 !w-4" />
        </ButtonLink>
      }
      header={{
        title: t('title.needWalletToContinue'),
        subtitle: t('info.keplrModalWalletExplanation'),
      }}
      titleClassName="mb-2"
    />
  )
}
