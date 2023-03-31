import {
  Action,
  ActionCategoryWithLabel,
  ActionKey,
} from '@dao-dao/types/actions'

import { Button } from '../buttons'
import { ActionCard } from './ActionCard'

export type ActionCategoryActionPickerCardProps = {
  category: ActionCategoryWithLabel
  // Action keys already used. If an action is not reusable, and it is already
  // used, it should not be disabled in this category action picker.
  usedActionKeys: ActionKey[]
  onSelectAction: (action: Action) => void
  onRemove: () => void
  onChangeCategory: () => void
}

export const ActionCategoryActionPickerCard = ({
  category,
  usedActionKeys,
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
        // Show if reusable or not already used.
        (action) => !action.notReusable || !usedActionKeys.includes(action.key)
      )
      .map((action) => (
        <Button
          key={action.key}
          contentContainerClassName="gap-4 text-left"
          onClick={() => onSelectAction(action)}
          variant="ghost"
        >
          {action.Icon && (
            <p className="text-3xl">
              <action.Icon />
            </p>
          )}

          <div className="flex flex-col items-start gap-1">
            <p className="primary-text">{action.label}</p>
            <p className="caption-text">{action.description}</p>
          </div>
        </Button>
      ))}
  </ActionCard>
)
