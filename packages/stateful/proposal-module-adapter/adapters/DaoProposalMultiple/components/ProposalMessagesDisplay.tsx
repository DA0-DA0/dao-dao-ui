import { useTranslation } from 'react-i18next'

import { ActionKeyAndData } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { MultipleChoiceOptionData } from '../types'
import { MultipleChoiceOptionViewer } from './MultipleChoiceOptionViewer'

export type ProposalMessagesDisplayProps = {
  /**
   * Multiple choice options data to display.
   */
  optionsData: MultipleChoiceOptionData[]
  /**
   * The winning option index, if any.
   */
  winningOptionIndex?: number
  /**
   * Callback when actions are loaded for an option.
   */
  onLoad?: (
    optionData: MultipleChoiceOptionData,
    loadedData: ActionKeyAndData[]
  ) => void
}

export const ProposalMessagesDisplay = ({
  optionsData,
  winningOptionIndex,
  onLoad,
}: ProposalMessagesDisplayProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <p className="title-text mb-2">{t('title.voteOptions')}</p>

      {optionsData.map((data, index) => (
        <MultipleChoiceOptionViewer
          key={index}
          SuspenseLoader={SuspenseLoader}
          data={data}
          lastOption={index === optionsData.length - 1}
          onLoad={onLoad && ((loadedData) => onLoad(data, loadedData))}
          winner={winningOptionIndex === data.choice.index}
        />
      ))}
    </div>
  )
}
