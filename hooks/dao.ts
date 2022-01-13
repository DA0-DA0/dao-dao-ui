import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'

export function useDaoConfig(contractAddress: string) {
  let { signingClient } = useSigningClient()
  let [daoInfo, setDaoInfo] = useState<ConfigResponse>()
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let getDaoInfo = async () => {
      setLoading(true)
      try {
        let dao = await signingClient?.queryContractSmart(contractAddress, {
          get_config: {},
        })
        setDaoInfo(dao)
      } catch (e) {
        setError(e as Error)
      }
      setLoading(false)
    }
    getDaoInfo()
  }, [signingClient, contractAddress])

  return { daoInfo, loading, error }
}
