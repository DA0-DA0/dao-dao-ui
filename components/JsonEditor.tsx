import React, { useEffect, useRef, MutableRefObject } from 'react'
import BaseJsonEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default function JsonEditor({
  json,
  onJsonChange,
  onJsonError = (e: any) => {},
  ...props
}: {
  json: any
  onJsonChange: (arg0: any) => void
  onJsonError: (e: any) => void
}) {
  const containerRef: MutableRefObject<any | null> = useRef(null)
  const editorRef: MutableRefObject<any | null> = useRef(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const options = {
        ...props,
        modes: ['view', 'tree', 'form', 'text'],
        mode: 'text',
        onChange: () => {
          try {
            const json = editorRef.current.get()
            onJsonChange(json)
          } catch (e: any) {
            onJsonError(e)
          }
        },
      } as any
      const editor = new BaseJsonEditor(containerRef.current, options)
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

  return <div className="min-h-full" ref={containerRef} />
}
