/**
 * Generate types, clients, and queries for CosmWasm contracts based on their
 * schema JSON.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import codegen from '@cosmwasm/ts-codegen'
import { Command } from 'commander'

const TMP_FOLDER = '.cwgen.tmp'
const CLIENTS_INDEX = path.join(__dirname, '../../state/contracts/index.ts')
const QUERIES_INDEX = path.join(
  __dirname,
  '../../state/query/queries/contracts/index.ts'
)

// Parse arguments.
const program = new Command()
program.description(
  'Generate types, clients, and queries for CosmWasm contracts, modify them for use with this codebase, and install them in the right places.'
)
program.requiredOption('-n, --name <name>', 'contract name')
program.requiredOption(
  '-p, --path <path>',
  'path to contract folder that contains "schema" folder'
)
program.option(
  // Adds inverted `indexer` boolean to the options object.
  '--no-indexer',
  "don't add indexer queries"
)
program.parse()
const { name, path: dir, indexer } = program.opts()

codegen({
  contracts: [
    {
      name,
      dir,
    },
  ],
  outPath: TMP_FOLDER,
  options: {
    types: {
      enabled: true,
    },
    client: {
      enabled: true,
    },
    reactQuery: {
      enabled: true,
      optionalClient: false,
      version: 'v4',
      mutations: false,
      queryKeys: true,
      queryFactory: true,
    },
    bundle: {
      enabled: false,
    },
    recoil: {
      enabled: false,
    },
    messageComposer: {
      enabled: false,
    },
    messageBuilder: {
      enabled: false,
    },
    useContractsHook: {
      enabled: false,
    },
  },
}).then(() => {
  // modify the generated files
  const files = fs.readdirSync('.cwgen.tmp')
  for (const file of files) {
    const contractName = file.split('.')[0]

    const filePath = path.join('.cwgen.tmp', file)
    let content = fs.readFileSync(filePath, 'utf8')

    // remove comment from beginning
    // content = content.replace(/^\/\*\*[\s\S]+\*\/\n\n/gm, '')

    // fix types imports
    content = content.replace(
      /from "\.\/(.+)\.types"/,
      'from "@dao-dao/types/contracts/$1"'
    )

    // modify types
    if (file.endsWith('.types.ts')) {
      // remove `[k: string]: unknown`
      content = content.replace(/\[k: string\]: unknown;/g, '')
    }
    // modify client
    else if (file.endsWith('.client.ts')) {
      // replace default fee with CHAIN_GAS_MULTIPLIER constant
      content = content.replace(
        /"auto" = "auto"/g,
        '"auto" = CHAIN_GAS_MULTIPLIER'
      )
      // insert import on line 3
      content = content.replace(
        'export interface',
        "import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'\n\nexport interface"
      )

      // add index export if not already added
      if (!fs.readFileSync(CLIENTS_INDEX, 'utf8').includes(contractName)) {
        fs.appendFileSync(
          CLIENTS_INDEX,
          `export { ${contractName}Client, ${contractName}QueryClient } from './${contractName}'\n`
        )
      }
    }
    // modify react-query
    else if (file.endsWith('.react-query.ts')) {
      // fix client import
      content = content.replace(
        /from "\.\/(.+)\.client"/,
        'from "../../../contracts/$1"\n'
      )
      // add imports
      content = content.replace(
        'export const',
        [
          "import { getCosmWasmClientForChainId } from '@dao-dao/utils'",
          "import { contractQueries } from '../contract'",
          ...(indexer ? ["import { indexerQueries } from '../indexer'"] : []),
          '\nexport const',
        ].join('\n')
      )
      content = content.replace(
        'import { UseQueryOptions',
        'import { QueryClient, UseQueryOptions'
      )
      // remove hooks
      content = content.replace(/\nexport function use.+\n[^;]+;\n\}/gm, '')
      // fix type bug
      content = content.replace(
        `"'queryKey' | 'queryFn' | 'initialData'"`,
        '"queryKey" | "queryFn" | "initialData"'
      )
      // remove enabled lines
      content = content.replace(/    +enabled:[^)]+\)\n/g, '')
      // replace info query with common contract info query
      content = content.replace(
        /info: <TData = InfoResponse,?>[^}]+\}[^{]+\{[^,]+,[^,]+,[^)]+\),?/m,
        'info: contractQueries.info,'
      )
      // add queryClient argument to functions
      if (indexer) {
        content = content.replace(
          /(: <TData = [^>]+>\()\{/g,
          '$1queryClient: QueryClient,{'
        )
      }
      // replace client with chain ID and contract address
      content = content.replace(
        /client: [^;]+;/g,
        'chainId: string;\n  contractAddress: string;'
      )
      content = content.replace(/client,/g, 'chainId, contractAddress,')
      content = content.replace(/client\?\.contractAddress/g, 'contractAddress')
      // add chain ID to query keys
      content = content.replace(
        /(  \w+): \(contractAddress: string/g,
        '$1: (chainId: string, contractAddress: string'
      )
      content = content.replace(
        /(QueryKeys\.[^(]+\()contractAddress/g,
        '$1chainId, contractAddress'
      )
      content = content.replace(
        /(\.\.\..+QueryKeys\.contract\[0\],\n)(\s+)(address: contractAddress)/g,
        '$1$2chainId,\n$2$3'
      )

      const camelCasedContractName =
        contractName.charAt(0).toLowerCase() + contractName.slice(1)
      content = content.replace(
        /queryFn: \(\) => client\.([^(]+)(\([^\)]*\)),/gm,
        indexer
          ? `
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: '${camelCasedContractName}/$1',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ${contractName}QueryClient(await getCosmWasmClientForChainId(chainId), contractAddress).$1$2
    },`.trim()
          : `
    queryFn: async () => {
      return new ${contractName}QueryClient(await getCosmWasmClientForChainId(chainId), contractAddress).$1$2
    },`.trim()
      )

      // add index export if not already added
      if (!fs.readFileSync(QUERIES_INDEX, 'utf8').includes(contractName)) {
        fs.appendFileSync(QUERIES_INDEX, `export * from './${contractName}'\n`)
      }
    }

    // save modified files to proper homes
    const outPath = file.endsWith('.types.ts')
      ? path.join(__dirname, '../../types/contracts/', contractName + '.ts')
      : file.endsWith('.client.ts')
      ? path.join(__dirname, '../../state/contracts/', contractName + '.ts')
      : file.endsWith('.react-query.ts')
      ? path.join(
          __dirname,
          '../../state/query/queries/contracts/',
          contractName + '.ts'
        )
      : undefined

    if (!outPath) {
      throw new Error('unexpected file: ' + file)
    }

    fs.writeFileSync(outPath, content)
  }

  // remove tmp folder
  fs.rmSync(TMP_FOLDER, { recursive: true })

  // format the generated files
  execSync(`cd ${path.join(__dirname, '../../types')} && yarn format`)
  execSync(`cd ${path.join(__dirname, '../../state')} && yarn format`)
})
