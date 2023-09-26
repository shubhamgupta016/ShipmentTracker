"use client"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css'
import Driverdata from '../DriverData'
export default function Layout({ children }) {
    const router = useRouter();
    const storedUsername = Cookies.get('username');
    return (
        <div>
            {
                Cookies.get('role')==='admin'?
                <div className="relative w-full bg-white border border-black-600">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center space-x-2">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                                <Link className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700" href="/dashboard">
                                    <span className="mx-2 text-2xl font-bold leading-tight">Dashboard</span>
                                </Link>
                            </label>
                        </div>
                        <div className="hidden grow items-start lg:flex">
                            <ul className="ml-12 inline-flex space-x-8">
                                <li>
                                    <Link className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700" href="/dashboard/shipmentdashboard">
                                        <span className="mx-2 text-1xl font-medium">Shipment Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700" href="/dashboard/userdashboard">
                                        <span className="mx-2 text-1xl font-medium">User Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700" href="/dashboard/driverdashboard">
                                        <span className="mx-2 text-1xl font-medium">Driver Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden space-x-2 lg:block">
                            Welcome {Cookies.get('username')},
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={() => {
                                Cookies.remove('userid')
                                Cookies.remove('role')
                                Cookies.remove('username')
                                router.push('/')
                            }}
                            >Logout</button>
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
                </div>:<div className="relative w-full bg-white border border-black-600">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center space-x-2">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                                <Link className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700" href="/dashboard">
                                    <span className="mx-2 text-2xl font-bold leading-tight">Dashboard</span>
                                </Link>
                            </label>
                        </div>
                        <div className="hidden space-x-2 lg:block">
                            Welcome {Cookies.get('username')},
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={() => {
                                Cookies.remove('userid')
                                Cookies.remove('role')
                                Cookies.remove('username')
                                router.push('/')
                            }}
                            >Logout</button>
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
}
                {children}
        </div>
    )
}