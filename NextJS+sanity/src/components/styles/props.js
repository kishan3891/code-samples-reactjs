// These should be uncommented and implemented!

// import React from 'react'
// import CheckboxCheckedIcon from '../icons/CheckboxChecked'
// import CheckboxUncheckedIcon from '../icons/CheckboxUnchecked'
// import RadioCheckedIcon from '../icons/RadioChecked'
// import RadioUncheckedIcon from '../icons/RadioUnchecked'
// import SelectArrowIcon from '../icons/SelectArrow'

const props = {
  MuiAppBar: {
    color: 'default',
    elevation: 0,
  },
  MuiButtonBase: {},
  MuiButton: {
    // disableElevation: true,
    variant: 'outlined',
  },
  MuiCheckbox: {
    color: 'default',
    // checkedIcon: <CheckboxCheckedIcon />,
    // icon: <CheckboxUncheckedIcon />,
  },
  MuiLink: {
    color: 'inherit',
  },
  MuiPaper: {
    elevation: 0,
    square: true,
  },
  MuiRadio: {
    color: 'default',
    // checkedIcon: <RadioCheckedIcon />,
    // icon: <RadioUncheckedIcon />,
  },
  MuiSelect: {
    displayEmpty: true,
    // IconComponent: SelectArrowIcon,
    native: true,
  },
  OuiMedia: {
    component: 'picture',
  },
  MuiTextField: {
    variant: 'outlined',
  },
  MuiHidden: {
    implementation: 'css',
  },
}

export default props
