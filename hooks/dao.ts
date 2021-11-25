import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'

export interface DaoListType {
  address: string
  name: string
  description: string
}

export function useDaosList(codeId: number) {
  const [daos, setDaos] = useState<Array<DaoListType>>([])
  const [loading, setLoading] = useState(false)
  const { signingClient } = useSigningClient()

  // Get list of DAO info
  useEffect(() => {
    if (!signingClient) {
      return
    }
    const getDaos = async () => {
      setLoading(true)
      let contracts = await signingClient?.getContracts(codeId)

      const daoList = []
      if (contracts) {
        for (let address of contracts) {
          const daoInfo = await signingClient?.queryContractSmart(address, {
            get_config: {},
          })
          if (daoInfo?.config) {
            const config = {
              ...daoInfo.config,
              address,
            }
            daoList.push(config)
          }
        }

        setDaos(daoList)
        setLoading(false)
      }
    }
    getDaos()
  }, [signingClient])

  return { daos, loading }
}
