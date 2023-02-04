import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'

import { KadoModalProps } from '@dao-dao/types'
import { KADO_API_KEY } from '@dao-dao/utils'

import { CopyToClipboard } from '../CopyToClipboard'
import { Modal } from './Modal'

export const KadoModal = ({
  defaultMode = 'buy',
  toAddress,
  containerClassName,
  ...modalProps
}: KadoModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal
      containerClassName={clsx('!h-[90vh] !max-w-lg', containerClassName)}
      {...modalProps}
    >
      {toAddress && (
        <div className="mb-4 flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
          <WarningRounded className="!h-10 !w-10" />

          <div className="min-w-0 space-y-2">
            <p>{t('info.verifyAddressMatches')}</p>

            <CopyToClipboard
              takeStartEnd={{ start: 16, end: 16 }}
              value={toAddress}
            />
          </div>
        </div>
      )}

      <iframe
        className="rounded-md"
        height="100%"
        src={`https://app.kado.money/?${queryString.stringify({
          apiKey: KADO_API_KEY,
          onRevCurrency: 'USDC',
          offPayCurrency: 'USDC',
          offRevCurrency: 'USDC',
          product: defaultMode?.toUpperCase(),
          onToAddress: toAddress,
          network: 'JUNO',
          cryptoList: 'USDC',
          networkList: 'JUNO',
        })}`}
        width="100%"
      />
    </Modal>
  )
}
