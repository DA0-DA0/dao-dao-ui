import { gql, useQuery } from '@apollo/client'
import { ChainInfoID } from '@noahsaso/cosmodal'

import { CHAIN_ID } from '@dao-dao/utils'

const SEARCH_DAOS = gql`
  query SearchDaos($query: String = "", $limit: Int!, $exclude: [String!] = [])
  @api(contextKey: "apiName") {
    daos(
      first: $limit
      filter: {
        id: { notIn: $exclude }
        or: [
          { name: { includesInsensitive: $query } }
          { description: { includesInsensitive: $query } }
        ]
      }
    ) {
      nodes {
        coreAddress: id
        name
        imageUrl
      }
    }
  }
`

interface SearchDaos {
  daos: {
    nodes: {
      coreAddress: string
      name: string
      imageUrl?: string | null
    }[]
  }
}

interface SearchDaosOperationVariables {
  query: string
  limit: number
  exclude?: string[]
}

type SearchDaosApiName = 'daos' | 'testnetDaos'

export const useSearchDaos = (
  variables: SearchDaosOperationVariables,
  apiName?: SearchDaosApiName
) =>
  useQuery<SearchDaos, SearchDaosOperationVariables>(SEARCH_DAOS, {
    variables,
    context: {
      apiName:
        apiName ||
        // Set default based on chain ID.
        (CHAIN_ID === ChainInfoID.Juno1 ? 'daos' : 'testnetDaos'),
    },
  })
