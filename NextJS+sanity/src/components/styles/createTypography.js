import createMuiTypography from '@material-ui/core/styles/createTypography'
import deepmerge from '@oakwood/oui-utils/deepmerge'

const caseAllCaps = {
  textTransform: 'uppercase',
}

export default function createTypography(palette, typography) {
  const {
    fontFamilyPrimary = '"Gotham", "Helvetica", "Arial", sans-serif',
    fontFamilySecondary = '"Caslon", "Helvetica", "Arial", sans-serif',
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightSemibold = 600,
    fontWeightBold = 700,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography

  const coef = fontSize / 14
  const pxToRem = size => `${(size / htmlFontSize) * coef}rem`
  const buildVariant = (typeFace, fontWeight, size, lineHeight, letterSpacing, casing) => ({
    fontFamily: typeFace,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    letterSpacing: `${letterSpacing}em`,
    ...casing,
    ...allVariants,
  })

  const variants = {
    h1: buildVariant(fontFamilyPrimary, fontWeightMedium, 84, 1, 0),
    h2: buildVariant(fontFamilyPrimary, fontWeightMedium, 60, 1.05, 0),
    h3: buildVariant(fontFamilyPrimary, fontWeightMedium, 38, 1.15, 0),
    h4: buildVariant(fontFamilyPrimary, fontWeightMedium, 20, 1.2, 0.2, caseAllCaps),
    h5: buildVariant(fontFamilyPrimary, fontWeightRegular, 20, 1.5, 0),
    h6: buildVariant(fontFamilyPrimary, fontWeightRegular, 16, 1.5, 0.2, caseAllCaps),
    specialBig: buildVariant(fontFamilySecondary, fontWeightRegular, 28, 1.5, 0),
    special: buildVariant(fontFamilySecondary, fontWeightRegular, 20, 1.5, 0),
    subtitle1: buildVariant(fontFamilyPrimary, fontWeightMedium, 15, 1.3, 0),
    subtitle2: buildVariant(fontFamilyPrimary, fontWeightMedium, 13, 1.3, 0),
    body1: buildVariant(fontFamilyPrimary, fontWeightLight, 14, 1.7, 0.03),
    body2: buildVariant(fontFamilyPrimary, fontWeightRegular, 10, 1.7, -0.02),
    button: buildVariant(fontFamilyPrimary, fontWeightBold, 15, 1, 0.07, caseAllCaps),
    caption: buildVariant(fontFamilyPrimary, fontWeightRegular, 12, 1.3, 0.04),
    overline: buildVariant(fontFamilyPrimary, fontWeightMedium, 10, 1, 0.12, caseAllCaps),
  }

  const typographyOutput = deepmerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamilyPrimary,
      fontFamilySecondary,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightSemibold,
      fontWeightBold,
      // Mui uses standalone `fontFamily` internally.
      fontFamily: fontFamilyPrimary,
      ...variants,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  )

  return createMuiTypography(palette, typographyOutput)
}
