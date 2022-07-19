/* eslint-disable i18next/no-literal-string */

import { Logo } from '../Logo'

export const ProposalLineLoader = () => (
  <>
    <ProposalLineLoaderDesktop />
    <ProposalLineLoaderMobile />
  </>
)

const ProposalLineLoaderDesktop = () => (
  <div className="hidden justify-center items-center h-[3.25rem] bg-primary rounded-lg md:flex">
    <Logo className="animate-spin-medium" />
  </div>
)

const ProposalLineLoaderMobile = () => (
  <div className="flex justify-center items-center h-[9.5rem] bg-primary rounded-lg md:hidden">
    <Logo className="animate-spin-medium" />
  </div>
)
