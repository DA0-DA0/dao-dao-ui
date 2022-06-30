import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { FC } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { SearchBox, SearchHits } from '@/components'

export interface SearchModalProps {
  onClose: () => void
}

const searchClient = instantMeiliSearch(SEARCH_URL, SEARCH_API_KEY)

export const SearchModal: FC<SearchModalProps> = ({ onClose }) => (
  <Modal
    containerClassName="p-0 border-none w-full max-w-[850px] h-[650px] max-h-[90vh]"
    hideCloseButton
    onClose={onClose}
  >
    <InstantSearch indexName={SEARCH_INDEX} searchClient={searchClient}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-primary">
        <SearchBox />
        <SearchHits />
      </div>
    </InstantSearch>
  </Modal>
)
