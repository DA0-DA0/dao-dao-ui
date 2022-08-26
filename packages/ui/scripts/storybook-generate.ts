// `yarn storybook:generate` to generate all missing storybook files.
// `yarn storybook:generate <glob>` to generate just the matching files.

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
  title: 'DAO DAO UI V2 / ${titlePrefix + name}',
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
`.trimStart()

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})
// Only add components.
project.addSourceFilesAtPaths('{pages,components}/**/*.{ts,tsx}')

const addMissingStoriesForSourceFile = async (sourceFile: SourceFile) => {
  const baseName = sourceFile.getBaseNameWithoutExtension()
  // Ignore index files.
  if (baseName === 'index') {
    return
  }

  const extension = sourceFile.getExtension()

  const pathFromRoot = sourceFile.getDirectoryPath().split('packages/ui/')[1]

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

  const storyDirectory = sourceFile
    .getDirectoryPath()
    .replace('packages/ui/components', 'packages/ui/stories')

  const generate = async (
    output: string,
    component: ComponentWithRequiredProps
  ) => {
    // If stories already exist, ignore.
    if (fs.existsSync(output)) {
      return
    }

    const data = generateTemplate(
      component,
      pathFromRoot + '/' + baseName,
      titlePrefix
    )

    await fs.promises.writeFile(output, data)
    console.log('Created ' + output)
  }

  if (components.length === 1) {
    // Make directory if nonexistent.
    if (!fs.existsSync(storyDirectory)) {
      await fs.promises.mkdir(storyDirectory)
    }

    const storyFilePath = path.resolve(
      storyDirectory,
      baseName + '.stories' + extension
    )

    await generate(storyFilePath, components[0])
  } else {
    for (const component of components) {
      // Make directory if nonexistent.
      const storyFileDirectory = path.resolve(storyDirectory, baseName)
      if (!fs.existsSync(storyFileDirectory)) {
        await fs.promises.mkdir(storyFileDirectory)
      }

      const storyFilePath = path.resolve(
        storyFileDirectory,
        component.name + '.stories' + extension
      )

      await generate(storyFilePath, component)
    }
  }
}

// Add missing stories.
;(async () => {
  try {
    // Use arg for source files glob pattern if present.
    const arg = process.argv[2]
    await Promise.all(
      (arg ? project.getSourceFiles(arg) : project.getSourceFiles()).map(
        (sourceFile) => addMissingStoriesForSourceFile(sourceFile)
      )
    )
  } catch (e) {
    // Catch anything bad that happens
    console.error('Error', e)
  }
})()
