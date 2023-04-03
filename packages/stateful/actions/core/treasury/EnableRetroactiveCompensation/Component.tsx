import { useTranslation } from 'react-i18next'

import { ButtonLink } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

export const EnableRetroactiveCompensationComponent: ActionComponent = () => {
  const { t } = useTranslation()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.retroactiveCompensationDescription')}
      </p>

      <ButtonLink
        containerClassName="self-start"
        href="https://docs.google.com/document/d/e/2PACX-1vT5QQRZTQGUQt1Ikcfiil50xU-VT2tNOnfYapQ6-J1D8KhfmX88B28sqyaLrE-JCV-j-P52ZCUTowZi/pub"
        variant="underline"
      >
        {t('button.readMore')}
      </ButtonLink>
    </>
  )
}
