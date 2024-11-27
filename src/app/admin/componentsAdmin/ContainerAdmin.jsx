import React from 'react'

function ContainerAdmin({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      {children}
    </div>
  )
}

export default ContainerAdmin