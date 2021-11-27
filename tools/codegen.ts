import { exec } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { dedupe } from 'ts-dedupe'
import {
  compileFromFile,
  Options,
  DEFAULT_OPTIONS,
} from 'json-schema-to-typescript'
import { IDeDupeOptions } from 'ts-dedupe/dist/contracts'

export type CompilationSpec = {
  contractName: string
  schemaDir: string
  schemaFiles: string[]
  outputPath: string
  options: Options
}

dotenv.config({ path: '.env.local' })

const DAO_NAME = 'dao-contracts'
const TYPES_DIR = 'types'
const CONTRACTS_OUTPUT_DIR = path.join(TYPES_DIR, 'contracts')
const TSCONFIG_DEFAULT = `{
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

const CODEGEN_NO_DEDUP = !!process.env.NO_DEDUP
const CODEGEN_LOG_LEVEL = process.env.CODEGEN_LOG_LEVEL || ''

const DEFAULT_CONFIG = {
  schemaRoots: [
    {
      name: 'dao-contracts',
      paths: [process.env.DAODAO_SCHEMA_ROOT || '../dao-contracts/contracts'],
      outputName: 'dao-contracts',
      outputDir: CONTRACTS_OUTPUT_DIR,
    },
    {
      name: 'cw-plus',
      paths: [
        process.env.CWPLUS_CONTRACTS || '../cw-plus/contracts',
        process.env.CWPLUS_PACKAGES || '../cw-plus/packages',
      ],
      outputName: 'cw-plus',
      outputDir: CONTRACTS_OUTPUT_DIR,
    },
  ],
  tsconfig: TSCONFIG_DEFAULT,
  writeTsconfig: false,
}

async function getSchemaFiles(schemaDir: string): Promise<string[]> {
  return new Promise((resove, reject) => {
    const schemaFiles: string[] = []
    fs.readdir(schemaDir, (err, dirEntries) => {
      if (err) {
        console.error(err)
      }

      dirEntries.forEach((entry) => {
        const fullPath = path.join(schemaDir, entry)
        if (entry.endsWith('.json') && fs.existsSync(fullPath)) {
          schemaFiles.push(fullPath)
        }
      })

      resove(schemaFiles)
    })
  })
}

async function schemaCompileOptions(
  contractName: string,
  contractRoot: string,
  outputDir: string,
  schemaDir: string
): Promise<CompilationSpec> {
  const schemaFiles = await getSchemaFiles(schemaDir)
  const outputPath = path.join(outputDir, contractRoot, contractName)
  const options: Options = {
    ...DEFAULT_OPTIONS,
    bannerComment: '',
    format: false,
  }
  return {
    contractName,
    schemaDir,
    schemaFiles,
    outputPath,
    options,
  }
}

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

function writeTsconfig(outputPath: string, tsconfig = TSCONFIG_DEFAULT) {
  fs.writeFileSync(path.join(outputPath, 'tsconfig.json'), tsconfig)
}

export async function codegen(directories: string[][], outputPath: string) {
  const promises = []
  for (const [dir, contractName] of directories) {
    promises.push(codegenDirectory(outputPath, dir, contractName))
  }
  await Promise.all(promises)
}

async function run(cmd: string): Promise<boolean> {
  if (CODEGEN_LOG_LEVEL === 'verbose') {
    console.log(cmd)
  }
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

async function codegenDirectory(
  outputDir: string,
  dir: string,
  contractName: string
): Promise<void> {
  const outputPath = path.join(outputDir, contractName)
  ensurePath(outputPath)
  writeTsconfig(outputPath)
  const cmd = `npx json-schema-to-typescript -i ${dir} -o ${outputPath} --bannerComment '/* fml */' --no-format`
  await run(cmd)
  if (CODEGEN_LOG_LEVEL === 'verbose') {
    console.log(`generated definitions from ${dir}`)
  }
  if (CODEGEN_NO_DEDUP) {
    if (CODEGEN_LOG_LEVEL === 'verbose') {
      console.log(`Skipping dedup step for ${dir}`)
    }
    return
  }
  return dedup(outputPath)
}

function getSchemaDirectories(
  rootDir: string,
  contracts?: string
): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const contractList = contracts?.split(',').map((dir) => dir.trim()) ?? []
    const directories: string[][] = []
    if (contractList.length) {
      // get the schema directory for each contract
      for (const contractName of contractList) {
        const schemaDir = path.join(rootDir, contractName, 'schema')
        directories.push([schemaDir, contractName])
      }
      resolve(directories)
    } else {
      // get all the schema directories in all the contract directories
      fs.readdir(rootDir, (err, dirEntries) => {
        if (err) {
          console.error(err)
          return
        }
        if (!dirEntries) {
          console.warn(`no entries found in ${rootDir}`)
          resolve([])
          return
        }
        dirEntries.forEach((entry) => {
          try {
            const schemaDir = path.resolve(rootDir, entry, 'schema')
            if (
              fs.existsSync(schemaDir) &&
              fs.lstatSync(schemaDir).isDirectory()
            ) {
              directories.push([schemaDir, entry])
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

function isEmptyFile(filename: string) {
  const contents = fs.readFileSync(filename, 'utf8').trim()
  return !contents
}

async function findEmptyFiles(directory: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const emptyFiles: string[] = []
    fs.readdir(directory, (err, dirEntries) => {
      if (err) {
        console.error(err)
        return
      }
      if (!dirEntries) {
        console.warn(`no entries found in ${directory}`)
        resolve([])
        return
      }
      dirEntries.forEach((entry) => {
        try {
          const filename = path.resolve(directory, entry)
          if (
            fs.existsSync(filename) &&
            !fs.lstatSync(filename).isDirectory()
          ) {
            if (isEmptyFile(filename)) {
              emptyFiles.push(entry.replace('.d.ts', ''))
            }
          }
        } catch (e) {
          console.warn(e)
        }
      })
      resolve(emptyFiles)
    })
  })
}

function removeEmptyItems(barrelFile: string, emptyFiles: string[]) {
  const emptyFileSet = new Set<string>(
    emptyFiles.map((emptyName) => `export * from "./${emptyName}";`)
  )
  const contents = fs.readFileSync(barrelFile, 'utf-8')
  const lines = contents.split('\n')
  const outputLines = []
  for (const line of lines) {
    if (emptyFileSet.has(line)) {
      outputLines.push(`// dedup emptied this file\n// ${line}`)
    } else {
      outputLines.push(line)
    }
  }
  fs.writeFileSync(barrelFile, outputLines.join('\n'))
}

