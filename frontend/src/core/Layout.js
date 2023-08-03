import React from 'react'

const Layout = ({title, description, className, children}) => {
  return (
    <div>
        <div className="p-5 bg-secondary mt-5">
            <h1 className="display-04">{title}</h1>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>
            {children}
        </div>
    </div>
  )
}

export default Layout