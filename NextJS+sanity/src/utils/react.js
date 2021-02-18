import React from 'react'

export function isUiElement(element, uiNames) {
  return React.isValidElement(element) && uiNames.includes(element.type.uiName)
}
