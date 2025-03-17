import React from 'react'

const IconButton = ({ icon, onClick, className}) => {
  return (
    <div onClick={onClick} className={`icon-button ${className}`}>
      {icon}  
    </div>
  )
}

export default IconButton