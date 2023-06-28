import { useWallet } from '@noahsaso/cosmodal'
import { TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ActionsRenderer,
  Button,
  CosmosMessageDisplay,
  Modal,
  useAppContext,
} from '@dao-dao/stateless'
import { CategorizedActionAndData } from '@dao-dao/types'
import { decodeMessages, protobufToCwMsg } from '@dao-dao/utils'

import { useActionsForMatching } from '../../actions'
import { WalletActionsProvider } from '../../actions/react/provider'
import { EntityDisplay } from '../EntityDisplay'
import { SuspenseLoader } from '../SuspenseLoader'

export const Web3AuthPromptModal = () => {
  const { t } = useTranslation()
  const { web3AuthPrompt: prompt } = useAppContext()
  const { address } = useWallet()

  const decoded = useMemo(() => {
    if (!prompt) {
      return
    }

    if (prompt.signData.type === 'direct') {
      const messages = decodeMessages(
        TxBody.decode(prompt.signData.value.bodyBytes).messages.map(
          (msg) => protobufToCwMsg(msg).msg
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

  return (
    <Modal
      containerClassName="!w-[48rem] !max-w-[90vw]"
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
          {address && <EntityDisplay address={address} />}
        </div>
      }
      onClose={() => prompt?.resolve(false)}
      visible={!!prompt}
    >
      {decoded &&
        (decoded.type === 'cw' ? (
          <WalletActionsProvider>
            <WalletActionsRenderer />
          </WalletActionsProvider>
        ) : (
          <CosmosMessageDisplay
            value={JSON.stringify(decoded.messages, undefined, 2)}
          />
        ))}
    </Modal>
  )
}

const makeWalletActionsRenderer = (messages: Record<string, any>[]) =>
  function WalletActionsRenderer() {
    const { t } = useTranslation()
    const actionsForMatching = useActionsForMatching({ isCreating: false })

    // Call relevant action hooks in the same order every time.
    const actionData: CategorizedActionAndData[] = messages.map((message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
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
        category: actionMatch.category,
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
