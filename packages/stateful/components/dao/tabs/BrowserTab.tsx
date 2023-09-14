import { StdSignDoc } from '@cosmjs/amino'
import { DirectSignDoc } from '@cosmos-kit/core'
import { useIframe } from '@cosmos-kit/react-lite'

import { TxBody } from '@dao-dao/protobuf/codegen/cosmos/tx/v1beta1/tx'
import {
  BrowserTab as StatelessBrowserTab,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, CosmosMsgFor_Empty } from '@dao-dao/types'
import {
  SITE_URL,
  aminoTypes,
  decodedStargateMsgToCw,
  getDaoProposalSinglePrefill,
  getFallbackImage,
  protobufToCwMsg,
} from '@dao-dao/utils'
export const BrowserTab = () => {
  const {
    name,
    imageUrl,
    chainId: currentChainId,
    coreAddress,
    polytoneProxies,
  } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const propose = (msgs: CosmosMsgFor_Empty[]) =>
    window.open(
      getDaoProposalPath(coreAddress, 'create', {
        prefill: getDaoProposalSinglePrefill({
          title: '',
          description: '',
          actions: [
            {
              actionKey: ActionKey.Custom,
              data: {
                message: JSON.stringify(msgs, undefined, 2),
              },
            },
          ],
        }),
      }),
      '_blank'
    )

  const decodeDirect = (signDocBodyBytes: Uint8Array) => {
    const encodedMessages = TxBody.decode(signDocBodyBytes).messages
    const messages = encodedMessages.map((msg) => protobufToCwMsg(msg).msg)
    propose(messages)
  }
  const decodeAmino = (signDoc: StdSignDoc) => {
    const messages = signDoc.msgs.map(
      (msg) => decodedStargateMsgToCw(aminoTypes.fromAmino(msg)).msg
    )
    propose(messages)
  }

  const iframeRef = useIframe({
    walletInfo: {
      prettyName: name,
      logo: imageUrl || SITE_URL + getFallbackImage(coreAddress),
    },
    accountReplacement: (chainId) => {
      const address =
        chainId === currentChainId ? coreAddress : polytoneProxies[chainId]
      if (address) {
        return {
          username: name,
          address,
        }
      } else {
        throw new Error('Chain not supported.')
      }
    },
    walletClientOverrides: {
      // TODO(iframe): remove
      // @ts-ignore
      signAmino: (_chainId: string, _signer: string, signDoc: StdSignDoc) => {
        decodeAmino(signDoc)
      },
      // TODO(iframe): remove
      // @ts-ignore
      signDirect: (
        _chainId: string,
        _signer: string,
        signDoc: DirectSignDoc
      ) => {
        if (!signDoc?.bodyBytes) {
          return {
            type: 'execute',
          }
        }

        decodeDirect(signDoc.bodyBytes)
      },
    },
    aminoSignerOverrides: {
      signAmino: (_signerAddress, signDoc) => {
        decodeAmino(signDoc)
      },
    },
    directSignerOverrides: {
      signDirect: (_signerAddress, signDoc) => {
        decodeDirect(signDoc.bodyBytes)
      },
    },
  })

  return <StatelessBrowserTab iframeRef={iframeRef} />
}
