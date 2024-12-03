import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignIn = () => {
    const { logInUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    
        logInUser(email, password)
            .then(result => {
                
                const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime };
                
                fetch(`http://localhost:5000/users`,{
                    method: 'PATCH',
                    headers: {
                        'content-type' : "application/json"
                    },
                    body: JSON.stringify(loginInfo)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                alert('log in success')
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='py-10 md:py-24 px-4 md:px-auto flex flex-col justify-center items-center'>
            <div className="p-10 rounded-lg bg-base-100 w-full max-w-md shrink-0 border-2 border-black">
                <h1 className="mb-5 text-center text-3xl font-medium"><span className="">Login</span> Your Account</h1>
                <form className="" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" name='password' className="input input-bordered" required />

                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>

                    </div>
                    <div className="form-control">
                        <button className="btn btn-outline bg-blue-400 border-none w-full text-white my-4 text-lg">Login</button>
                    </div>
                </form>
                <div className='flex justify-center items-center'>
                    <p>New to this Website? <NavLink to={'/signup'}><button className='font-medium ml-2 text-blue-400'>Register</button></NavLink></p>
                </div>
                <div className='flex justify-center items-center mt-5'>
                    <button className="btn btn-outline w-full text-lg"><FaGoogle></FaGoogle> Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;