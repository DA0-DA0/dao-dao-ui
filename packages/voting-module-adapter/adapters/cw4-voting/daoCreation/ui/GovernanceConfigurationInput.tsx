import { useTranslation } from 'react-i18next'

export interface GovernanceConfigurationInputProps {}

export const GovernanceConfigurationInput =
  ({}: GovernanceConfigurationInputProps) => {
    const { t } = useTranslation()

    return (
      <p className="flex justify-center items-center">
        Governance Configuration
      </p>
    )
  }
