import { gql, useQuery } from '@apollo/client'
import { ChainInfoID } from '@noahsaso/cosmodal'

import { CHAIN_ID } from '@dao-dao/utils'

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

export type GetDaosApiName = 'daos' | 'testnetDaos'

export const useGetDaos = (
  variables: GetDaosOperationVariables,
  apiName?: GetDaosApiName
) =>
  useQuery<GetDaos, GetDaosOperationVariables>(GET_DAOS, {
    variables,
    context: {
      apiName:
        apiName ||
        // Set default based on chain ID.
        (CHAIN_ID === ChainInfoID.Juno1 ? 'daos' : 'testnetDaos'),
    },
  })
