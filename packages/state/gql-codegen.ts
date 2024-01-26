import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './graphql/stargaze/schema.graphql',
  documents: ['./graphql/**/*.ts'],
  generates: {
    './graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        scalars: {
          MicroAmount: 'number',
        },
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
