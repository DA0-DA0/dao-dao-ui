import { SearchIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import i18n from '@dao-dao/i18n'

interface SearchBoxInternalProps {
  refine: (...args: any[]) => any
  currentRefinement: string
  isSearchStalled: boolean
}

// max-w-[812px] set because this is the width of three search hit boxes and
// their padding. Setting this width then makes the search box align with a
// set of search results.
const SearchBoxInternal: FC<SearchBoxInternalProps> = ({
  currentRefinement,
  refine,
}) => (
  <div className="group flex gap-1.5 items-center px-3 max-w-[812px] text-tertiary bg-light rounded-lg border border-focus focus-within:border-default transition">
    <SearchIcon className="w-4" />
    <input
      autoFocus
      className="py-2 w-full bg-transparent focus:outline-none secondary-text focus:ring-none"
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder={i18n.t('Search')}
      type="text"
      value={currentRefinement}
    />
  </div>
)

export const SearchBox = connectSearchBox(SearchBoxInternal)
