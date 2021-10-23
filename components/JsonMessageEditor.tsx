import React, { useEffect, useRef, MutableRefObject } from 'react'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export const JSONMessageEditor = ({
  json,
  onJsonChange,
  ...props
}: {
  json: any
  onJsonChange: (arg0: any) => void
}) => {
  const containerRef: MutableRefObject<any | null> = useRef(null)
  const editorRef: MutableRefObject<any | null> = useRef(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const options = {
        ...props,
        onChange: () => {
          try {
            const json = editorRef.current.get()
            onJsonChange(json)
          } catch (e) {
            console.error(e)
          }
        },
      } as any
      options['modes'] = ['view', 'tree', 'form', 'text']
      options['mode'] = 'text'
      const editor = new JSONEditor(containerRef.current, options)
      editor.setMode('code')
      editor.set(json)
      editorRef.current = editor
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
      }
    }
  }, [containerRef, json, props, onJsonChange])

  return <div style={{ minHeight: '200px' }} ref={containerRef} />
}

export default JSONMessageEditor
