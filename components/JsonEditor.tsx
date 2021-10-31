import React, { useEffect, useRef, MutableRefObject } from 'react'
import BaseJsonEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export const JsonEditor = ({
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
        modes: ['view', 'tree', 'form', 'text'],
        mode: 'text',
        onChange: () => {
          try {
            const json = editorRef.current.get()
            onJsonChange(json)
          } catch (e) {
            console.error(e)
          }
        },
      } as any
      // options['modes'] = ['view', 'tree', 'form', 'text']
      // options['mode'] = 'text'
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

  return <div style={{ minHeight: '200px' }} ref={containerRef} />
}

export default JsonEditor
