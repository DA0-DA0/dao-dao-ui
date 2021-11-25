import { exec } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { dedupe } from 'ts-dedupe'

dotenv.config({ path: '.env.local' })

const DAO_NAME = 'dao-contracts'
const TYPES_DIR = 'types'

export async function codegen(directories: string[], outputPath: string) {
  const promises = []
  for (const dir of directories) {
    promises.push(codegenDirectory(outputPath, dir))
  }
  fs.writeFileSync(
    path.join(outputPath, 'tsconfig.json'),
    `{
      "compilerOptions": {
        "target": "es2017",
        "lib": ["esnext"],
        "baseUrl": ".",
        "sourceMap": true
      },
      "include": ["*.ts"],
      "exclude": ["node_modules"]
    }    
  `
  )
  await Promise.all(promises)
  dedupe({
    project: path.join(outputPath, 'tsconfig.json'),
    duplicatesFile: path.join(outputPath, 'shared-types.d.ts'),
    barrelFile: path.join(outputPath, 'index.ts'),
  })
}

function codegenDirectory(outputDir: string, dir: string): Promise<boolean> {
  const cmd = `npx json-schema-to-typescript -i ${dir} -o ${outputDir}`

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`)
        reject(error)
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
        reject(stderr)
      }
      console.log(`stdout: ${stdout}`)
      resolve(true)
    })
  })
}

function getSchemaDirectories(rootDir: string, contracts?: string) {
  const contractList = contracts?.split(',').map((dir) => dir.trim()) ?? []
  const directories: string[] = []
  if (contractList.length) {
    // get the schema directory for each contract
    for (const contractName in contractList) {
      const schemaDir = path.join(rootDir, contractName, 'schema')
      directories.push(schemaDir)
    }
  } else {
    // get all the schema directories in all the contract directories
  }
  return directories
}

function main() {
  const outputPath = path.join(TYPES_DIR, DAO_NAME)
  const daodaoContractsDir =
    process.env.DAODAO_SCHEMA_ROOT ?? '../dao-contracts/contracts'
  const daodaoDirectories = getSchemaDirectories(
    daodaoContractsDir,
    process.env.DAODAO_CONTRACTS
  )
  const cwplusContractsDir =
    process.env.CWPLUS_SCHEMA_ROOT ?? '../cw-plus/contracts'
  const cwplusDirectories = getSchemaDirectories(
    cwplusContractsDir,
    process.env.CWPLUS_CONTRACTS
  )
  codegen([...cwplusDirectories, ...daodaoDirectories], outputPath)
}

main()
