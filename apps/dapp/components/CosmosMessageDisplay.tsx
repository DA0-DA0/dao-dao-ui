import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/lucario.css'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { useThemeContext } from 'contexts/theme'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
// This check is to prevent this import to be server side rendered.
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript.js')
}

export const CosmosMessageDisplay = ({ value }: { value: string }) => {
  const themeCtx = useThemeContext()
  const editorTheme = themeCtx.theme !== 'junoDark' ? 'lucario' : 'material'
  return (
    <div className="flex flex-col">
      <CodeMirror
        className="text-lg"
        options={{
          theme: editorTheme,
          mode: {
            name: 'javascript',
            json: true,
          },
          readOnly: true,
          lineNumbers: true,
          lineWrapping: false,
          tabSize: 2,
        }}
        value={value}
      />
    </div>
  )
}
