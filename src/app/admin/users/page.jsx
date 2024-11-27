"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNav from '../componentsAdmin/AdminNav'
import ContainerAdmin from '../componentsAdmin/containerAdmin'
import Footer from '../componentsAdmin/FooterAdmin'
import SideNav from '../componentsAdmin/SideNav'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from '../../admin/users/edit/DeleteBtn'

function UserPage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/Welcome");

    const [allUsersData, setAllUsersData] = useState([]);


    const getAllUsersData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalUsers`, {
                cache: "no-cache"
            })

            if (!res.ok) {
                throw new Error("Error Fetch totalUsersData");
            }

            const data = await res.json();
            setAllUsersData(data?.totalUsers);

        } catch (error) {
            console.log("Error Loading all Users Data", error)
        }
    }

    useEffect(() => {
        getAllUsersData();
    }, [])

    console.log("Data All User: ", allUsersData)

    return (
        <ContainerAdmin>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex mt-10'>
                        <SideNav />
                        <div className='p-10'>
                            <h3 className='text-3xl mb-3'>Manage Users</h3>
                            <p>A list of users retrived from MogoDB Database</p>

                            <div className='shadow-lg overflow-x-auto'>
                                <table className='text-left rounded-md mt-3 table-fixed w-full'>
                                    <thead>
                                        <tr className='bg-gray-400'>
                                            <th className='p-5'>ID</th>
                                            <th className='p-5'>Username</th>
                                            <th className='p-5'>Email</th>
                                            <th className='p-5'>Role</th>
                                            <th className='p-5'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsersData?.map((val) => (
                                            <tr key={val._id}>
                                                <td className='p-5'>{val._id}</td>
                                                <td className='p-5'>{val.name}</td>
                                                <td className='p-5'>{val.email}</td>
                                                <td className='p-5'>{val.role}</td>
                                                <td className='p-5'>
                                                    <Link href={`/admin/users/edit/${val._id}`}
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

export default UserPage
