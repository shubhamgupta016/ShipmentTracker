"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './dashboard.css'
import Driverdata from '../DriverData';
export default function Dashboard({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const navigate = (rout) => {
        router.push(`/dashboard/${rout}`)
    }
    const storedUsername = Cookies.get('username');
    useEffect(() => {
        fetch('/api/allshipmentsdatacount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => response.json())
            .then((data) => {
                let arr = data.data;
                setData(arr); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <main>
            
            {
                Cookies.get('role') === 'driver' ?(
                    <Driverdata /> ):(
                    <div>
                        { data && <div className='flex justify-center text-center' style={{ marginTop: '1%' }}>
                            <div className="w-[300px] rounded-md border">
                                <div className="p-4">
                                    <h1 className="text-lg font-semibold">Pending Shipment</h1>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    >
                                        Pending: {data.pending}
                                    </button>
                                </div>
                            </div><div className="w-[300px] rounded-md border">
                                <div className="p-4">
                                    <h1 className="text-lg font-semibold">In-Transit Shipment</h1>
                                    <button
                                        type="button"
                                        className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                    >
                                        In-Transit: {data.intransit}
                                    </button>
                                </div>
                            </div><div className="w-[300px] rounded-md border">
                                <div className="p-4">
                                    <h1 className="text-lg font-semibold">Delivered Shipment</h1>
                                    <button
                                        type="button"
                                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        Delivered: {data.delivered}
                                    </button>
                                </div>
                            </div>
                        </div>}
                        <div className='flex justify-center text-center' style={{ margin: '10%' }}>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                             onClick={()=>{router.push('/dashboard/shipmentlist')}}>
                                Click to see all Shipments List
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
                        <div className='flex justify-center text-center' style={{ margin: '10%' }}>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                onClick={()=>{router.push('/dashboard/alldriverslist')}}>
                                Click to see all Driver List
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
                    </div>

            )}
            {children}
            
        </main>
    )
}