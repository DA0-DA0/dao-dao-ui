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

function main() {
  const directories =
    process.env.SCHEMA_DIRECTORIES?.split(',').map((dir) => dir.trim()) ?? []
  const outputPath = path.join(TYPES_DIR, DAO_NAME)
  codegen(directories, outputPath)
}

main()
