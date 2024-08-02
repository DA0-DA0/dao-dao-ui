import { Key } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'
import { CreateDaoPermitProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { useDaoWithWalletSecretNetworkPermit } from '../../hooks'

export const CreateDaoPermit = ({ className }: CreateDaoPermitProps) => {
  const { t } = useTranslation()
  const { getPermit } = useDaoWithWalletSecretNetworkPermit()

  const [creatingPermit, setCreatingPermit] = useState(false)
  const createPermit = async () => {
    setCreatingPermit(true)
    try {
      await getPermit()
      toast.success(t('success.createdPermit'))
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
    } finally {
      setCreatingPermit(false)
    }
  }

  return (
    <div className={clsx('flex flex-col gap-3 items-start', className)}>
      <p className="body-text">{t('info.createPermitToInteractWithDao')}</p>

      <Button
        center
        loading={creatingPermit}
        onClick={createPermit}
        size="md"
        variant="brand"
      >
        <Key className="!h-5 !w-5" />
        <p>{t('button.createPermit')}</p>
      </Button>
    </div>
  )
}
