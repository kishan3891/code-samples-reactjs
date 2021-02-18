import React from 'react'
import PropTypes from 'prop-types'

const PictureSources = props => {
  const { sources } = props

  return (
    <>
      {sources.map((source, i) => (
        <source key={i} {...source} />
      ))}
    </>
  )
}

PictureSources.propTypes = {
  sources: PropTypes.array,
}

export default PictureSources
