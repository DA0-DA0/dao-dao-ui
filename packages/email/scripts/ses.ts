import path from 'path'

import {
  CreateTemplateCommand,
  DeleteTemplateCommand,
  ListTemplatesCommand,
  SESClient,
  Template,
  UpdateTemplateCommand,
} from '@aws-sdk/client-ses'
import { Command } from 'commander'
import dotenv from 'dotenv'

const {
  parsed: { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = {},
} = dotenv.config()

const program = new Command()
program.option('-c, --create <name>', 'create a new template')
program.option('-u, --update <name>', 'update an existing template')
program.option('-l, --list', 'list all templates')
program.option('-d, --delete <name>', 'delete a template')

program.parse(process.argv)
const options = program.opts()

const templatesFolder = path.join(__dirname, '..', 'templates')

;(async () => {
  const ses = new SESClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  })

  if (options.create) {
    const template: Template = await import(
      path.join(templatesFolder, options.create + '.json')
    )
    await ses
      .send(
        new CreateTemplateCommand({
          Template: template,
        })
      )
      .then(() => console.log(`Created ${template.TemplateName}`))
      .catch(console.error)
  } else if (options.update) {
    const template: Template = await import(
      path.join(templatesFolder, options.update + '.json')
    )
    await ses
      .send(
        new UpdateTemplateCommand({
          Template: template,
        })
      )
      .then(() => console.log(`Updated ${template.TemplateName}`))
      .catch(console.error)
  } else if (options.list) {
    let nextToken: string | undefined
    const templates: string[] = []
    while (true) {
      const response = await ses.send(
        new ListTemplatesCommand({
          NextToken: nextToken,
        })
      )

      templates.push(
        ...(response.TemplatesMetadata?.map((t) => t.Name || '').filter(
          Boolean
        ) ?? [])
      )

      nextToken = response.NextToken
      if (!nextToken) {
        break
      }
    }

    console.log('\n' + templates.map((t) => '- ' + t).join('\n') + '\n')
  } else if (options.delete) {
    await ses
      .send(
        new DeleteTemplateCommand({
          TemplateName: options.delete,
        })
      )
      .then(() => console.log('Deleted'))
      .catch(console.error)
  }
})()
