import React from 'react'
import { GoSync } from 'react-icons/go';

const Button = ({
  children,
  loading,
  disable,
  ...rest
}) => {

  const classes = rest.className
  return (
    <button {...rest} disabled={disable} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  )
}

export default Button