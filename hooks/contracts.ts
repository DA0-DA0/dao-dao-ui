import { useSigningClient } from 'contexts/cosmwasm'
import { useState, useEffect } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'

export function useCodeListContracts(codeId: number) {
  const [multisigs, setConracts] = useState<Array<Contract>>([])
  const { signingClient } = useSigningClient()
  const [loading, setLoading] = useState(false)

  // Get list of contracts by code ID
  useEffect(() => {
    const getConracts = async () => {
      setLoading(true)
      try {
        const contracts = await signingClient?.getContracts(codeId)
        if (contracts) {
          Promise.all(
            contracts.map((address) => signingClient?.getContract(address))
          ).then((list) => {
            const filtered = list.filter(
              (item) => item !== undefined
            ) as Array<Contract>
            if (list) setConracts(filtered)
          })
          setLoading(false)
        }
      } catch (e) {
        // Handles the edge case where there are no contracts at
        // all and the API throws.
        setLoading(false)
        return []
      }
    }
    getConracts()
  }, [signingClient, codeId])
  return { multisigs, loading }
}
