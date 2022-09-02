// `yarn storybook:generate` to generate all missing storybook files for `.tsx`
// files that exist as descendants of a `ui` folder.

// `yarn storybook:generate <glob>` to generate just the missing storybook files
// for the matching files. The argument will automatically be prefixed with
// `../**/ui/**/` if it does not start with `.`, `/`, or `*`, and suffixed with
// `*.tsx` if it does not end with `.tsx`.

// Author: Noah Saso (@NoahSaso)

import fs from 'fs'
import path from 'path'

import { Project, SourceFile, SyntaxKind } from 'ts-morph'

interface ComponentWithRequiredProps {
  name: string
  takesProps: boolean
  requiredProps: string[]
}

const generateTemplate = (
  { name, takesProps, requiredProps }: ComponentWithRequiredProps,
  file: string,
  titlePrefix: string
) =>
  `
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ${name} } from '${file}'

export default {
  title: 'DAO DAO / ${titlePrefix + name}',
  component: ${name},
} as ComponentMeta<typeof ${name}>

const Template: ComponentStory<typeof ${name}> = (${
    takesProps ? '' : '_'
  }args) => (
  <${name} ${takesProps ? '{...args} ' : ''}/>
)

export const Default = Template.bind({})
Default.args = ${
    requiredProps.length
      ? JSON.stringify(
          requiredProps.reduce(
            (acc, prop) => ({
              ...acc,
              [prop]: null,
            }),
            {}
          ),
          undefined,
          2
        ).replace(/null(,|)?\n/g, `null, \/\/ TODO: Fill in default value.\n`)
      : '{}'
  }
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
`.trimStart()

const projectRoot = path.resolve(__dirname, '../../../')

const addMissingStoriesForSourceFile = async (sourceFile: SourceFile) => {
  const baseName = sourceFile.getBaseNameWithoutExtension()
  // Ignore index and storybook files.
  if (baseName === 'index' || baseName.endsWith('.stories')) {
    return
  }

  const extension = sourceFile.getExtension()

  const pathFromRoot = sourceFile.getDirectoryPath().split(projectRoot + '/')[1]

  let titlePrefix = pathFromRoot.replace(/\//g, ' / ')
  if (titlePrefix) {
    titlePrefix += ' / '
  }

  // forwardRef'd components
  // export const Component = forwardRef(...)
  const componentForwardRefs: ComponentWithRequiredProps[] = sourceFile
    .getVariableDeclarations()
    .filter(
      (declaration) =>
        declaration.isExported() &&
        declaration
          .getVariableStatement()
          ?.getChildrenOfKind(SyntaxKind.VariableDeclarationList)[0]
          ?.getChildrenOfKind(SyntaxKind.SyntaxList)[0]
          ?.getChildrenOfKind(SyntaxKind.VariableDeclaration)[0]
          ?.getChildrenOfKind(SyntaxKind.CallExpression)[0]
          ?.getChildrenOfKind(SyntaxKind.Identifier)[0]
          ?.getText() === 'forwardRef'
    )
    .flatMap((declaration) => ({
      name: declaration.getName(),
      // Not sure how to check if this has props.
      takesProps: true,
      // Not sure how to extract props from this statement.
      requiredProps: [],
    }))

  // Arrow functions, like most components.
  // export const Component = (props) => { ... }
  const componentArrowFunctions: ComponentWithRequiredProps[] = sourceFile
    .getVariableDeclarations()
    .filter(
      (declaration) =>
        declaration.isExported() &&
        declaration
          .getInitializerIfKind(SyntaxKind.ArrowFunction)
          ?.getReturnType()
          .getText()
          .includes('JSX.Element')
    )
    .map((declaration) => ({
      name: declaration.getName(),
      takesProps:
        declaration
          .getInitializerIfKind(SyntaxKind.ArrowFunction)!
          .getParameters().length > 0,
      requiredProps:
        declaration
          .getInitializerIfKind(SyntaxKind.ArrowFunction)!
          .getParameters()[0]
          ?.getType()
          .getProperties()
          .filter((p) => !p.isOptional())
          .map((p) => p.getName()) ?? [],
    }))

  // export function Component(props) { ... }
  const componentFunctions: ComponentWithRequiredProps[] = sourceFile
    .getFunctions()
    .filter(
      (fn) =>
        // Normal functions.
        fn.isExported() &&
        fn.getName() &&
        fn.getReturnType().getText().includes('JSX.Element')
    )
    .map((fn) => ({
      name: fn.getName()!,
      takesProps: fn.getParameters().length > 0,
      requiredProps: fn
        .getParameters()[0]
        ?.getType()
        .getProperties()
        .filter((p) => !p.isOptional())
        .map((p) => p.getName()),
    }))

  const components: ComponentWithRequiredProps[] = [
    ...componentForwardRefs,
    ...componentArrowFunctions,
    ...componentFunctions,
  ]

  const storyDirectory = sourceFile.getDirectoryPath()

  const generate = async (
    output: string,
    component: ComponentWithRequiredProps
  ) => {
    // If stories already exist, ignore.
    if (fs.existsSync(output)) {
      return
    }

    const data = generateTemplate(component, './' + baseName, titlePrefix)

    await fs.promises.writeFile(output, data)
    console.log('Created ' + output)
  }

  if (components.length === 1) {
    const storyFilePath = path.resolve(
      storyDirectory,
      baseName + '.stories' + extension
    )

    await generate(storyFilePath, components[0])
  } else {
    for (const component of components) {
      const storyFilePath = path.resolve(
        storyDirectory,
        baseName + '.' + component.name + '.stories' + extension
      )

      await generate(storyFilePath, component)
    }
  }
}

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})

// Add missing stories.
;(async () => {
  try {
    // Use arg for source files glob pattern if present.
    let arg = process.argv[2]
    if (arg) {
      // Automatically prefix with all levels with a `ui` folder glob if not
      // starting with a path symbol.
      if (
        !arg.startsWith('.') &&
        !arg.startsWith('/') &&
        !arg.startsWith('*')
      ) {
        arg = '../**/ui/**/' + arg
      }
      // Automatically add TypeScript extension if necessary.
      if (!arg.endsWith('.tsx')) {
        arg += '*.tsx'
      }

      project.addSourceFilesAtPaths(arg)
    } else {
      // // Add all tsx files that exist as a descendant of a folder named `ui` or
      // // `components` in apps.
      // project.addSourceFilesAtPaths('../../apps/**/{ui,components}/**/*.tsx')
      // Add @dao-dao/ui package.
      project.addSourceFilesAtPaths('../ui/**/*.tsx')
      // Add all tsx files that exist as a descendant of a folder named `ui` in
      // the adapter packages.
      project.addSourceFilesAtPaths(
        '../{voting,proposal}-module-adapter/**/ui/**/*.tsx'
      )
    }

    await Promise.all(
      project
        .getSourceFiles()
        .map((sourceFile) => addMissingStoriesForSourceFile(sourceFile))
    )
  } catch (e) {
    // Catch anything bad that happens
    console.error('Error', e)
  }
})()
