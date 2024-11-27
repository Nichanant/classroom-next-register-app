"use client"

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function EditPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/login");


    const { id } = params;
    // console.log("Params", params); // เช็คดู ค่า Params ที่รับมา
    console.log("id from params", id); // log ดู ค่า id ที่ได้จาก Params

    const [postData, setPostData] = useState("");

    //New updated Post Data
    const [newTitle, setNewTitle] = useState("")
    const [newImg, setNewImg] = useState("")
    const [newContent, setNewContent] = useState("")

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch post");
            }

            const data = await res.json();
            console.log("Edit Post :", data); // Check ดูค่า ที่เรารับมาจากการ ยิงRequest ไป Response มาจาก Database
            setPostData(data); //ได้แล้ว ก็เก็บลงใน State เตรียมไปใช่ต่อ ในที่นี้เอาไปใช้ที่ imput > placeholder


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({newTitle, newImg, newContent})
            })

            if(!res.ok){
                throw new Error("Failed to res Update post");
            }

            router.refresh();
            router.push("/Welcome");
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Container>
                <Navbar />
                <div className='flex-grow'>
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                        <Link href="/Welcome"
                            className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>
                            Go Back</Link>
                        <hr className='my-3' />
                        <h3 className='text-xl'>Edit Post</h3>

                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                placeholder={postData.post?.title}
                                onChange={(e) => { setNewTitle(e.target.value) }}
                                value={newTitle}
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <input type="text"
                                placeholder={postData.post?.img}
                                onChange={(e) => { setNewImg(e.target.value) }}
                                value={newImg}
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <textarea name="" id="" cols="30" rows="10"
                                placeholder={postData.post?.content}
                                onChange={(e) => { setNewContent(e.target.value) }}
                                value={newContent}
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'>

                            </textarea>
                            <button
                                className='bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2'
                                type='submit' name='update'>Edit POST</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default EditPage
