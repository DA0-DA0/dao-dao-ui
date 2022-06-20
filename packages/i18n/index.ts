import { StringMap, TFunctionKeys, TOptions } from 'i18next'
import {
  Trans,
  appWithTranslation,
  i18n,
  useTranslation,
  withTranslation,
} from 'next-i18next'

// Swap order of arguments and use error fallback string if client null.
const t = (
  key: TFunctionKeys | TFunctionKeys[],
  options?: string | TOptions<StringMap> | undefined,
  defaultValue?: string | undefined
) => i18n?.t(key, defaultValue, options) ?? 'translations not loaded'

export { appWithTranslation, Trans, useTranslation, withTranslation, i18n, t }
