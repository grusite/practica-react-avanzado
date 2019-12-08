import React from 'react'
import T from 'prop-types'

import './styles.css'

export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  )
}

Loading.propTypes = {
  className: T.string,
}
