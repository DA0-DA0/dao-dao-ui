import { useTranslation } from 'react-i18next'

export interface GovernanceConfigurationReviewProps {}

export const GovernanceConfigurationReview =
  ({}: GovernanceConfigurationReviewProps) => {
    const { t } = useTranslation()

    return (
      <p className="flex justify-center items-center">
        Governance Configuration review
      </p>
    )
  }
