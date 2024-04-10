import React from 'react'
import './Loader.css'

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="three-body">
<div className="three-body__dot"></div>
<div className="three-body__dot"></div>
<div className="three-body__dot"></div>
</div>
</div>

  )
}

export default Loader
