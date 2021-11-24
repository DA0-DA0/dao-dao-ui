import { compile, compileFromFile } from 'json-schema-to-typescript'
import Barrelsby from 'barrelsby/bin'
import { Arguments } from 'barrelsby/bin/options/options'
import fs from 'fs'
import { exec } from 'child_process'
import dotenv from 'dotenv'

dotenv.config({path: '.env.local'})

const DAO_NAME = 'cw-dao'
const BUILD_DIR = 'build'

function codegen() {
  const directories = process.env.SCHEMA_DIRECTORIES?.split(',').map(dir => dir.trim()) ?? []
  console.log(`SCHEMA_DIRECTORIES: ${process.env.SCHEMA_DIRECTORIES}, directories: ${directories}`)
  for (const dir of directories) {
    codegenDirectory(dir)
  }
}

function codegenDirectory(dir: string) {
  const outputDir = `@types/${DAO_NAME}`
  const cmd = `npx json-schema-to-typescript -i ${dir} -o ${outputDir}`// && npx barrelsby --delete -s -q -d ${outputDir}`

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}

async function xcodegen() {
  // compile from file
  const ts = await compileFromFile('tools/foo.json')
  fs.writeFileSync(`${BUILD_DIR}/foo.d.ts`, ts)
  const barrelsbyArgs: Arguments = {
    directory: `./${BUILD_DIR}`, // '@types',
    singleQuotes: true,
    structure: 'flat',
    delete: true,
    name: `${BUILD_DIR}/cw`,
    include: [`${BUILD_DIR}/\w*.ts`],
  }
  const result = Barrelsby(barrelsbyArgs)
  console.dir(result)

  // // or, compile a JS object
  // let mySchema = {
  //   properties: [...]
  // }
  // compile(mySchema, 'MySchema')
  //   .then(ts => ...)
  // }
}

codegen()
