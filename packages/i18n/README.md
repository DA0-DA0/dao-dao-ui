# @dao-dao/i18n

[Internationalization](https://www.w3.org/standards/webdesign/i18n) (i.e.
translation) system for the DAO DAO UI.

## Contributing a translation

See `./locales/en/translation.json`. Make a folder with your language's (ISO 639-1)[https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes] code and place your translation there. When you're done, make sure to add your language's code to the `config.i18n.locales` array in the `./next-i18next.config.js` file.

### Translation notes

Keep it precise and pithy, in that order; people's businesses depend on understanding what this software does. Within those constraints, keep it as casual and informal as possible.

## Comparing diffs

To compare two translation files to see what keys have been added, removed, and
modified, run `yarn get-diff <locale1.json> <locale2.json>`. For example, to see
what is missing from the Spanish translation that exists in the English
translation, run the following command from this folder:

```bash
yarn get-diff locales/es/translation.json locales/en/translation.json
```

When comparing two different languages, the added and removed keys will be
helpful in figuring out what needs to change, and the modified keys will be
helpful in comparing the translations' accuracies.

When comparing two versions of the same language, the added and removed keys
will be helpful in figuring out what needs to be translated, and the modified
keys will be helpful in figuring out what needs to be updated.
