import fs from 'fs'
import path from 'path'

import { Project, SyntaxKind } from 'ts-morph'

const TEMPLATE = `
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { COMPONENT } from './FILE'

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

// Add missing stories.
;(async () => {
  try {
    const sourceFiles = project.getSourceFiles()
    for (const sourceFile of sourceFiles) {
      const baseName = sourceFile.getBaseNameWithoutExtension()
      // Ignore index files or story files.
      if (baseName === 'index' || baseName.endsWith('.stories')) {
        continue
      }

      const extension = sourceFile.getExtension()

      let titlePrefix = sourceFile
        .getDirectoryPath()
        .split('packages/ui/components')[1]
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

      if (componentNames.length === 1) {
        const storyFileName = baseName + '.stories' + extension
        const storyFilePath = path.resolve(
          sourceFile.getDirectoryPath(),
          storyFileName
        )

        // If stories already exist, ignore.
        if (fs.existsSync(storyFilePath)) {
          continue
        }

        const componentName = componentNames[0]
        const data = TEMPLATE.replace(/FILE/g, baseName)
          .replace(/COMPONENT/g, componentName)
          .replace(/TITLE/g, titlePrefix + componentName)
          .trimStart()

        await fs.promises.writeFile(storyFilePath, data)
      } else {
        for (const componentName of componentNames) {
          const storyFileName =
            baseName + '.' + componentNames + '.stories' + extension
          const storyFilePath = path.resolve(
            sourceFile.getDirectoryPath(),
            storyFileName
          )

          // If stories already exist, ignore.
          if (fs.existsSync(storyFilePath)) {
            continue
          }

          const data = TEMPLATE.replace(/FILE/g, baseName)
            .replace(/COMPONENT/g, componentName)
            .replace(/TITLE/g, titlePrefix + componentName)
            .trimStart()

          await fs.promises.writeFile(storyFilePath, data)
        }
      }
    }
  } catch (e) {
    // Catch anything bad that happens
    console.error('Error', e)
  }
})()
