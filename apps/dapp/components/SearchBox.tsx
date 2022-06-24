import { FC } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { SearchBar } from '@dao-dao/ui'

interface SearchBoxInternalProps {
  refine: (...args: any[]) => any
  currentRefinement: string
  isSearchStalled: boolean
}

const SearchBoxInternal: FC<SearchBoxInternalProps> = ({
  currentRefinement,
  refine,
}) => (
  <SearchBar
    onChange={(event) => refine(event.currentTarget.value)}
    value={currentRefinement}
  />
)

export const SearchBox = connectSearchBox(SearchBoxInternal)
