import { SearchIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

interface SearchBoxInternalProps {
  refine: (...args: any[]) => any
  currentRefinement: string
  isSearchStalled: boolean
}

const SearchBoxInternal: FC<SearchBoxInternalProps> = ({
  currentRefinement,
  refine,
}) => (
  <div className="group flex gap-1.5 items-center py-2 px-2.5 text-tertiary bg-card rounded-md border border-inactive focus-within:border-default transition">
    <SearchIcon className="w-4" />
    <input
      className="w-full bg-transparent focus:outline-none secondary-text focus:ring-none"
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Search"
      type="text"
      value={currentRefinement}
    />
  </div>
)

export const SearchBox = connectSearchBox(SearchBoxInternal)
