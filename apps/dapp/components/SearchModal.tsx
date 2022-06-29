import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { FC, useState } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { SearchBox, SearchHits } from '@/components'
import { daoSelector } from '@/../../packages/state/recoil/selectors/clients/cw4-voting'
import { useRouter } from 'next/router'

export interface SearchModalProps {
  onClose: () => void
}

const searchClient = instantMeiliSearch(SEARCH_URL, SEARCH_API_KEY)

type SearchState =
  | { type: 'home' }
  | { type: 'find_dao' }
  | { type: 'dao_chosen'; id: string; name: string }

const SearchNavElem: FC<{ name: string }> = ({ name }) => (
  <div className="p-2 font-medium rounded-md bg-secondary w-fit">{name}</div>
)

export const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const router = useRouter()
  const [searchState, setSearchState] = useState<SearchState>({ type: 'home' })

  return (
    <Modal
      containerClassName="p-0 border w-full max-w-[750px] h-[450px] max-h-[90vh]"
      hideCloseButton
      onClose={onClose}
    >
      {/* Modify Meili-search options here based on `searchState` */}
      <InstantSearch indexName={SEARCH_INDEX} searchClient={searchClient}>
        <div className="flex overflow-hidden flex-col w-full h-full bg-primary rounded-lg">
          <div className="flex px-4 pt-4 text-tertiary">
            <SearchNavElem name="Home" />
            {searchState.type == 'find_dao' ? (
              <SearchNavElem name="Searching DAOs" />
            ) : searchState.type == 'dao_chosen' ? (
              <SearchNavElem name={daoSelector.name} />
            ) : undefined}
          </div>
          {/* You need to modify the architecture of the box and hits here... */}
          <SearchBox />
          <SearchHits onEnter={(hit) => router.push(`/dao/${hit.id}`)} />
        </div>
      </InstantSearch>
    </Modal>
  )
}
