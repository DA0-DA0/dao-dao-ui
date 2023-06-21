# @dao-dao/email

Email templates to generate DAO DAO emails.

## Usage

### Render template

```bash
yarn render
```

This will render all emails in the [`emails`](./emails) directory and output a
template in the [`templates`](./templates) directory, formatted for the [AWS SES
Template
API](https://docs.aws.amazon.com/ses/latest/dg/send-personalized-email-api.html).

### Upload template to AWS SES

This script manages templates stored in AWS SES. To set it up, create a `.env`
file based on the `.env.example` file, and fill in the credentials.

```bash
$ yarn ses -h

Usage: ses [options]

Options:
  -c, --create <name>  create a new template
  -u, --update <name>  update an existing template
  -l, --list           list all templates
  -d, --delete <name>  delete a template
  -h, --help           display help for command
```

The name for `create` and `update` are the name of the file without the `.tsx`
prefix in the `emails/` folder. The name for `delete` is the name of the
template in AWS SES, which is defined inside the template.
