import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import imgBoat from '../../../pic/b_ship_icon.svg'

import { signOut } from 'next-auth/react'

function AdminNav({session}) {
    return (
        <nav className='shadow-xl bg-blue-100'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center p-2'>
                    <div className='flex justify-center items-center'>
                        <Link href="/">
                            <Image src={imgBoat} width={80} height={80} alt='logo boat' />
                        </Link>
                        <h1 className='text-4xl px-3'>Admin</h1>
                    </div>
                    <ul className='flex'>
                        {!session ? (
                            <>
                                <li className='transition-all mx-3 py-1 border-2 hover:border-b-blue-500 hover:ease-in hover:font-bold border-blue-100'><Link href="/login">Login</Link></li>
                                <li className='transition-all mx-3 py-1 border-2 hover:border-b-blue-500 hover:ease-in hover:font-bold border-blue-100'><Link href="/register">Register</Link></li>
                            </>
                        ) :
                            (
                                <>
                                    <li className='transition-all mx-3 py-1 hover:ease-in hover:text-red-400 border-blue-100 bg-blue-800 text-white px-2 rounded-md cursor-pointer'>
                                        <a onClick={() => { signOut() }}>Log out</a>
                                    </li>
                                </>
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav
