import React from 'react'
import * as SvgIcons from '.'

export default { title: 'Icons' }

export const Default = () => (
  <>
    {Object.entries(SvgIcons).map(([name, SvgIcon]) => (
      <SvgIcon key={name} style={{ margin: 1 }} />
    ))}
  </>
)
