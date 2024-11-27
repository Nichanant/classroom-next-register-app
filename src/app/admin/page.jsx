"use client"

import React, { useState, useEffect } from 'react'
import AdminNav from './componentsAdmin/AdminNav'
import ContainerAdmin from './componentsAdmin/ContainerAdmin'
import Footer from './componentsAdmin/FooterAdmin'
import SideNav from './componentsAdmin/SideNav'
import Content from './componentsAdmin/Content'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


function AdminPage() {

    const { data: session } = useSession();
    if (!session) redirect("/login");
    if (!session?.user?.role === "admin") redirect("/Welcome");

    const [totalUsersData, setTotalUsersData] = useState([]);
    const [totalPostsData, setTotalPostsData] = useState([]);

    const getTotalUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalUsers`, {
                cache: "no-cache"
            })

            if (!res.ok) {
                throw new Error("Error fetch totalUsers!")
            }

            const data = await res.json();
            setTotalUsersData(data.totalUsers);

        } catch (error) {
            console.log("Error loading TotalUsers: ", error);
        }
    }

    const getTotalPosts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts`, {
                cache: "no-cache"
            })

            if (!res.ok) {
                throw new Error("Error fetch totalUsers!")
            }

            const data = await res.json();
            setTotalPostsData(data.totalPosts);

        } catch (error) {
            console.log("Error loading TotalUsers: ", error);
        }
    }

    useEffect(() => {
        getTotalUsers();
        getTotalPosts();
    }, [])


    return (
        <ContainerAdmin>
            <AdminNav session={session} />
            <div className='flex-grow'>
                <div className='container mx-auto'>
                    <div className='flex justify-between mt-10'>
                        <SideNav />
                        <Content totalUsersData={totalUsersData} totalPostsData={totalPostsData}/>
                    </div>
                </div>
            </div>
            <Footer />
        </ContainerAdmin>

    )
}

export default AdminPage
