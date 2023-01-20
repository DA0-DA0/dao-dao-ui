import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { Modal, ModalProps } from './Modal'

export type SyncFollowingModalProps = Pick<ModalProps, 'visible'> & {
  onDelete: () => void
  onSync: () => void
  syncing: boolean
  followedDaos: string[]
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const SyncFollowingModal = ({
  visible,
  onDelete,
  onSync,
  syncing,
  followedDaos,
  EntityDisplay,
}: SyncFollowingModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      footerContent={
        <div className="flex flex-row items-stretch justify-end gap-2">
          <Button disabled={syncing} onClick={onDelete} variant="secondary">
            {t('button.stopFollowing')}
          </Button>
          <Button loading={syncing} onClick={onSync}>
            {t('button.sync')}
          </Button>
        </div>
      }
      header={{
        title: t('title.syncFollowing'),
        subtitle: t('info.syncFollowingDescription'),
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
