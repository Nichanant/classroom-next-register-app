"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {

    const { data: session } = useSession(); // ใช้ Hooks useSession เข้ามาเก็บ ข้อมูลจาก storage session
    // console.log("ข้อมูล user ใน session", session);

    if (!session) redirect("/login"); // คือ เช็คว่า มีข้อมูลSession(ค่าที่เราlogin) เข้ามาไหม เม่ื่อ -ไม่มี- ให้ Redirect ไปที่หน้า login

    if(session?.user?.role === "admin") redirect("/admin");

    const [postData, setPostData] = useState([]);
    const userEmail = session?.user?.email;


    const getPost = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?.email=${userEmail}`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts.")
            }
            const data = await res.json();

            console.log(data);
            setPostData(data.posts);

        } catch (error) {
            console.log("Error loading post : ", error)
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        <div>
            <Container>
                <Navbar session={session} />
                <div className='flex-grow'>
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl bg-gray-100 border border-2  border-blue-200'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='text-3xl'>Profile</h3>
                                <p className='text-xl text-blue-900'>Welcome, {session?.user?.name}</p>
                                <p className='text-xl text-blue-900'>Email :  {session?.user?.email}</p>
                            </div>
                            <div>
                                <Link href="/create"
                                    className='bg-blue-600 text-white border px-2 py-3 rounded-md text-lg my-2'>Create Post</Link>
                            </div>
                        </div>

                        {postData && postData.length > 0 ? (
                            postData.map((val) => (
                                <div key={val._id}>
                                    <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl bg-white'>
                                        <h4 className='text-2xl'>{val.title}</h4>
                                        <Image className='my-3 shadow-md rounded-md'
                                            width={300}
                                            height={0}
                                            src={val.img}
                                            alt={val.title} />
                                        <p>{val.content}</p>
                                        <div className='mt-5'>
                                            <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'
                                                href={`/edit/${val._id}`}>
                                                Edit</Link>
                                                <DeleteBtn id={val._id}/>
                                        </div>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>No Content Post</p>
                        )}

                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default WelcomePage
