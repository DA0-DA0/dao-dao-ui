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
import { validateCosmosMsg } from 'util/validateWasmMsg'
import { CheckIcon, XIcon } from '@heroicons/react/outline'

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
  const [errorJson, setErrorJson] = useState<boolean>(false)
  const [errorCosmosMsg, setErrorCosmosMsg] = useState<boolean>(false)
  const [jsonErrorMessage, setJsonErrorMessage] = useState<string>('')
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
    const validCosmos = validateCosmosMsg(message)
    if (!validCosmos.valid) {
      setErrorCosmosMsg(true)
      console.log(validCosmos.errors)
    } else {
      setErrorCosmosMsg(false)
    }
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
  if (jsonErrorMessage) {
    errorMessage = jsonErrorMessage
  }

  let status = (
    <div className="text-sm p-2">
      {errorJson && (
        <p className="text-error">
          <XIcon className="w-5 h-5 mr-2 inline" />
          {jsonErrorMessage}
        </p>
      )}
      {!errorJson && errorCosmosMsg && (
        <p className="text-error">
          <XIcon className="w-5 h-5 mr-2 inline" />
          message is not a valid{' '}
          <a
            className="link"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
          >
            cosmos message
          </a>
          .
        </p>
      )}
      {!errorJson && !errorCosmosMsg && (
        <p className="text-success">
          <CheckIcon className="w-5 h-5" />
        </p>
      )}
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
      setErrorJson(false)
      return obj
    } catch (e: any) {
      setErrorJson(true)
      setJsonErrorMessage(`${e?.message}`)
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
      <CodeMirror
        value={placeholder}
        options={cmOptions}
        onBeforeChange={(_editor: any, _data: any, value: any) => {
          handleMessage(value)
        }}
      />
      {status}
    </div>
  )
}
