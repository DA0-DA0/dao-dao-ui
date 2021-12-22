import { useSigningClient } from 'contexts/cosmwasm'
import { useState, useEffect } from 'react'

export function useIsMember(contractAddress: string) {
  const [member, setMember] = useState<boolean>(false)
  const { signingClient, walletAddress } = useSigningClient()

  useEffect(() => {
    if (!signingClient || !walletAddress) {
      return
    }

    const getIsMember = async () => {
      const voterInfo = await signingClient?.queryContractSmart(
        contractAddress,
        {
          voter: {
            address: walletAddress,
          },
        }
      )
      setMember(voterInfo.weight !== '0')
    }

    getIsMember()
  }, [signingClient, contractAddress])

  return { member }
}
