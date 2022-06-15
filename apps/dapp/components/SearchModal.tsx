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
    containerClassName="p-0 border-none w-full max-w-4xl max-w-[850px] h-[600px]"
    hideCloseButton={true}
    onClose={onClose}
  >
    <InstantSearch indexName={SEARCH_INDEX} searchClient={searchClient}>
      <div className="overflow-hidden overflow-y-auto p-4 w-full h-full bg-primary rounded-lg">
        <div className="md:sticky md:top-0 md:z-10">
          <SearchBox />
        </div>
        <SearchHits />
      </div>
    </InstantSearch>
  </Modal>
)
