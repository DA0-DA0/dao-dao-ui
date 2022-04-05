import { useState } from 'react'
import { FC } from 'react'
import { Button } from 'ui'
import SvgAirplane from './icons/Airplane'

export interface ExecuteProps {
  onExecute: () => void
  messages: number
  loading: boolean
}

export const Execute: FC<ExecuteProps> = ({ onExecute, messages, loading }) => {
  const [partyMode, setPartMode] = useState(false)
  const [partyPhase, setPartyPhase] = useState(1)

  return (
    <>
      {!partyMode && (
        <div className="flex items-center p-4 rounded-lg border border-default bg-primary justify-between max-w-3xl">
          <div className="flex items-center gap-2">
            <button onClick={() => setPartMode(true)} className="text-2xl mr-1">
              🎉
            </button>
            <p className="primary-text">Passed</p>
            <p className="secondary-text">
              {messages} message{messages !== 1 && 's'}
            </p>
          </div>
          <Button onClick={() => onExecute()} loading={loading}>
            Execute <SvgAirplane stroke="currentColor" />
          </Button>
        </div>
      )}
      {partyMode && (
        <div className="flex items-center p-4 rounded-lg border border-default bg-primary justify-between max-w-3xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPartMode(false)
                setPartyPhase(1)
              }}
              className={`text-2xl mr-1 ${
                [
                  '',
                  'rumble',
                  'rumble-fast',
                  'rumble-faster',
                  'rumble-fastest',
                ][partyPhase]
              }`}
            >
              🚀
            </button>
            <p className="primary-text">Executing</p>
            <p className="secondary-text">
              {messages} message{messages !== 1 && 's'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 1 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(2)}
            >
              3
            </Button>
            <Button
              variant="secondary"
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 2 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(3)}
            >
              2
            </Button>
            <Button
              variant="secondary"
              className={`bg-error hover:bg-error hover:ring text-white ${
                partyPhase !== 3 ? 'invisible' : ''
              }`}
              onClick={() => setPartyPhase(4)}
            >
              1
            </Button>

            <Button
              onClick={() => onExecute()}
              loading={loading}
              className={`${partyPhase !== 4 ? 'invisible' : ''}`}
            >
              Execute <SvgAirplane stroke="currentColor" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
