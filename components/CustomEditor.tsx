import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import React, { useState } from 'react'
import { useThemeContext } from '../contexts/theme'
import JSON5 from 'json5'
import { makeWasmMessage } from 'util/messagehelpers'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
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
  dispatch,
  customMsg,
}: {
  dispatch: (action: ProposalAction) => void
  customMsg: MessageMapEntry
}) {
  const [errorJson, setErrorJson] = useState<boolean>(false)
  const [errorCosmosMsg, setErrorCosmosMsg] = useState<boolean>(false)
  const [jsonErrorMessage, setJsonErrorMessage] = useState<string>('')
  const [lastInputJson, setLastInputJson] = useState<any>(undefined)
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
    try {
      const id = customMsg?.id ?? ''
      const messageType = customMsg?.messageType ?? ProposalMessageType.Custom
      let action: ProposalAction
      // If it is a WasmMsg, make sure it's properly encoded
      if (message.wasm) message = makeWasmMessage(message)

      const validCosmos = validateCosmosMsg(message)
      if (!validCosmos.valid) {
        setErrorCosmosMsg(true)
        console.log(validCosmos.errors)
      } else {
        setErrorCosmosMsg(false)
      }

      if (id) {
        action = {
          type: 'updateMessage',
          id,
          message,
        }
      } else {
        action = {
          type: 'addMessage',
          message,
          messageType,
        }
      }
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }

  const placeholder =
    lastInputJson?.length !== 0 ? (lastInputJson ? lastInputJson : '{}') : ''

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
    </div>
  )

  function validateJsonString(str: string) {
    try {
      JSON5.parse(str)
      setErrorJson(false)
    } catch (e: any) {
      console.log('yah no')
      setErrorJson(true)
      setJsonErrorMessage(`${e?.message}`)
      return false
    }
    return true
  }

  function handleMessage(value: string) {
    if (validateJsonString(value)) {
      setLastInputJson(value)

      updateCustom(JSON5.parse(value))
    } else {
      setLastInputJson(value)
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
