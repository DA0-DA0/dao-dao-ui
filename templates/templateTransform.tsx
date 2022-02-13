import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { MessageTemplate } from './templateList'
import { messageTemplates } from './templateList'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'

export const toCosmMessage = (
  contractAddress: string,
  messages: MessageTemplate[],
  daoInfo: ConfigResponse,
  tokenInfo: TokenInfoResponse
): string => {
  // Perhaps watch fields array for messages
  let cosmMsgs = messages.map((m: MessageTemplate) => {
    const template = messageTemplates.find(
      (template) => template.label === m.label
    )

    const toCosmosMsg = template?.toCosmosMsg

    // Unreachable.
    if (!toCosmosMsg) return {}

    return toCosmosMsg(m as any, {
      sigAddress: contractAddress,
      govAddress: daoInfo.gov_token,
      govDecimals: tokenInfo.decimals,
      multisig: false,
    })
  })

  return JSON.stringify(cosmMsgs, null, 2)
}
