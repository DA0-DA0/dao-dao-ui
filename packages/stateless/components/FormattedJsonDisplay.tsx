import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import { Loadable } from 'recoil'

import { InputLabel } from './inputs/InputLabel'
import { Loader as DefaultLoader, LoaderProps } from './logo/Loader'

export interface FormattedJsonDisplayProps {
  jsonLoadable: Loadable<any>
  Loader?: ComponentType<LoaderProps>
}

// Displays nothing if the loadable errored or loaded undefined data.
export const FormattedJsonDisplay = ({
  jsonLoadable,
  Loader = DefaultLoader,
}: FormattedJsonDisplayProps) => {
  const { t } = useTranslation()

  return jsonLoadable.state === 'loading' ? (
    <Loader />
  ) : jsonLoadable.state === 'hasValue' &&
    jsonLoadable.contents !== undefined ? (
    <div className="space-y-2">
      <InputLabel name={t('form.tokenInfo')} />
      <pre className="overflow-auto rounded-lg bg-background-interactive-disabled p-2 text-text-secondary">
        {JSON.stringify(jsonLoadable.contents, null, 2)}
      </pre>
    </div>
  ) : null
}
