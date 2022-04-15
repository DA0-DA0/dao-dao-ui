import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import { useThemeContext } from '../../theme'
import { Controlled as CodeMirror } from 'react-codemirror2'
import {
  FieldError,
  Path,
  FieldPathValue,
  Validate,
  Control,
  Controller,
  FieldValues,
} from 'react-hook-form'

// This check is to prevent this import to be server side rendered.
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript.js')
}

interface CodeMirrorInputProps<T extends FieldValues, U extends Path<T>> {
  label: U
  control?: Control<T>
  validation?: Validate<FieldPathValue<T, U>>[]
  error?: FieldError
  readOnly?: boolean
}

export function CodeMirrorInput<T extends FieldValues, U extends Path<T>>({
  label,
  control,
  validation,
  readOnly = false,
}: CodeMirrorInputProps<T, U>) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  const themeContext = useThemeContext()
  const editorTheme =
    themeContext.theme !== 'dark' ? 'default' : 'material-ocean'

  const cmOptions = {
    mode: {
      name: 'javascript',
      json: true,
    },
    theme: editorTheme,
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: false,
    tabSize: 2,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    readOnly,
  }

  return (
    <Controller
      control={control}
      name={label}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <CodeMirror
          className="rounded"
          onBeforeChange={(_editor, _data, value) => onChange(value)}
          onBlur={(_instance, _event) => onBlur()}
          options={cmOptions}
          ref={ref}
          value={value}
        />
      )}
      rules={{ validate: validate }}
      shouldUnregister
    />
  )
}
