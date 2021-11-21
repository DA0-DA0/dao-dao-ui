import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import daisyuiThemes from 'styles/daisyui-themes.json'
import { themeChange } from 'theme-change'
import { useThemeContext } from '../contexts/theme'

const themes = Object.keys(daisyuiThemes) || ['']
export const defaultTheme = themes[0]

function ThemeToggle() {
  const themeContext = useThemeContext()

  useEffect(() => {
    themeChange(false)
  })

  const updatedTheme =
    themeContext.theme !== defaultTheme ? defaultTheme : themes[1]

  return (
    <div className="form-control lg:mr-4 md:ml-auto">
      <label className="cursor-pointer label">
        <span className="label-text">
          <SunIcon className="w-6 h-6 mr-1" />
        </span>
        <input
          type="checkbox"
          className="toggle toggle-secondary mx-1"
          data-act-class="active"
          data-set-theme={updatedTheme}
          checked={themeContext.theme !== themes[0]}
          onClick={() => {
            themeContext.updateTheme(updatedTheme)
          }}
          readOnly
        />
        <span className="label-text">
          <MoonIcon className="ml-1 w-6 h-6" />
        </span>
      </label>
    </div>
  )
}

export default ThemeToggle
