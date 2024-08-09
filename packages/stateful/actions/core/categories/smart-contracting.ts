import {
  ActionCategoryKey,
  ActionCategoryMaker,
  ActionKey,
} from '@dao-dao/types'

export const makeSmartContractingActionCategory: ActionCategoryMaker = ({
  t,
}) => ({
  key: ActionCategoryKey.SmartContracting,
  label: t('actionCategory.smartContractingLabel'),
  description: t('actionCategory.smartContractingDescription'),
  actionKeys: [
    ActionKey.Instantiate,
    ActionKey.Instantiate2,
    ActionKey.Execute,
    ActionKey.Migrate,
    ActionKey.UpdateAdmin,
    ActionKey.UploadCode,
    ActionKey.FeeShare,
  ],
})
