import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { web3AuthPromptAtom } from '@dao-dao/state/recoil'
import {
  ActionsRenderer,
  Button,
  ChainProvider,
  CosmosMessageDisplay,
  Modal,
} from '@dao-dao/stateless'
import { ActionAndData, protobufToCwMsg } from '@dao-dao/types'
import {
  SignDoc,
  TxBody,
} from '@dao-dao/types/protobuf/codegen/cosmos/tx/v1beta1/tx'
import { decodeMessages, getChainForChainId } from '@dao-dao/utils'

import { useActionsForMatching } from '../../actions'
import { WalletActionsProvider } from '../../actions/react/provider'
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
      const messages = decodeMessages(
        TxBody.decode(prompt.signData.value.bodyBytes).messages.map(
          (msg) =>
            protobufToCwMsg(
              getChainForChainId((prompt.signData.value as SignDoc).chainId),
              msg
            ).msg
        )
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

  // Re-create when messages change so that hooks are called in the same order.
  const WalletActionsRenderer = useMemo(
    () =>
      makeWalletActionsRenderer(decoded?.type === 'cw' ? decoded.messages : []),
    [decoded]
  )

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
                <WalletActionsRenderer />
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

const makeWalletActionsRenderer = (messages: Record<string, any>[]) =>
  function WalletActionsRenderer() {
    const { t } = useTranslation()
    const actionsForMatching = useActionsForMatching()

    // Call relevant action hooks in the same order every time.
    const actionData: ActionAndData[] = messages.map((message) => {
      const actionMatch = actionsForMatching
        .map((action) => ({
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      // There should always be a match since custom matches all. This should
      // never happen as long as the Custom action exists.
      if (!actionMatch?.match) {
        throw new Error(t('error.loadingData'))
      }

      return {
        action: actionMatch.action,
        data: actionMatch.data,
      }
    })

    return (
      <ActionsRenderer
        SuspenseLoader={SuspenseLoader}
        actionData={actionData}
        hideCopyLink
      />
    )
  }
