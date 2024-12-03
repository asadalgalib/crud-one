import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [totalUser, setTotalUser] = useState(loadedUsers)

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://coffe-house-server-neon.vercel.app/users/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = totalUser.filter(user => user._id !== _id);
                            setTotalUser(remaining);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    return (
        <div>
            <h2 className="text-3xl text-center">User: {totalUser.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Creation Time</th>
                            <th>Last Login</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalUser.map(users => <tr key={users._id}>
                                <th></th>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.createdAt}</td>
                                <td>{users.lastSignInTime}</td>
                                <td>
                                    <div className='flex gap-5'>
                                        <button className='btn-outline btn btn-success'>Update</button>
                                        <button onClick={() => handleDelete(users._id)} className='btn btn-error'>Delete</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;