import { useTranslation } from 'react-i18next'

export interface GovernanceConfigurationProps {}

export const GovernanceConfiguration = ({}: GovernanceConfigurationProps) => {
  const { t } = useTranslation()

  return (
    <p className="flex justify-center items-center">Governance Configuration</p>
  )
}
