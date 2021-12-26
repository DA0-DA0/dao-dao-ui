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

export interface DaoListType {
  address: string
  member: boolean
  dao: any
}

export function useDaosList(codeId: number) {
  const [daos, setDaos] = useState<Array<DaoListType>>([])
  const [loading, setLoading] = useState(false)
  const { signingClient, walletAddress } = useSigningClient()

  // Get list of DAO info
  useEffect(() => {
    if (!signingClient || !walletAddress) {
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
          const voterInfo = await signingClient?.queryContractSmart(address, {
            voter: {
              address: walletAddress,
            },
          })
          if (daoInfo?.config) {
            const config = {
              ...daoInfo.config,
              address,
              member: voterInfo.weight !== '0',
            }
            daoList.push(config)
          }
        }

        setDaos(daoList)
        setLoading(false)
      }
    }
    getDaos()
  }, [signingClient, codeId, walletAddress])

  return { daos, loading }
}
