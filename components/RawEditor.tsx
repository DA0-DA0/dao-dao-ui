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
  const [hasError, setHasError] = useState<boolean>(false)

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
      setHasError(false)
    }

    function handleJsonError(e: any) {
      setHasError(true)
    }

    // TODO(gavindoughtie): Should disable the update button
    // but that makes the JSON editor lose state.
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
          Update
        </button>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault()
            _editedJSON = undefined
            setEditingJson(false)
          }}
        >
          Cancel
        </button>
        <JsonEditor json={json} onJsonChange={handleJsonChange} onJsonError={handleJsonError}></JsonEditor>
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
