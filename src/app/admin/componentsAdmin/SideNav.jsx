import React from 'react'
import Link from 'next/link'

function SideNav() {
  return (
    <nav className='shadow-lg p-10 rounded-lg bg-blue-100'>
      <ul>
        <li><Link className='block p-2 m-2 text-lg hover:text-blue-500 hover:border-l-blue-500 border-4 border-blue-100' href="/admin">Dashboard</Link></li>
        <li><Link className='block p-2 m-2 text-lg hover:text-blue-500 hover:border-l-blue-500 border-4 border-blue-100' href="/admin/users">Users</Link></li>
        <li><Link className='block p-2 m-2 text-lg hover:text-blue-500 hover:border-l-blue-500 border-4 border-blue-100' href="/admin/posts">Posts</Link></li>
      </ul>
    </nav>
  )
}

export default SideNav