async function dedup(inputPath: string, outputPath?: string): Promise<void> {
  if (!outputPath) {
    outputPath = inputPath
  }
  const options: IDeDupeOptions = {
    project: path.join(inputPath, 'tsconfig.json'),
    duplicatesFile: path.join(outputPath, 'shared-types.d.ts'),
    barrelFile: path.join(outputPath, 'index.ts'),
    retainEmptyFiles: true,
  }
  if (CODEGEN_LOG_LEVEL === 'verbose') {
    options.logger = console
  }
  deleteFile(options.barrelFile)
  deleteFile(options.duplicatesFile)
  await dedupe(options)
  // Now, remove any files fully emptied by dedup'ing
  // from the index file
  const emptyFiles = await findEmptyFiles(outputPath)
  if (emptyFiles.length && options.barrelFile) {
    console.log(`emptyFiles in ${outputPath}: ${emptyFiles}`)
    removeEmptyItems(options.barrelFile, emptyFiles)
  }
}

function ensurePath(outputPath: string) {
  if (fs.existsSync(outputPath)) {
    return
  }
  try {
    fs.mkdirSync(outputPath, { recursive: true })
  } catch (e) {
    console.log(e)
  }
}

async function compileSchemaFile(schemaFile: string, spec: CompilationSpec) {
  const outputFile = path.join(
    spec.outputPath,
    path.basename(schemaFile).replace('.json', '.d.ts')
  )
  const ts = await compileFromFile(schemaFile, spec.options)
  ensurePath(path.dirname(outputFile))
  fs.writeFileSync(outputFile, ts)
}

async function main() {
  let config = {
    ...DEFAULT_CONFIG,
  }
  removeDirectory(CONTRACTS_OUTPUT_DIR)

  const compilationSpecs = []
  for (const root of config.schemaRoots) {
    const { name, paths, outputName, outputDir } = root
    ensurePath(path.join(outputDir, outputName))
    for (const path of paths) {
      const schemaDirectories = await getSchemaDirectories(path)
      for (const [directory, contractName] of schemaDirectories) {
        const compilationOptions = await schemaCompileOptions(
          contractName,
          name,
          outputDir,
          directory
        )
        compilationSpecs.push(compilationOptions)
      }
    }
  }
  console.dir(compilationSpecs)
  const compilationPromises = []
  for (const spec of compilationSpecs) {
    for (const schemaFile of spec.schemaFiles) {
      compilationPromises.push(compileSchemaFile(schemaFile, spec))
    }
  }
  await Promise.all(compilationPromises)
  if (CODEGEN_NO_DEDUP) {
    if (CODEGEN_LOG_LEVEL === 'verbose') {
      console.log(`Skipping dedup step`)
    }
  } else {
    const dedupPromises = []
    for (const spec of compilationSpecs) {
      writeTsconfig(spec.outputPath)
      dedupPromises.push(dedup(spec.outputPath))
    }
    await Promise.all(dedupPromises)
  }
}

main()
