import { gql, useQuery } from '@apollo/client'

const SEARCH_DAOS = gql`
  query SearchDaos($query: String = "") @api(name: daos) {
    daos(
      first: 7
      filter: {
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
}

export const useSearchDaos = ({ query }: SearchDaosOperationVariables) =>
  useQuery<SearchDaos, SearchDaosOperationVariables>(SEARCH_DAOS, {
    variables: {
      query,
    },
  })
