"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from '../../../componentsAdmin/AdminNav'
import Footer from '../../../componentsAdmin/FooterAdmin'
import ContainerAdmin from '../../../componentsAdmin/ContainerAdmin'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function PostEditPage({ params }) {
    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/Welcome");

    const { id } = params;
    const router = useRouter();

    const [oldPostsData, setAllPostsData] = useState([]);
    console.log(oldPostsData);

    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");

    const getPostById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Error fteching old Posts");
            }

            const data = await res.json();
            setAllPostsData(data.post);

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts/${id}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({newTitle, newImg, newContent})
            })

            if(!res.ok){
                throw new Error("Failed to update Post");
            }

            router.refresh();
            router.push("/admin/posts");
            console.log("Put Handler DONE!!!");

        } catch (error) {
            console.log("Error to PUT Edit post")
        }

    }

    return (
        <div>
            <ContainerAdmin>
                <AdminNav session={session} />
                <div className='flex-grow'>
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                        <Link href="/admin/posts"
                            className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>
                            Go Back</Link>
                        <hr className='my-3' />
                        <h3 className='text-xl'>Admin Edit User Post</h3>

                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                placeholder={oldPostsData?.title}
                                onChange={(e) => { setNewTitle(e.target.value) }}
                                value={newTitle}
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <input type="text"
                                placeholder={oldPostsData?.img}
                                onChange={(e) => { setNewImg(e.target.value) }}
                                value={newImg}
                                className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                            <textarea name="" id="" cols="30" rows="10"
                                placeholder={oldPostsData?.content}
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
            </ContainerAdmin>
        </div>
    )
}

export default PostEditPage
