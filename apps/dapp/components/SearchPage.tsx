import { PlusIcon } from '@heroicons/react/outline'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import Link from 'next/link'
import { FC } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { DecorativeTriangle } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'
import {
  SEARCH_API_KEY,
  SEARCH_URL,
  MULTISIG_INDEX,
  DAO_INDEX,
} from '@dao-dao/utils'

import { SearchBox } from '@components/SearchBar'
import { SearchHits } from '@components/SearchHits'

const searchClient = instantMeiliSearch(SEARCH_URL, SEARCH_API_KEY)

export interface SearchPageProps {
  multisig?: boolean
}

export const SearchPage: FC<SearchPageProps> = ({ multisig }) => (
  <InstantSearch
    indexName={multisig ? MULTISIG_INDEX : DAO_INDEX}
    searchClient={searchClient}
  >
    <div className="max-w-5xl">
      <div className="p-4 w-full md:p-6">
        <div className="flex justify-between items-center">
          <h1 className="header-text">{multisig ? 'Multisigs' : 'DAOs'}</h1>
          <Link href={`/${multisig ? 'multisig' : 'dao'}/create`} passHref>
            <Button size="sm">
              Create a {multisig ? 'Multisig' : 'DAO'}{' '}
              <PlusIcon className="inline w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="px-1 mt-6 mb-3 md:px-2">
          <div className="flex gap-1.5 items-center mb-5">
            <DecorativeTriangle color="currentcolor" height={24} width={24} />
            <h2 className="primary-text">
              Search for a {multisig ? 'Multisig' : 'DAO'}
            </h2>
          </div>
          <SearchBox />
        </div>
        <SearchHits multisig={multisig} />
      </div>
    </div>
  </InstantSearch>
)
