"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNav from '../../../componentsAdmin/AdminNav'
import ContainerAdmin from '../../../componentsAdmin/containerAdmin'
import Footer from '../../../componentsAdmin/FooterAdmin'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function AdminEditUserPage({ params }) {
    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/Welcome");

    const { id } = params;
    
    const [userOldData, setUserOldData] = useState([]);
    
    //New user updated Data
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const getUserById = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalUsers/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Fail to Fetch Users");
            }

            const data = await res.json();
            setUserOldData(data.user);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserById(id);
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalUsers/${id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({newName, newEmail, newPassword})
            })

            if(!res.ok){
                throw new Error("Failed to Update User");
            }
            router.refresh();
            router.push("/admin/users");


        }catch(error){
            console.log("Error handleSupmit: ",error)
        }
    }

    return (
        <ContainerAdmin>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
                    <Link href="/admin/users"
                        className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>
                        Go Back</Link>
                    <hr className='my-3' />
                    <h3 className='text-xl'>Edit Admin User Post</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            placeholder={userOldData?.name}
                            onChange={(e)=>{setNewName(e.target.value)}}
                            value={newName}
                            className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                        <input type="email"
                            placeholder={userOldData?.email}
                            onChange={(e)=>{setNewEmail(e.target.value)}}
                            value={newEmail}
                            className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />
                        <input type="password"
                            placeholder={userOldData?.password}
                            onChange={(e)=>{setNewPassword(e.target.value)}}
                            value={newPassword}
                            className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' />

                        <button
                            className='bg-blue-500 text-white border py-2 px-3 rounded text-lg my-2'
                            type='submit' name='update'>Update User</button>
                    </form>
                </div>
            </div>
            <Footer />
        </ContainerAdmin>
    )
}

export default AdminEditUserPage
