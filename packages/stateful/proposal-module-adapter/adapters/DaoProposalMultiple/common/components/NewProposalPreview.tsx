import { Block, Circle } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProposalContentDisplay } from '@dao-dao/stateless'
import { MultipleChoiceOptionType } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { convertActionsToMessages } from '@dao-dao/utils'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { EntityDisplay, SuspenseLoader } from '../../../../../components'
import { useWalletInfo } from '../../../../../hooks'
import { MULTIPLE_CHOICE_OPTION_COLORS } from '../../components/MultipleChoiceOptionEditor'
import { MultipleChoiceOptionViewer } from '../../components/MultipleChoiceOptionViewer'
import { NewProposalForm } from '../../types'

export const NewProposalPreview = () => {
  const { t } = useTranslation()
  const { watch } = useFormContext<NewProposalForm>()

  const { loadedActions } = useLoadedActionsAndCategories()
  const { walletAddress = '', walletProfileData } = useWalletInfo()

  const proposalDescription = watch('description')
  const proposalTitle = watch('title')
  const choices = watch('choices') ?? []

  return (
    <ProposalContentDisplay
      EntityDisplay={EntityDisplay}
      createdAt={new Date()}
      creator={{
        address: walletAddress,
        name: walletProfileData.loading
          ? { loading: true }
          : { loading: false, data: walletProfileData.profile.name },
      }}
      description={proposalDescription}
      innerContentDisplay={
        <div>
          <p className="title-text mb-2">{t('title.voteOptions')}</p>

          {choices.map(({ title, description, actionData }, index) => (
            <MultipleChoiceOptionViewer
              key={index}
              SuspenseLoader={SuspenseLoader}
              data={{
                choice: {
                  description,
                  index,
                  msgs: [],
                  title,
                  option_type: MultipleChoiceOptionType.Standard,
                  vote_count: '0',
                },
                actionData: [],
                decodedMessages: convertActionsToMessages(
                  loadedActions,
                  actionData || [],
                  {
                    throwErrors: false,
                  }
                ),
                voteOption: {
                  Icon: Circle,
                  label: title,
                  value: { option_id: index },
                  color:
                    MULTIPLE_CHOICE_OPTION_COLORS[
                      index % MULTIPLE_CHOICE_OPTION_COLORS.length
                    ],
                },
              }}
              forceRaw
              lastOption={false}
            />
          ))}

          {/* None of the above */}
          <MultipleChoiceOptionViewer
            SuspenseLoader={SuspenseLoader}
            data={{
              choice: {
                description: '',
                index: choices.length,
                msgs: [],
                title: '',
                option_type: MultipleChoiceOptionType.None,
                vote_count: '0',
              },
              actionData: [],
              decodedMessages: [],
              voteOption: {
                Icon: Block,
                label: '',
                value: { option_id: choices.length },
              },
            }}
            forceRaw
            lastOption
          />
        </div>
      }
      title={proposalTitle}
    />
  )
}
