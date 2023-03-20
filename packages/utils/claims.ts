import { Claim } from '@dao-dao/types/contracts/Cw20Stake'
import { NftClaim } from '@dao-dao/types/contracts/DaoVotingCw721Staked'

export function claimAvailable(claim: Claim | NftClaim, blockHeight: number) {
  if ('at_height' in claim.release_at) {
    return blockHeight >= claim.release_at.at_height
  } else if ('at_time' in claim.release_at) {
    const currentTimeNs = new Date().getTime() * 1000000
    return currentTimeNs >= Number(claim.release_at.at_time)
  }

  // Unreachable.
  return false
}
