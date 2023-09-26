"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import '../dashboard.css'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
export default function Driverdashboard() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypepassword, setReTypePassword] = useState('');
    const [role, setRole] = useState('');
    const [vehiclenumber, setVehiclenumber] = useState('');
    const [licensenumber, setLicensenumber] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const callDriverRegistrationApi = async (val) => {
        
        try{
            const userData = { username, email, password, role, vehiclenumber, licensenumber, contactnumber} 
            
            const response = await fetch('/api/driverregister',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 201) {
                const data = await response.json();
                Swal.fire({
                    icon:'success',
                    title:'Registered Successfully',
                    text:`Your UserId is '${data.data.userid}' and Password is '${data.data.password}'`
                })
                window.location.reload();
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        }catch (error) {
            console.error('An error occurred', error);
        }
    };
    return (
        <main>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">

                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Sign up to Driver account
                        </h2>
                        <p className="mt-2 text-center text-base text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/"
                                onClick={Cookies.remove('userid')}
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form method="POST" onSubmit={callDriverRegistrationApi}  className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label for="name" className="text-base font-medium text-gray-900">
                                        {" "}
                                        Driver Name{" "}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setUsername(val.target.value)}
                                            placeholder="User Name"
                                            id="name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="email" className="text-base font-medium text-gray-900">
                                        {" "}
                                        Email address{" "}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email" onChange={(val) => setEmail(val.target.value)}
                                            placeholder="Email"
                                            id="email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="password" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Password{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password" onChange={(val) => setPassword(val.target.value)}
                                            placeholder="Password"
                                            id="password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="retypepassword" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Re-Type Password{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password" onChange={(val) => setReTypePassword(val.target.value)}
                                            placeholder="Re-Type Password"
                                            id="retypepassword"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="role" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Role{" "}
                                        </label>
                                        <select className="text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onChange={(val) => setRole(val.target.value)}>
                                            <option >Select a Role</option>
                                            <option value="driver">Driver</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="vehiclenumber" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Vehicle Number{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setVehiclenumber(val.target.value)}
                                            placeholder="Vehicle Number"
                                            id="vehiclenumber"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="licensenumber" className="text-base font-medium text-gray-900">
                                            {" "}
                                            License Number{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setLicensenumber(val.target.value)}
                                            placeholder="License Number"
                                            id="licensenumber"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="contactnumber" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Contact Number{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setContactnumber(val.target.value)}
                                            placeholder="Contact Number"
                                            id="contactnumber"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Driver{" "}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="ml-2"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </main>
    )
}