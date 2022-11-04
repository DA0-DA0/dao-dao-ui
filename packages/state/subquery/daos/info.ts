import { gql, useQuery } from '@apollo/client'

const GET_DAOS = gql`
  query GetDaos($coreAddresses: [String!]!) @api(contextKey: "apiName") {
    daos(filter: { id: { in: $coreAddresses } }) {
      nodes {
        coreAddress: id
        name
        description
        imageUrl
        created
        parentDao {
          coreAddress: id
          name
          imageUrl
        }
      }
    }
  }
`

interface GetDaos {
  daos: {
    nodes: {
      coreAddress: string
      name: string
      description: string
      imageUrl?: string | null
      // Serialized Date
      created: string
      parentDao: {
        coreAddress: string
        name: string
        imageUrl?: string | null
      } | null
    }[]
  }
}

interface GetDaosOperationVariables {
  coreAddresses: string[]
}

export type GetDaosApiName = 'mainnetDaos' | 'daos'

export const useGetDaos = (
  variables: GetDaosOperationVariables,
  apiName: GetDaosApiName = 'daos'
) =>
  useQuery<GetDaos, GetDaosOperationVariables>(GET_DAOS, {
    variables,
    context: {
      apiName,
    },
    // Refresh every 60 seconds.
    pollInterval: 60 * 1000,
  })
