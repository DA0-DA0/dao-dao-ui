import { gql } from '@apollo/client'

import { client } from '../client'

const GET_DAO_CREATED = gql`
  query GetDaoCreated($coreAddress: String!) @api(name: daos) {
    dao(id: $coreAddress) {
      created
    }
  }
`

interface GetDaoCreated {
  dao: {
    // Serialized Date
    created: string
  }
}

interface GetDaoCreatedOperationVariables {
  coreAddress: string
}

export const getDaoCreated = async (coreAddress: string) => {
  try {
    const result = await client.query<
      GetDaoCreated,
      GetDaoCreatedOperationVariables
    >({
      query: GET_DAO_CREATED,
      variables: {
        coreAddress,
      },
    })
    // Interpret as UTC.
    return new Date(result.data.dao.created + 'Z')
  } catch (err) {
    console.error(`getDaoCreated: ${coreAddress}`, err)
    return undefined
  }
}
