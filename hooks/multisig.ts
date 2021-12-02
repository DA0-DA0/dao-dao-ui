import { useSigningClient } from 'contexts/cosmwasm'
import { useState, useEffect } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'

export function useMultisigsList(codeId: number) {
  const [multisigs, setMultisigs] = useState<Array<Contract>>([])
  const { signingClient } = useSigningClient()
  const [loading, setLoading] = useState(false)

  // Get list of MULTISIG info
  useEffect(() => {
    const getMultisigs = async () => {
      setLoading(true)
      try {
        const contracts = await signingClient?.getContracts(codeId)

        const multisigList: Array<Contract> = []
        if (contracts) {
          Promise.all(
            contracts.map((address) => signingClient?.getContract(address))
          ).then((list) => {
            const filtered = list.filter(
              (item) => item !== undefined
            ) as Array<Contract>
            if (list) setMultisigs(filtered)
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
    getMultisigs()
  }, [signingClient])
  return { multisigs, loading }
}
