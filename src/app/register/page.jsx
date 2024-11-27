"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import imgPencil from '../../pic/b_edit_writing_icon.svg'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const { data: session} = useSession();
    if(session) redirect("/Welcome")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password do not match");
            return; /* End working */
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs");
            return;
        }

        try {
            const resUserExist = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/userExist`, {
                method: "POST",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            const { user } = await resUserExist.json(); // รับค่าที่ส่งไป มาเก็บในตัวแปร Deconstructering
            if(user){ // เป็นการ check ว่ามี user ที่มี email นี้อยู่ไหม
                setError("User already exist!");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
                method: "POST",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })


            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Register Successfully.");
                form.reset();
            } else {
                console.log("User register failed!")
            }

        } catch (error) {
            console.log("Error during Registration: ", error)
        }
    }

    return (
        <div>
            <Container>
                <Navbar />
                <div className='flex-grow'>
                    <div className='flex justify-center items-center'>
                        <div className='w-[450px] shadow-xl p-10 mt-5 rounded-xl'>
                            <div className='flex gap-2'>
                                <Image src={imgPencil} width={25} height={0} alt='image signin' />
                                <h3 className='text-3xl'>Register</h3>
                            </div>
                            <hr className='my-3' />


                            {error && (
                                <div className='bg-red-500 w-fit text-md text-white py1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className='bg-green-500 w-fit text-md text-white py1 px-3 rounded-md mt-2'>
                                    {success}
                                </div>
                            )}


                            <form onSubmit={handleSubmit}>
                                <input type="text" onChange={(e) => { setName(e.target.value) }}
                                    placeholder='Enter your Name'
                                    className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                                <input type="email" onChange={(e) => { setEmail(e.target.value) }}
                                    placeholder='Enter your Email'
                                    className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                                <input type="password" onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder='Enter your Password'
                                    className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                                <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    placeholder='Confirm your Password'
                                    className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                                <button
                                    className='bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2'
                                    type='submit'>Sign Up</button>
                                <hr className='my-3' />

                                <p>Already have an account. Please <Link href="/login" className='text-blue-600 hover:underline'><span className='bg-gray-100 p-1 rounded-md'>Login</span></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default RegisterPage
