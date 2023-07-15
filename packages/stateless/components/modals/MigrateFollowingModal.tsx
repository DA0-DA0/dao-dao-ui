import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { Modal, ModalProps } from './Modal'

export type MigrateFollowingModalProps = Pick<ModalProps, 'visible'> & {
  onMigrate: () => void
  syncing: boolean
  followedDaos: string[]
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const MigrateFollowingModal = ({
  visible,
  onMigrate,
  syncing,
  followedDaos,
  EntityDisplay,
}: MigrateFollowingModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      footerContent={
        <div className="flex flex-row items-stretch justify-end gap-2">
          <Button loading={syncing} onClick={onMigrate}>
            {t('button.migrate')}
          </Button>
        </div>
      }
      header={{
        title: t('title.migrateFollowing'),
        subtitle: t('info.migrateFollowingDescription'),
      }}
      visible={visible}
    >
      <div className="styled-scrollbar -my-4 flex max-h-[30vh] flex-col gap-2 overflow-y-auto py-4">
        {followedDaos.map((dao) => (
          <EntityDisplay key={dao} address={dao} />
        ))}
      </div>
    </Modal>
  )
}
