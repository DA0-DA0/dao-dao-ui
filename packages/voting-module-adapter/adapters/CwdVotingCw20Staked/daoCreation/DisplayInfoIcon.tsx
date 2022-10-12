import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'react-i18next'

export const DisplayInfoIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.yinYang')} symbol="☯️" />
}
