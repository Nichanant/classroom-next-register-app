"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import imgPencil from '../../pic/b_edit_writing_icon.svg'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();
    
    const {data: session} = useSession();
    if(session) router.replace("/Welcome");
    // if(session?.user?.role === "admin") {redirect("/admin");}else{redirect("/Welcome");}

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", { 
                email, password, redirect: false 
            })
            
            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
            
            router.replace("/Welcome");
          
        } catch(error) {
            console.log(error);
        }
    }



    return (
        <Container>
            <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[450px] shadow-xl p-10 mt-5 rounded-xl'>
                        <div className='flex gap-2'>
                            <Image src={imgPencil} width={25} height={0} alt='image signin' />
                            <h3 className='text-3xl'>Log in</h3>
                        </div>
                        <hr className='my-3' />

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className='bg-red-500 w-fit text-md text-white py1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}

                            <input type="text"
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder='Enter your Email'
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <input type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder='Enter your Password'
                                className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <button
                                className='bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2'
                                type='submit'>Sign In</button>
                            <hr className='my-3' />

                            <p>Do not have an account? Please <Link href="/register" className='text-blue-600 hover:underline'><span className='bg-gray-100 p-1 rounded-md'>Register</span></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    )
}

export default LoginPage
