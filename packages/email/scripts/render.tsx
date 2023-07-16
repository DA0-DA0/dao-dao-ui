import fs from 'fs'
import path from 'path'

import { Template } from '@aws-sdk/client-ses'
import { render } from '@react-email/render'

import * as emails from '../emails'

const outputFolder = path.join(__dirname, '..', 'templates')
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}

Object.entries(emails).forEach(([file, { name, subject, Template }]) => {
  const html = render(<Template />)
  const text = render(<Template />, {
    plainText: true,
  })

  // Write to templates folder.
  const template: Template = {
    TemplateName: name,
    SubjectPart: subject,
    HtmlPart: html,
    TextPart: text,
  }
  fs.writeFileSync(
    path.join(outputFolder, file + '.json'),
    JSON.stringify(template, null, 2)
  )
  fs.writeFileSync(path.join(outputFolder, file + '.html'), html)
})
