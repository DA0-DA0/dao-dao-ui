import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import { UnControlled as CodeMirror } from 'react-codemirror2'
import {
  FieldError,
  Path,
  FieldPathValue,
  Validate,
  Control,
  Controller,
  FieldValues,
} from 'react-hook-form'
import { useThemeContext } from 'ui'

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
  const editorTheme = themeContext.theme !== 'junoDark' ? 'default' : 'material'

  const cmOptions = {
    mode: {
      name: 'javascript',
      json: true,
    },
    theme: editorTheme,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    tabSize: 2,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    readOnly,
  }

  return (
    <Controller
      control={control}
      name={label}
      rules={{ validate: validate }}
      shouldUnregister
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <CodeMirror
          onChange={(_editor, _data, value) => onChange(value)}
          onBlur={(_instance, _event) => onBlur()}
          ref={ref}
          options={cmOptions}
          className="rounded"
          value={value}
        />
      )}
    />
  )
}
