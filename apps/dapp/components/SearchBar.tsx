import { FC } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { useTranslation } from '@dao-dao/i18n'

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
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center px-3 text-tertiary border-b border-default">
      <input
        autoFocus
        className="py-4 px-2 w-full bg-transparent focus:outline-none primary-text focus:ring-none"
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder={t('What are you looking for?')}
        type="text"
        value={currentRefinement}
      />
    </div>
  )
}

export const SearchBox = connectSearchBox(SearchBoxInternal)
