import { StdSignDoc } from '@cosmjs/amino'
import { DirectSignDoc } from '@cosmos-kit/core'
import { useIframe } from '@cosmos-kit/react-lite'

import { TxBody } from '@dao-dao/protobuf/codegen/cosmos/tx/v1beta1/tx'
import {
  BrowserTab as StatelessBrowserTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  aminoTypes,
  decodeMessages,
  decodedStargateMsgToCw,
  protobufToCwMsg,
} from '@dao-dao/utils'
export const BrowserTab = () => {
  const {
    name,
    chainId: currentChainId,
    coreAddress,
    polytoneProxies,
  } = useDaoInfoContext()

  const decodeDirect = (signDocBodyBytes: Uint8Array) => {
    const encodedMessages = TxBody.decode(signDocBodyBytes).messages
    console.log('direct encoded', encodedMessages)
    const messages = decodeMessages(
      encodedMessages.map((msg) => protobufToCwMsg(msg).msg)
    )
    console.log('direct decoded', messages)
  }
  const decodeAmino = (signDoc: StdSignDoc) => {
    console.log('amino encoded', signDoc.msgs)
    const messages = signDoc.msgs.map(
      (msg) => decodedStargateMsgToCw(aminoTypes.fromAmino(msg)).msg
    )
    console.log('amino decoded', messages)
  }

  const iframeRef = useIframe({
    accountReplacement: (chainId) => {
      const address =
        chainId === currentChainId ? coreAddress : polytoneProxies[chainId]
      if (address) {
        return {
          username: name,
          address,
        }
      }
    },
    walletClientOverrides: {
      signAmino: (_chainId: string, _signer: string, signDoc: StdSignDoc) => {
        decodeAmino(signDoc)
        return true
      },
      signDirect: (
        _chainId: string,
        _signer: string,
        signDoc: DirectSignDoc
      ) => {
        if (!signDoc?.bodyBytes) {
          return false
        }

        decodeDirect(signDoc.bodyBytes)
        return true
      },
    },
    aminoSignerOverrides: {
      signAmino: (_signerAddress, signDoc) => {
        decodeAmino(signDoc)
        return true
      },
    },
    directSignerOverrides: {
      signDirect: (_signerAddress, signDoc) => {
        decodeDirect(signDoc.bodyBytes)
        return true
      },
    },
  })

  return <StatelessBrowserTab iframeRef={iframeRef} />
}
