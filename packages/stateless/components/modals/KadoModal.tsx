import { WarningRounded } from '@mui/icons-material'
import { ChainInfoID } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { KadoModalProps } from '@dao-dao/types'
import { CHAIN_ID, KADO_API_KEY } from '@dao-dao/utils'

import { useChain } from '../../hooks'
import { CopyToClipboard } from '../CopyToClipboard'
import { Loader } from '../logo'
import { Modal } from './Modal'

// Only supports Juno and Osmosis.
export const KADO_MODAL_ENABLED =
  CHAIN_ID === ChainInfoID.Juno1 || CHAIN_ID === ChainInfoID.Osmosis1

export const KadoModal = ({
  defaultMode = 'buy',
  toAddress,
  containerClassName,
  ...modalProps
}: KadoModalProps) => {
  const { t } = useTranslation()

  const { chain_id } = useChain()
  const network =
    chain_id === ChainInfoID.Juno1
      ? 'JUNO'
      : chain_id === ChainInfoID.Osmosis1
      ? 'OSMO'
      : ''

  // iframe hijacks clicks on mobile Safari even when pointer-events are set to
  // none (which happens on the modal when visible=false), so we need to
  // completely hide the iframe when invisible.
  //
  // https://stackoverflow.com/questions/39533016/iframe-with-pointer-eventsnone-hijacks-clicks-in-safari-on-ios
  const [iframeVisible, setIframeVisible] = useState(false)
  useEffect(() => {
    // Hide iframe at a delay after modal hides so it doesn't look weird when
    // disappearing, but show immediately when displaying.
    if (modalProps.visible) {
      setIframeVisible(true)
    } else {
      const timeout = setTimeout(() => setIframeVisible(false), 200)
      return () => clearTimeout(timeout)
    }
  }, [modalProps.visible])

  return (
    <Modal
      containerClassName={clsx('!h-[80vh] !max-w-lg', containerClassName)}
      {...modalProps}
    >
      {toAddress && (
        <div className="mb-4 flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
          <WarningRounded className="!h-10 !w-10" />

          <div className="min-w-0 space-y-2">
            <p>{t('info.verifyAddressMatches')}</p>

            <CopyToClipboard
              className="w-full"
              takeStartEnd={{ start: 10, end: 8 }}
              value={toAddress}
            />
          </div>
        </div>
      )}

      <div className="relative max-h-full min-h-[48rem] w-full shrink-0 grow">
        <div className="absolute z-10 flex w-full flex-col items-center justify-center p-10">
          <Loader />
        </div>

        {iframeVisible && (
          <iframe
            className="relative z-20 h-full w-full rounded-md"
            ref={(ref) => {
              if (ref) {
                ref.parentElement?.parentElement?.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            }}
            src={`https://app.kado.money/?${queryString.stringify({
              apiKey: KADO_API_KEY,
              onRevCurrency: 'USDC',
              offPayCurrency: 'USDC',
              offRevCurrency: 'USDC',
              product: defaultMode?.toUpperCase(),
              onToAddress: toAddress,
              network,
              cryptoList: 'USDC',
              networkList: network,
            })}`}
          />
        )}
      </div>
    </Modal>
  )
}
