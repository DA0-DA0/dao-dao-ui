import dynamic from 'next/dynamic'
import { useState } from 'react'

// ugly little work-around for the non-react json editor
let _editedJSON: any = undefined

const RawEditor = ({
  json,
  onChange,
}: {
  json: any
  onChange: (json: any) => void
}) => {
  const [editingJson, setEditingJson] = useState<boolean>(false)

  if (editingJson) {
    const JsonEditor = dynamic(
      async () => {
        const mod = await import('./JsonEditor')
        return mod.JsonEditor
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
          className="btn"
          onClick={(e) => {
            e.preventDefault()
            setEditingJson(true)
          }}
        >
          Edit
        </button>
        <div>{JSON.stringify(json, null, 2)}</div>
      </div>
    )
  }
}

export default RawEditor
