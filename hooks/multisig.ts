import { useSigningClient } from 'contexts/cosmwasm'
import { useState, useEffect } from 'react'

export interface MultisigListType {
  address: string
  label: string
  member: boolean
}

export function useMultisigsList(codeId: number) {
  const [multisigs, setMultisigs] = useState<Array<MultisigListType>>([])
  const { signingClient, walletAddress } = useSigningClient()
  const [loading, setLoading] = useState(false)

  // Get list of MULTISIG info
  useEffect(() => {
    if (!signingClient || !walletAddress) {
      return
    }

    const getMultisigs = async () => {
      setLoading(true)
      const contracts = await signingClient?.getContracts(codeId)

      const sigList = []
      if (contracts) {
        for (const address of contracts) {
          const sigInfo = await signingClient?.getContract(address)
          const voterInfo = await signingClient?.queryContractSmart(address, {
            voter: {
              address: walletAddress,
            },
          })
          if (sigInfo) {
            sigList.push({
              ...sigInfo,
              member: voterInfo.weight !== '0',
            })
          }
        }
      }

      setMultisigs(sigList)
      setLoading(false)
    }
    getMultisigs()
  }, [signingClient, codeId])

  return { multisigs, loading }
}
