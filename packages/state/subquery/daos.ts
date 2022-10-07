import { gql, useQuery } from '@apollo/client'

const SEARCH_DAOS = gql`
  query SearchDaos($query: String = "", $limit: Int!, $exclude: [String!] = [])
  @api(name: daos) {
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

export const useSearchDaos = (variables: SearchDaosOperationVariables) =>
  useQuery<SearchDaos, SearchDaosOperationVariables>(SEARCH_DAOS, {
    variables,
  })
