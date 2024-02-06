/**
 * The page content's left padding used in `DappLayout` and `SdaLayout`.
 */
export const PAGE_PADDING_LEFT_CLASS = 'pl-6'
/**
 * The page content's right padding used in `DappLayout` and `SdaLayout`.
 */
export const PAGE_PADDING_RIGHT_CLASS = 'pr-6'
/**
 * The page content's horizontal padding used in `DappLayout` and `SdaLayout`.
 */
export const PAGE_PADDING_HORIZONTAL_CLASSES =
  PAGE_PADDING_LEFT_CLASS + ' ' + PAGE_PADDING_RIGHT_CLASS
/**
 * Classes usable by page content to undo the default horizontal page padding.
 * Some pages may need to set their own padding or add content that stretches
 * across the whole page. For example, this is used by the featured DAO card
 * container on the Home page so they can appear to overflow the edge of the
 * screen. This is also used by the PageHeader component to stretch its border
 * to the edges of the screen on small screens.
 */
export const UNDO_PAGE_PADDING_HORIZONTAL_CLASSES = '-mx-6'

/**
 * The page content's top padding used in `DappLayout` and `SdaLayout`.
 */
export const PAGE_PADDING_TOP_CLASSES = 'pt-6 sm:pt-10'
/**
 * Classes usable by page content to undo the default top page padding.
 */
export const UNDO_PAGE_PADDING_TOP_CLASSES = '-mt-6 sm:-mt-10'
/**
 * Classes usable by page content to undo the default top page padding by
 * setting the `top` CSS property to the padding's negative. This is useful in
 * sticky elements to set their sticky top position right under the header
 * instead of at the padding.
 */
export const UNDO_PAGE_PADDING_TOP_CLASSES_WITH_TOP = '-top-6 sm:-top-10'

/**
 * The page content's bottom padding used in `DappLayout` and `SdaLayout`.
 */
export const PAGE_PADDING_BOTTOM_CLASSES = 'pb-4 sm:pb-8'
/**
 * Classes usable by page content to undo the default bottom page padding.
 */
export const UNDO_PAGE_PADDING_BOTTOM_CLASSES = '-mb-4 sm:-mb-8'

/**
 * The page header's height classes.
 */
export const PAGE_HEADER_HEIGHT_CLASSES = 'h-14 sm:h-16 md:h-[4.5rem]'
