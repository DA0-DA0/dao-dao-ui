import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import JSON5 from 'json5'
import { MessageMapEntry } from 'models/proposal/messageMap'
import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useRecoilState } from 'recoil'
import { draftProposalMessageSelector } from 'selectors/proposals'
import { makeWasmMessage } from 'util/messagehelpers'
import { useThemeContext } from '../contexts/theme'

// This check is to prevent this import to be server side rendered.
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript.js')
}

type JSONError = {
  lineNumber?: number
  message?: string
}

function getEditorTheme(appTheme: string): string {
  return appTheme !== 'junoDark' ? 'default' : 'material'
}

export default function CustomEditor({
  contractAddress,
  proposalId,
  customMsg,
}: {
  contractAddress: string
  proposalId: string
  customMsg?: MessageMapEntry
}) {
  const [error, setError] = useState<JSONError | undefined>(undefined)
  const [lastInputJson, setLastInputJson] = useState<any>(undefined)
  const [isValidJson, setIsValidJson] = useState<boolean>(true)
  const [customMessage, setCustomMessage] = useRecoilState(
    draftProposalMessageSelector({
      contractAddress,
      proposalId,
      messageId: customMsg?.id ?? '',
    })
  )
  const themeContext = useThemeContext()

  const cmOptions = {
    mode: {
      name: 'javascript',
      json: true,
    },
    theme: getEditorTheme(themeContext.theme),
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    tabSize: 2,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
  }

  function updateCustom(message: any) {
    // If it is a WasmMsg, make sure it's properly encoded
    if (message.wasm) message = makeWasmMessage(message)
    setCustomMessage({
      ...customMessage,
      message,
    } as any)
  }

  const placeholder =
    lastInputJson?.length !== 0
      ? lastInputJson
        ? lastInputJson
        : JSON5.stringify(
            customMessage?.message ?? customMsg?.message ?? {},
            undefined,
            2
          )
      : ''

  let errorMessage = ''
  if (error) {
    errorMessage = `${error?.message} at line ${error?.lineNumber}`
  }

  let status = (
    <div
      className={
        isValidJson ? 'flex h-10 text-green-500 p-2' : 'flex h-10 text-red-500 p-2'
      }
    >
      <div className="flex-1">{isValidJson ? 'JSON is valid' : errorMessage}</div>
      <button
        disabled={!isValidJson}
        className="btn btn-xs normal-case font-normal rounded-md flex-initial"
        onClick={handleFormatJson}
      >
        Format
      </button>
    </div>
  )

  function parseAsJson(str: string) {
    try {
      const obj = JSON5.parse(str)
      setError(undefined)
      return obj
    } catch (e: any) {
      setError(e)
    }
    return undefined
  }

  function handleMessage(value: string) {
    const msg = parseAsJson(value)
    if (msg) {
      setLastInputJson(value)
      setIsValidJson(true)
      updateCustom(msg)
    } else {
      setLastInputJson(value)
      setIsValidJson(false)
    }
  }

  function handleFormatJson(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const parsed = parseAsJson(lastInputJson)
    if (parsed) {
      const formatted = JSON.stringify(parsed, undefined, 2)
      setLastInputJson(formatted)
    }
  }

  return (
    <div className="mt-4 border box-border rounded">
      {status}
      <CodeMirror
        value={placeholder}
        options={cmOptions}
        onBeforeChange={(editor: any, data: any, value: any) => {
          handleMessage(value)
        }}
      />
    </div>
  )
}
