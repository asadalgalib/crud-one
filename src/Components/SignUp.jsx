import React, { useContext } from 'react';
import Swal from 'sweetalert2'
import { FaGoogle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                console.log(result);
                const createdAt = result?.user?.metadata?.creationTime;
                const newUser = { name, email, createdAt }
                // save user info from database
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('user created to db', data)
                        Swal.fire({
                            title: 'Success!',
                            text: 'Account created successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        navigate('/signin');
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className='py-10 md:py-24 px-4 md:px-auto flex flex-col justify-center items-center'>
            <div className="p-10 rounded-lg bg-base-100 w-full max-w-md shrink-0 border-2 border-black">
                <h1 className="mb-5 text-3xl text-center font-medium"><span className="">Create</span> Your Account</h1>
                <form onSubmit={handleSubmit} className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <button className="btn btn-outline bg-blue-400 border-none w-full text-white my-4 text-lg">Sign Up</button>
                    </div>
                </form>
                <div className='flex justify-center items-center'>
                    <p>Already have an account? <NavLink to={'/signin'}><button className='font-medium ml-2 text-blue-400'>Login</button></NavLink></p>
                </div>
                <div className='flex justify-center items-center mt-5'>
                    <button className="btn btn-outline w-full text-lg"><FaGoogle></FaGoogle> Sign Up with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;