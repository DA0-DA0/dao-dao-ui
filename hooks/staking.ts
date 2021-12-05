import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { defaultExecuteFee } from 'util/fee'

export function useStaking(contractAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
}
