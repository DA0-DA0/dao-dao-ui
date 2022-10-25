const path = require('path')
const fs = require('fs')
const { collectUnusedTranslations, generateFilesPaths } = require('i18n-unused')

const localesPath = path.resolve(__dirname, '../locales/en')
const sources = [
  path.resolve(__dirname, '../../../apps/dapp'),
  path.resolve(__dirname, '../../../packages/state'),
  path.resolve(__dirname, '../../../packages/stateful'),
  path.resolve(__dirname, '../../../packages/stateless'),
  path.resolve(__dirname, '../../../packages/utils'),
]
const ignorePathsFromSource = [
  'node_modules',
  '.next',
  '.storybook-static',
  '.cache',
]

const ignoredTranslationRoots = [
  'depositRefundPolicy',
  'proposalModuleLabel',
  'proposalStatusTitle',
  'proposalVoteTitle',
  'unit',
]

const getUnusedTranslationsForLocalePaths = async (localePaths) => {
  const allSourcePaths = (
    await Promise.all(
      sources.map((source) =>
        generateFilesPaths(source, {
          srcExtensions: ['ts', 'tsx', 'js', 'jsx'],
          ignorePaths: ignorePathsFromSource.map((ignore) =>
            path.resolve(source, ignore)
          ),
        })
      )
    )
  ).flat()

  const unusedTranslations = await collectUnusedTranslations(
    localePaths,
    allSourcePaths,
    {
      context: true,
      marker: '[UNUSED]',
      ignoreComments: false,
      translationSeparator: '.',
      contextSeparator: '_',
      translationKeyMatcher: /(?:t\(|i18nKey|\s*').*/gi,
      localeFileParser: (m) => m.default || m,
    }
  )

  const filteredUnusedTranslations = unusedTranslations.translations.map(
    ({ localePath, keys }) => {
      const filteredKeys = keys.filter(
        (key) =>
          !ignoredTranslationRoots.some((ignoredRoot) =>
            key.startsWith(ignoredRoot)
          )
      )

      return {
        localePath,
        keys: filteredKeys,
      }
    }
  )

  const result = {
    translations: filteredUnusedTranslations,
    totalCount: filteredUnusedTranslations.reduce(
      (acc, { keys }) => acc + keys.length,
      0
    ),
  }

  return result
}

// i18n-unused/dist/i18n-unused.cjs line 404
const applyToFlatKey = (source, key, cb, options) => {
  const separatedKey = options.flatTranslations
    ? [key]
    : key.split(options.separator)
  const keyLength = separatedKey.length - 1
  separatedKey.reduce((acc, _k, i) => {
    if (i === keyLength) {
      cb(acc, _k)
    } else {
      acc = acc[_k]
    }

    return acc
  }, source)
  return true
}

const main = async () => {
  const localePaths = await generateFilesPaths(localesPath, {
    srcExtensions: ['json'],
  })

  const unusedTranslations = await getUnusedTranslationsForLocalePaths(
    localePaths
  )

  console.log(
    `Total unused translations count: ${unusedTranslations.totalCount}`
  )

  unusedTranslations.translations.forEach(({ localePath, keys }) => {
    const locale = require(localePath)
    keys.forEach((key) =>
      applyToFlatKey(
        locale,
        key,
        (source, lastKey) => {
          delete source[lastKey]
        },
        {
          flatTranslations: false,
          separator: '.',
        }
      )
    )
    fs.writeFileSync(localePath, JSON.stringify(locale, null, 2))
  })
}

main().catch((e) => console.error('Error', e))
