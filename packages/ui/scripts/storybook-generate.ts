import fs from 'fs'
import path from 'path'

import { Project, SourceFile, SyntaxKind } from 'ts-morph'

interface ComponentWithRequiredProps {
  name: string
  requiredProps: string[]
}

const TEMPLATE = `
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { COMPONENT } from 'FILE'

export default {
  title: 'DAO DAO UI / TITLE',
  component: COMPONENT,
} as ComponentMeta<typeof COMPONENT>

const Template: ComponentStory<typeof COMPONENT> = (args) => <COMPONENT {...args} />

export const Default = Template.bind({})
Default.args = PROPS
`

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})
// Only add components.
project.addSourceFilesAtPaths('components/**/*.{ts,tsx}')

const addMissingStoriesForSourceFile = async (sourceFile: SourceFile) => {
  const baseName = sourceFile.getBaseNameWithoutExtension()
  // Ignore index files.
  if (baseName === 'index') {
    return
  }

  const extension = sourceFile.getExtension()

  const pathFromComponents = sourceFile
    .getDirectoryPath()
    .split('packages/ui/components')[1]

  let titlePrefix = pathFromComponents
    // Remove leading slash. Root directory path ends with split
    // string above, so we have to manually remove the slash while allowing
    // for it not to exist.
    .substring(1)
    .replace(/\//g, ' / ')
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
      requiredProps: declaration
        .getInitializerIfKind(SyntaxKind.ArrowFunction)!
        .getParameters()[0]
        .getType()
        .getProperties()
        .filter((p) => !p.isOptional())
        .map((p) => p.getName()),
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
      requiredProps: fn
        .getParameters()[0]
        .getType()
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

    const data = TEMPLATE.replace(
      /FILE/g,
      'components' + pathFromComponents + '/' + baseName
    )
      .replace(/COMPONENT/g, component.name)
      .replace(/TITLE/g, titlePrefix + component.name)
      .replace(
        /PROPS/g,
        component.requiredProps.length
          ? JSON.stringify(
              component.requiredProps.reduce(
                (acc, prop) => ({
                  ...acc,
                  [prop]: null,
                }),
                {}
              ),
              undefined,
              2
            ).replace(
              /null(,|)?\n/g,
              `null$1 \/\/ TODO: Fill in default value.\n`
            )
          : '{}'
      )
      .trimStart()

    await fs.promises.writeFile(output, data)
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
