import { Loadable } from 'recoil'

import { InputLabel } from './inputs/InputLabel'
import { Loader } from './logo/Loader'

export interface FormattedJsonDisplayProps {
  title: string
  jsonLoadable: Loadable<any>
}

// Displays nothing if the loadable errored or loaded undefined data.
export const FormattedJsonDisplay = ({
  title,
  jsonLoadable,
}: FormattedJsonDisplayProps) =>
  jsonLoadable.state === 'loading' ? (
    <Loader />
  ) : jsonLoadable.state === 'hasValue' &&
    jsonLoadable.contents !== undefined ? (
    <div className="space-y-2">
      <InputLabel name={title} />
      <pre className="overflow-auto rounded-lg bg-background-interactive-disabled p-2 text-text-secondary">
        {JSON.stringify(jsonLoadable.contents, null, 2)}
      </pre>
    </div>
  ) : null
