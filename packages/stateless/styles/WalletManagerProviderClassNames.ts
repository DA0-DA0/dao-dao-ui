import { WalletManagerProviderProps } from '@noahsaso/cosmodal'

const WalletManagerProviderClassNames: WalletManagerProviderProps['classNames'] =
  {
    modalOverlay: '!backdrop-brightness-50 !backdrop-filter',
    modalContent:
      '!p-6 !max-w-md !bg-background-base !rounded-lg !border !border-border-secondary !shadow-dp8',
    modalCloseButton:
      '!p-1 !text-icon-tertiary bg-transparent hover:!bg-background-interactive-hover active:!bg-background-interactive-pressed !rounded-full !transition !absolute !top-2 !right-2',
    modalHeader: '!header-text',
    modalSubheader: '!title-text',
    wallet:
      '!rounded-lg !bg-background-secondary !p-4 !shadow-none transition-opacity opacity-100 hover:opacity-80 active:opacity-70',
    walletImage: '!rounded-full',
    walletName: '!primary-text',
    walletDescription: '!caption-text',
    textContent: '!body-text',
  }

export default WalletManagerProviderClassNames
