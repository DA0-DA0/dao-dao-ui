import { FC } from 'react'

import { connectHits } from 'react-instantsearch-dom'

import { ContractCard } from './ContractCard'

interface Hit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  type: 'dao' | 'multisig'
  treasury_balance: string
}

const Hit = ({ hit }: { hit: Hit }) => (
  <ContractCard
    balance={hit.treasury_balance}
    description={hit.description}
    href={`/dao/${hit.id}`}
    imgUrl={hit.image_url}
    name={hit.name}
    proposals={hit.proposal_count}
  />
)

// Need to use `any` here as instantsearch does't export the required
// types.
const HitsInternal: FC<any> = ({ hits }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {hits.map((hit: Hit) => (
      <Hit key={hit.id} hit={hit} />
    ))}
  </div>
)

export const SearchHits = connectHits(HitsInternal)
