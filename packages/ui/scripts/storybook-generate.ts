import fs from 'fs'
import path from 'path'

import { Project, SourceFile, SyntaxKind } from 'ts-morph'

const TEMPLATE = `
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { COMPONENT } from 'FILE'

export default {
  title: 'DAO DAO UI / TITLE',
  component: COMPONENT,
} as ComponentMeta<typeof COMPONENT>

const Template: ComponentStory<typeof COMPONENT> = (args) => <COMPONENT {...args} />

export const Default = Template.bind({})
Default.args = {}
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

  const componentNames = sourceFile
    .getVariableDeclarations()
    .filter(
      (declaration) =>
        declaration.isExported() &&
        // forwardRef'd components, like Button
        (declaration
          .getVariableStatement()
          ?.getChildrenOfKind(SyntaxKind.VariableDeclarationList)[0]
          ?.getChildrenOfKind(SyntaxKind.SyntaxList)[0]
          ?.getChildrenOfKind(SyntaxKind.VariableDeclaration)[0]
          ?.getChildrenOfKind(SyntaxKind.CallExpression)[0]
          ?.getChildrenOfKind(SyntaxKind.Identifier)[0]
          ?.getText() === 'forwardRef' ||
          // Arrow functions, like most components.
          declaration
            .getInitializerIfKind(SyntaxKind.ArrowFunction)
            ?.getReturnType()
            .getText()
            .includes('JSX.Element'))
    )
    .flatMap((declaration) => declaration.getName())
    .concat(
      sourceFile
        .getFunctions()
        .filter(
          (fn) =>
            // Normal functions.
            fn.isExported() &&
            fn.getName() &&
            fn.getReturnType().getText().includes('JSX.Element')
        )
        .map((fn) => fn.getName()!)
    )

  const storyDirectory = sourceFile
    .getDirectoryPath()
    .replace('packages/ui/components', 'packages/ui/stories')

  const generate = async (output: string, componentName: string) => {
    // If stories already exist, ignore.
    if (fs.existsSync(output)) {
      return
    }

    const data = TEMPLATE.replace(
      /FILE/g,
      'components' + pathFromComponents + '/' + baseName
    )
      .replace(/COMPONENT/g, componentName)
      .replace(/TITLE/g, titlePrefix + componentName)
      .trimStart()

    await fs.promises.writeFile(output, data)
  }

  if (componentNames.length === 1) {
    // Make directory if nonexistent.
    if (!fs.existsSync(storyDirectory)) {
      await fs.promises.mkdir(storyDirectory)
    }

    const storyFilePath = path.resolve(
      storyDirectory,
      baseName + '.stories' + extension
    )

    await generate(storyFilePath, componentNames[0])
  } else {
    for (const componentName of componentNames) {
      // Make directory if nonexistent.
      const storyFileDirectory = path.resolve(storyDirectory, baseName)
      if (!fs.existsSync(storyFileDirectory)) {
        await fs.promises.mkdir(storyFileDirectory)
      }

      const storyFilePath = path.resolve(
        storyFileDirectory,
        componentName + '.stories' + extension
      )

      await generate(storyFilePath, componentName)
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
