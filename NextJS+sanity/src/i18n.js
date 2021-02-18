import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

const locale = 'EN'
const Context = React.createContext()

function useTranslations() {
  return React.useContext(Context)
}

export const TranslationsProvider = props => {
  const { children, translations: translationStrings } = props
  const localeStrings = translationStrings[locale]
  const translations = React.useCallback(
    (strings, ...expressions) => {
      // find keys in translations
      const translatedStrings = strings.map(str => {
        const translation = get(localeStrings, str.replace(/ /g, ''))
        return translation ?? str
      })
      // build result with expressions
      const result = translatedStrings.reduce((acc, part, i) => {
        /* eslint-disable no-param-reassign */
        acc += part
        const expression = expressions[i]
        if (expression) {
          acc += expression
        }
        return acc
      }, '')
      return result
    },
    [localeStrings],
  )
  return <Context.Provider value={translations}>{children}</Context.Provider>
}

TranslationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  translations: PropTypes.object.isRequired,
}

export default useTranslations
