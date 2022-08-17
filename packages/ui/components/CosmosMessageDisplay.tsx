import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/theme/material.css'

import { UnControlled as CodeMirror } from 'react-codemirror2'

import { useThemeContext } from '../theme'

// This check is to prevent this import to be server side rendered.
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript.js')
}

export interface CosmosMessageDisplayProps {
  value: string
}

export const CosmosMessageDisplay = ({ value }: CosmosMessageDisplayProps) => {
  const themeCtx = useThemeContext()
  const editorTheme = themeCtx.theme !== 'dark' ? 'default' : 'material-ocean'
  return (
    <div className="flex flex-col">
      <CodeMirror
        className="text-sm"
        options={{
          theme: editorTheme,
          mode: {
            name: 'javascript',
            json: true,
          },
          readOnly: true,
          lineWrapping: false,
          tabSize: 2,
        }}
        value={value}
      />
    </div>
  )
}
