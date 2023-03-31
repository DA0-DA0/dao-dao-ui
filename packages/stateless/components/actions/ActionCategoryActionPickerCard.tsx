import { Action, ActionCategoryWithLabel } from '@dao-dao/types/actions'

import { Button } from '../buttons'
import { ActionCard } from './ActionCard'

export type ActionCategoryActionPickerCardProps = {
  category: ActionCategoryWithLabel
  onSelectAction: (action: Action) => void
  onRemove: () => void
}

export const ActionCategoryActionPickerCard = ({
  category,
  onSelectAction,
  onRemove,
}: ActionCategoryActionPickerCardProps) => (
  <ActionCard category={category} onRemove={onRemove}>
    {category.actions.map((action) => (
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
