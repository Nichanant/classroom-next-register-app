"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNav from '../componentsAdmin/AdminNav'
import ContainerAdmin from '../componentsAdmin/ContainerAdmin'
import Footer from '../componentsAdmin/FooterAdmin'
import SideNav from '../componentsAdmin/SideNav'
import Image from 'next/image'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import DeleteBtn from './DeleteBtn'


function PostPage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/Welcome");

    const [allPostsData, setAllPostsData] = useState([]);

    const getAllPostsData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Error fetch all Posts Data");
            }

            const data = await res.json();
            setAllPostsData(data.totalPosts);

        } catch (error) {
            console.log("Error loading Posts.", error);
        }
    }

    useEffect(() => {
        getAllPostsData();
    }, [])

    return (
        <ContainerAdmin>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl mb-3'>Manage Posts</h3>
                            <p>A list of Posts retrived from MogoDB Database</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>Post ID</th>
                                            <th className='p-5'>Post Title</th>
                                            <th className='p-5'>Post Image</th>
                                            <th className='p-5'>Post Content</th>
                                            <th className='p-5'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allPostsData?.map((val) => (
                                            <tr key={val._id}>
                                                <td className='p-5'>{val._id}</td>
                                                <td className='p-5'>{val.title}</td>
                                                <td className='p-5'>
                                                    <Image className='my-3 shadow-md rounded-md'
                                                        width={300}
                                                        height={0}
                                                        src={val.img}
                                                        alt={val.title} />
                                                </td>
                                                <td className='p-5'>{val.content}</td>
                                                <td className='p-5'>
                                                    <Link href={`/admin/posts/edit/${val._id}`}
                                                        className='bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit</Link>

                                                    <DeleteBtn id={val._id}/>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </ContainerAdmin>
    )
}

export default PostPage
