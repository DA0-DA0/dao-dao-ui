import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

export const SpendEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.money')} symbol="💵" />
}

export const StakeEmoji = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.box')} symbol="📥" />
}
