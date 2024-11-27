"use client"

import React from 'react'

function DeleteBtn({ id }) {

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure to DELETE this post");

        if (confirmed) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalPosts?id=${id}`, {
                method: "DELETE"
            })

            if (res.ok) {
                window.location.reload();
            }
        }
    }

    return (
        <a className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer'
            onClick={handleDelete}>
            Delete
        </a>
    )
}

export default DeleteBtn
