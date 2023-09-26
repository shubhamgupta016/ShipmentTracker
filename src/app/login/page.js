"use client"
import { useState } from "react"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [storedUserid, setStoredUserid] = useState('');
    const callLoginApi = async (val) => {
        const userData = { userid, password };
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 201) {
                Cookies.set('userid', userid);
                const storedUserid = Cookies.get('userid');
                setStoredUserid(userid);
                const data = await response.json();
                Cookies.set('username', data.data.username);
                Cookies.set('role', data.data.role);
                if (storedUserid === Cookies.get('userid')) {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }
            } else {
                
                router.push('/authfail');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };
    return (
        <main>
            <div className="relative w-full bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <div className="hidden lg:block">
                        <button
                            type="button"
                            onClick={()=>router.push('/shipmentstatus')}
                            className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                        >
                            Track your Shipment status here
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="ml-2 h-4 w-4"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>

                    </div>
                    <div className="lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-6 w-6 cursor-pointer"
                        >
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>

            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            <h1 className="text-center text-4xl font-bold leading-tight text-black">Shipment Tracker</h1>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Sign in to your account
                        </h2>
                        <form method="POST" onSubmit={callLoginApi}>
                            <div className="space-y-5">
                                <div>
                                    <label for="" className="text-base font-medium text-gray-900">
                                        {" "}
                                        User Id{" "}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setUserid(val.target.value)}
                                            placeholder="User Id"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Password{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password" onChange={(val) => setPassword(val.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started{" "}
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