import { styles as MuiAppBar } from 'components/AppBar'
import { styles as MuiButton } from 'components/Button'
import MuiCssBaseline from 'components/CssBaseline'
import { styles as MuiToggleButtonGroup } from 'components/ToggleButtonGroup'
import { styles as MuiToggleButton } from 'components/ToggleButton'
import { styles as MuiDialog } from 'components/Dialog/styles'
import { styles as MuiDialogTitle } from 'components/DialogTitle'
import { styles as MuiChip } from 'components/Chip'
import { styles as MuiExpansionPanelSummary } from 'components/ExpansionPanelSummary'
import { styles as MuiExpansionPanelDetails } from 'components/ExpansionPanelDetails'
import { styles as MuiDrawer } from 'components/Drawer'
import { styles as MuiOutlinedInput } from 'components/OutlinedInput'
import { styles as MuiFormHelperText } from 'components/FormHelperText'

export default function createOverrides(theme) {
  const overrides = {
    MuiAppBar,
    MuiButton,
    MuiCssBaseline,
    MuiToggleButtonGroup,
    MuiToggleButton,
    MuiDialog,
    MuiDialogTitle,
    MuiChip,
    MuiExpansionPanelSummary,
    MuiExpansionPanelDetails,
    MuiDrawer,
    MuiOutlinedInput,
    MuiFormHelperText,
  }

  return Object.entries(overrides).reduce((acc, [muiName, styles]) => {
    acc[muiName] = typeof styles === 'function' ? styles(theme) : styles
    return acc
  }, {})
}
