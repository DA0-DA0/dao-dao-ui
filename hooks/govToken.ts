import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'

export function useTokenConfig(contractAddress: string | undefined) {
  let { signingClient } = useSigningClient()
  let [tokenInfo, setTokenInfo] = useState<any | undefined>()

  useEffect(() => {
    if (!contractAddress) {
      return
    }

    let getDaoInfo = async () => {
      let token = await signingClient?.queryContractSmart(contractAddress, {
        token_info: {},
      })
      setTokenInfo(token)
    }
    getDaoInfo()
  }, [signingClient, contractAddress])

  return { tokenInfo }
}
