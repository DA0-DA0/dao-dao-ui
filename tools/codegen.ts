import { exec } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { dedupe } from 'ts-dedupe'
import { IDeDupeOptions } from 'ts-dedupe/dist/contracts'

dotenv.config({ path: '.env.local' })

const DAO_NAME = 'dao-contracts'
const TYPES_DIR = 'types'

function deleteFile(filePath?: string) {
  if (!filePath) {
    return
  }
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath)
    } catch (e) {
      console.error(e)
    }
  }
}

function removeDirectory(dir: string) {
  try {
    fs.rmdirSync(dir, { recursive: true })

    console.log(`${dir} is deleted!`)
  } catch (err) {
    console.error(`Error while deleting ${dir}.`)
  }
}

function writeTsconfig(outputPath: string) {
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
}

export async function codegen(directories: string[], outputPath: string) {
  const promises = []
  for (const dir of directories) {
    promises.push(codegenDirectory(outputPath, dir))
  }
  writeTsconfig(outputPath)
  await Promise.all(promises)
}

async function run(cmd: string): Promise<boolean> {
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

function codegenDirectory(outputDir: string, dir: string): Promise<boolean> {
  const cmd = `npx json-schema-to-typescript -i ${dir} -o ${outputDir}`
  return run(cmd)
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
            if (fs.existsSync(schemaDir) && fs.lstatSync(schemaDir).isDirectory()) {
              // console.log(`adding ${schemaDir}`)
              directories.push(schemaDir)
            } else {
              console.log(`${schemaDir} is not a directory`)
            }
          } catch (e) {
            console.warn(e)
          }
        })
        resolve(directories)
      })
    }
  })
}

function dedup(inputPath: string, outputPath?: string) {
  if (!outputPath) {
    outputPath = inputPath
  }
  const options: IDeDupeOptions = {
    project: path.join(inputPath, 'tsconfig.json'),
    duplicatesFile: path.join(outputPath, 'shared-types.d.ts'),
    barrelFile: path.join(outputPath, 'index.ts'),
    retainEmptyFiles: false,
  }
  deleteFile(options.barrelFile)
  deleteFile(options.duplicatesFile)
  try {
    dedupe(options)
  } catch (e) {
    console.error(e)
  }
}

function ensurePath(outputPath: string) {
  if (fs.existsSync(outputPath)) {
    return
  }
  try {
    fs.mkdirSync(outputPath)
  } catch (e) {
    console.log(e)
  }
}

async function main() {
  const contractsPath = path.join(TYPES_DIR, 'contracts')
  const daodaoOutputPath = path.join(contractsPath, DAO_NAME)
  const cwPlusOutputPath = path.join(contractsPath, 'cw-plus')
  removeDirectory(contractsPath)
  ensurePath(contractsPath)
  ensurePath(daodaoOutputPath)
  ensurePath(cwPlusOutputPath)
  const daodaoContractsDir =
    process.env.DAODAO_SCHEMA_ROOT ?? '../dao-contracts/contracts'
  const daodaoDirectories = await getSchemaDirectories(
    daodaoContractsDir,
    process.env.DAODAO_CONTRACTS
  )
  const cwPlusRoot = process.env.CWPLUS_ROOT ?? '../cw-plus'
  const cwplusContractsDir = path.join(cwPlusRoot, 'contracts')
  const cwPlusPackagesDir = path.join(cwPlusRoot, 'packages')

  const cwplusDirectories = await getSchemaDirectories(
    cwplusContractsDir,
    process.env.CWPLUS_CONTRACTS
  )
  const cwplusPackageDirectories = await getSchemaDirectories(
    cwPlusPackagesDir,
    process.env.CWPLUS_CONTRACTS
  )
  // Gen into subdirectories
  await codegen(
    [...cwplusDirectories, ...cwplusPackageDirectories],
    cwPlusOutputPath
  )
  await codegen(daodaoDirectories, daodaoOutputPath)
  dedup(cwPlusOutputPath)
  dedup(daodaoOutputPath)
}

main()
