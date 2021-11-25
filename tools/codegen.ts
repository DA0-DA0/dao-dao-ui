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
  const options = {
    project: path.join(outputPath, 'tsconfig.json'),
    duplicatesFile: path.join(outputPath, 'shared-types.d.ts'),
    barrelFile: path.join(outputPath, 'index.ts'),
    retainEmptyFiles: false,
  }
  try {
    fs.unlinkSync(options.barrelFile)
  } catch (e) {
    console.error(e)
  }
  try {
    fs.unlinkSync(options.duplicatesFile)
  } catch (e) {
    console.error(e)
  }
  dedupe(options)
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
      resolve(true)
    })
  })
}

function getSchemaDirectories(
  rootDir: string,
  contracts?: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const contractList = contracts?.split(',').map((dir) => dir.trim()) ?? []
    const directories: string[] = []
    if (contractList.length) {
      // get the schema directory for each contract
      for (const contractName of contractList) {
        const schemaDir = path.join(rootDir, contractName, 'schema')
        directories.push(schemaDir)
      }
      resolve(directories)
    } else {
      // get all the schema directories in all the contract directories
      fs.readdir(rootDir, (err, dirEntries) => {
        // console.log(`entries for ${rootDir}`)
        // console.dir(dirEntries)
        if (err) console.error(err)
        dirEntries.forEach((entry) => {
          // console.log(`processing entry ${entry}`)
          try {
            const schemaDir = path.resolve(rootDir, entry, 'schema')
            if (fs.lstatSync(schemaDir).isDirectory()) {
              // console.log(`adding ${schemaDir}`)
              directories.push(schemaDir)
            } else {
              console.log(`${schemaDir} is not a directory`)
            }
          } catch (e) {
            // console.warn(e)
          }
        })
        resolve(directories)
      })
    }
  })
}

async function main() {
  const outputPath = path.join(TYPES_DIR, DAO_NAME)
  const cwPlusOutputPath = path.join(TYPES_DIR, 'cw-plus')
  const daodaoContractsDir =
    process.env.DAODAO_SCHEMA_ROOT ?? '../dao-contracts/contracts'
  const daodaoDirectories = await getSchemaDirectories(
    daodaoContractsDir,
    process.env.DAODAO_CONTRACTS
  )
  const cwplusContractsDir =
    process.env.CWPLUS_SCHEMA_ROOT ?? '../cw-plus/contracts'
  const cwplusDirectories = await getSchemaDirectories(
    cwplusContractsDir,
    process.env.CWPLUS_CONTRACTS
  )
  codegen(cwplusDirectories, cwPlusOutputPath)
  codegen(daodaoDirectories, outputPath)
}

main()
