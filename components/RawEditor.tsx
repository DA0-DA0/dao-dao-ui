import dynamic from 'next/dynamic'
import { useState } from 'react'

// ugly little work-around for the non-react json editor
let _editedJSON: any = undefined

export default function RawEditor({
  json,
  onChange,
}: {
  json: any
  onChange: (json: any) => void
}) {
  const [editingJson, setEditingJson] = useState<boolean>(false)

  if (editingJson) {
    const JsonEditor = dynamic(
      async () => {
        const JsonEditor = await import('./JsonEditor')
        return JsonEditor
      },
      { ssr: false }
    )

    function handleJsonChange(json: any) {
      _editedJSON = json
    }

    return (
      <div>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault()
            onChange(_editedJSON)
            setEditingJson(false)
          }}
        >
          Done
        </button>
        <JsonEditor json={json} onJsonChange={handleJsonChange}></JsonEditor>
      </div>
    )
  } else {
    return (
      <div>
        <button
          className="btn block"
          onClick={(e) => {
            e.preventDefault()
            setEditingJson(true)
          }}
        >
          Edit
        </button>
        <code className="break-all whitespace-pre">
          {JSON.stringify(json, null, 2)}
        </code>
      </div>
    )
  }
}
