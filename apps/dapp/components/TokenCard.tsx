// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useRouter } from 'next/router'

import { useDaoInfoContext } from '@dao-dao/common'
import { TokenCardInfo } from '@dao-dao/tstypes/dao'
import { TokenCard as StatelessTokenCard } from '@dao-dao/ui'
import { useAddToken } from '@dao-dao/utils'

export const TokenCard = (props: TokenCardInfo) => {
  const router = useRouter()
  const { coreAddress } = useDaoInfoContext()

  const addToken = useAddToken()

  return (
    <StatelessTokenCard
      {...props}
      onAddToken={
        addToken && props.cw20Address
          ? () => props.cw20Address && addToken(props.cw20Address)
          : undefined
      }
      // TODO: Make prefill message.
      onProposeClaim={() =>
        router.push(`/dao/${coreAddress}/proposals/create?prefill=`)
      }
      // TODO: Make prefill message.
      onProposeStakeUnstake={() =>
        router.push(`/dao/${coreAddress}/proposals/create?prefill=`)
      }
    />
  )
}
