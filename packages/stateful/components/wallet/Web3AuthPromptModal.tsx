import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { web3AuthPromptAtom } from '@dao-dao/state/recoil'
import {
  ActionsMatchAndRender,
  Button,
  ChainProvider,
  CosmosMessageDisplay,
  Modal,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg, protobufToCwMsg } from '@dao-dao/types'
import {
  SignDoc,
  TxBody,
} from '@dao-dao/types/protobuf/codegen/cosmos/tx/v1beta1/tx'
import { getChainForChainId } from '@dao-dao/utils'

import { WalletActionsProvider } from '../../actions/providers/wallet'
import { useWallet } from '../../hooks/useWallet'
import { EntityDisplay } from '../EntityDisplay'
import { SuspenseLoader } from '../SuspenseLoader'

export const Web3AuthPromptModal = () => {
  const { t } = useTranslation()
  const prompt = useRecoilValue(web3AuthPromptAtom)

  const decoded = useMemo(() => {
    if (!prompt) {
      return
    }

    if (prompt.signData.type === 'direct') {
      const messages = TxBody.decode(
        prompt.signData.value.bodyBytes
      ).messages.map(
        (msg) =>
          protobufToCwMsg(
            getChainForChainId((prompt.signData.value as SignDoc).chainId),
            msg
          ).msg
      )

      return {
        type: 'cw' as const,
        messages,
      }
    } else if (prompt.signData.type === 'amino') {
      return {
        type: 'amino' as const,
        messages: prompt.signData.value.msgs,
      }
    }
  }, [prompt])

  const chainId =
    prompt &&
    (prompt.signData.type === 'direct'
      ? prompt.signData.value.chainId
      : prompt.signData.value.chain_id)
  const { address } = useWallet({ chainId })

  return (
    <Modal
      backdropClassName="!z-[100]"
      containerClassName="!w-[48rem]"
      footerContainerClassName="flex flex-row gap-4 justify-between"
      footerContent={
        <>
          <Button
            center
            className="grow"
            onClick={() => prompt?.resolve(false)}
            variant="secondary"
          >
            {t('button.reject')}
          </Button>

          <Button
            center
            className="grow"
            onClick={() => prompt?.resolve(true)}
            variant="primary"
          >
            {t('button.approve')}
          </Button>
        </>
      }
      header={{
        title: t('title.reviewTransaction'),
      }}
      headerContent={
        <div className="mt-1 flex flex-row items-center gap-3">
          <p className="title-text font-normal text-text-secondary">
            {t('title.signingAs')}:
          </p>
          {address && chainId && (
            <ChainProvider chainId={chainId}>
              <EntityDisplay address={address} />
            </ChainProvider>
          )}
        </div>
      }
      onClose={() => prompt?.resolve(false)}
      visible={!!prompt}
    >
      {chainId && (
        <ChainProvider chainId={chainId}>
          {decoded &&
            (decoded.type === 'cw' ? (
              <WalletActionsProvider>
                <WalletActionsRenderer messages={decoded.messages} />
              </WalletActionsProvider>
            ) : (
              <CosmosMessageDisplay
                value={JSON.stringify(decoded.messages, undefined, 2).replace(
                  /\\n/g,
                  '\n'
                )}
              />
            ))}
        </ChainProvider>
      )}
    </Modal>
  )
}

const WalletActionsRenderer = ({
  messages,
}: {
  messages: UnifiedCosmosMsg[]
}) => (
  <ActionsMatchAndRender
    SuspenseLoader={SuspenseLoader}
    hideCopyLink
    messages={messages}
  />
)
