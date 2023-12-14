import { MouseEvent } from 'react'

import {
  Action,
  ActionCategoryWithLabel,
  ActionKey,
} from '@dao-dao/types/actions'

import { Button } from '../buttons'
import { Loader } from '../logo'
import { TooltipInfoIcon } from '../tooltip'
import { ActionCard } from './ActionCard'

export type ActionCategoryActionPickerCardProps = {
  category: ActionCategoryWithLabel
  // Action keys already used. If an action is not reusable, and it is already
  // used, it should not be disabled in this category action picker.
  usedActionKeys: ActionKey[]
  // Action keys still loading.
  loadingActionKeys: ActionKey[]
  // Errored action keys.
  erroredActionKeys: Partial<Record<ActionKey, Error>>
  onSelectAction: (action: Action, event: MouseEvent<HTMLButtonElement>) => void
  onRemove: () => void
  onChangeCategory: () => void
}

export const ActionCategoryActionPickerCard = ({
  category,
  usedActionKeys,
  loadingActionKeys,
  erroredActionKeys,
  onSelectAction,
  onRemove,
  onChangeCategory,
}: ActionCategoryActionPickerCardProps) => (
  <ActionCard
    category={category}
    onCategoryClick={onChangeCategory}
    onRemove={onRemove}
  >
    {category.actions
      .filter(
        (action) =>
          // Never show programmatic actions.
          !action.programmaticOnly &&
          // Show if reusable or not already used.
          (!action.notReusable || !usedActionKeys.includes(action.key))
      )
      .map((action) => (
        <Button
          key={action.key}
          contentContainerClassName="gap-4 text-left"
          disabled={
            loadingActionKeys.includes(action.key) ||
            !!erroredActionKeys[action.key]
          }
          onClick={(event) => onSelectAction(action, event)}
          variant="ghost"
        >
          {action.Icon && (
            <p className="text-3xl">
              <action.Icon />
            </p>
          )}

          <div className="flex grow flex-col items-start gap-1">
            <p className="primary-text">{action.label}</p>
            <p className="caption-text">{action.description}</p>
          </div>

          {erroredActionKeys[action.key] && (
            <TooltipInfoIcon
              size="lg"
              title={erroredActionKeys[action.key]!.message}
              warning
            />
          )}

          {loadingActionKeys.includes(action.key) && (
            <Loader fill={false} size={32} />
          )}
        </Button>
      ))}
  </ActionCard>
)
