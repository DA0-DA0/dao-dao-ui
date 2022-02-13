import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import { UnControlled as CodeMirror } from 'react-codemirror2'

const CosmosMessageDisplay = ({ value }: { value: string }) => {
  return (
    <div className="flex flex-col">
      <CodeMirror
        className="text-lg"
        options={{
          theme: 'material',
          mode: {
            name: 'javascript',
            json: true,
          },
          readOnly: 'nocursor',
          lineNumbers: true,
          lineWrapping: false,
          tabSize: 2,
        }}
        value={value}
      />
    </div>
  )
}

export default CosmosMessageDisplay
