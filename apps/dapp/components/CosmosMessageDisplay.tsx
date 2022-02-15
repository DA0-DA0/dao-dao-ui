import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/lucario.css'
import 'codemirror/mode/javascript/javascript'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import { useThemeContext } from 'contexts/theme'

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
