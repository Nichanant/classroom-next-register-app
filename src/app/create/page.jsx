"use client"

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function CreatePage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");

    const userEmail = session?.user?.email;

    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [content, setContent] = useState("")

    console.log(title, img, content);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !img || !content) {
            alert("Please complete your content!");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, img, content, userEmail })
            })

            if (res.ok) {
                router.push("/Welcome");
            } else {
                throw new Error("Failed to create a post");
            }


        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div>
            <Container>
                <Navbar session={session}/>
                <div className='flex-grow'>
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                        <Link href="/welcome"
                            className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>
                            Go Back</Link>
                        <hr className='my-3' />
                        <h3 className='text-xl'>Create Post</h3>

                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                onChange={(e) => { setTitle(e.target.value) }}
                                placeholder='Post Title'
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <input type="text"
                                onChange={(e) => { setImg(e.target.value) }}
                                placeholder='Post Image URL'
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <textarea name="" id="" cols="30" rows="10"
                                onChange={(e) => { setContent(e.target.value) }}
                                placeholder='Post Content'
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'></textarea>
                            <button
                                className='bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2'
                                type='submit' name='create'>POST</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default CreatePage
