import {
  BodyProps,
  ButtonProps,
  ContainerProps,
  HrProps,
  TextProps,
} from '@react-email/components'

// Match ../../stateless/styles/index.css dark theme
export const colors = {
  vanta: '0, 0, 0',
  black: '21, 22, 23',
  dark: '36, 38, 40',
  light: '243, 246, 248',
  white: '255, 255, 255',
  brand: '123, 97, 255',
  active: '179, 160, 255',
  error: '199, 62, 89',
  valid: '57, 166, 153',
  warning: '255, 217, 102',
}

// Dark theme
export const background = {
  base: `rgba(${colors.black}, 1)`,
  button: `rgba(${colors.light}, 0.9)`,
}

export const border = {
  primary: `rgba(${colors.light}, 0.1)`,
  secondary: `rgba(${colors.light}, 0.05)`,
}

export const textColors = {
  body: `rgba(${colors.light}, 0.95)`,
  primary: `rgba(${colors.white}, 1)`,
  secondary: `rgba(${colors.light}, 0.7)`,
  tertiary: `rgba(${colors.light}, 0.5)`,
  buttonPrimary: `rgba(${colors.black}, 0.95)`,
}

export const icon = {
  primary: `rgba(${colors.light}, 0.9)`,
}

// Styles
export const body: BodyProps['style'] = {
  backgroundColor: background.base,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: textColors.body,
  fontWeight: 500,
  fontFamily:
    'inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
  margin: 'auto',
  paddingTop: '1rem',
  paddingBottom: '1rem',
}

export const container: ContainerProps['style'] = {
  border: 1,
  borderStyle: 'solid',
  borderColor: border.primary,
  borderRadius: '0.375rem',
  marginTop: '1rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '2rem',
  width: '90%',
  maxWidth: '36rem',
}

export const text: TextProps['style'] = {
  color: textColors.primary,
  fontSize: '0.875rem',
  margin: '1rem 0',
}

export const titleText: TextProps['style'] = {
  ...text,
  fontSize: '1.25rem',
  fontWeight: 600,
}

export const buttonProps: ButtonProps = {
  style: {
    fontSize: '1rem',
    fontWeight: 500,
    backgroundColor: background.button,
    color: textColors.buttonPrimary,
    borderRadius: '0.375rem',
  },
  pX: 32,
  pY: 12,
}

export const hr: HrProps['style'] = {
  borderColor: border.secondary,
  marginTop: '1rem',
  marginBottom: '1rem',
}
