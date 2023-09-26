"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import '../dashboard.css'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
export default function Shipmentdashboard(){
    const router = useRouter();
    const [customername, setCustomername] = useState('');
    const [destinationaddress, setDestinationAddress] = useState('');
    const [shipmentstatus, setShipmentStatus] = useState('');
    const [assigneddriverid, setAssignedDriverId] = useState('');
    const [planneddeliverydate, setPlannedDeliveryDate] = useState('');
    const [actualdeliverydate, setActualDeliveryDate] = useState('');
    const [data, setData] = useState([]);

    const fetchData = async () => {
            const response = await fetch('/api/driverlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }).then((response) => response.json())
            .then((data) => {
                let arr = data.data;
                setData(arr);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const callShipmentApi = async (val) => {
        
        try{
            
            const actualdeliverydate = null;
            const shipmentData = { customername, destinationaddress, shipmentstatus, assigneddriverid, planneddeliverydate, actualdeliverydate } 
            
            const response = await fetch('/api/shipment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shipmentData),
            });
            if (response.status === 201) {
                const data = await response.json();
                Swal.fire({
                    icon:'success',
                    title:'Shipment made Successfully',
                    text:`Your ShipmentId is '${data.data.shipmentid}'`,
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
    return(
        <main>
            <section>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-black">
                            Make a shipment here
                        </h2>
                        <form method="POST"  onSubmit={callShipmentApi} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label for="customername" className="text-base font-medium text-gray-900">
                                        {" "}
                                        Customer Name{" "}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setCustomername(val.target.value)}
                                            placeholder="Customer Name"
                                            id="customername"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label for="destinationaddress" className="text-base font-medium text-gray-900">
                                        {" "}
                                        Destination Address{" "}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text" onChange={(val) => setDestinationAddress(val.target.value)}
                                            placeholder="Destination Address"
                                            id="destinationaddress"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="shipmentstatus" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Shipment Status{" "}
                                        </label>
                                        <select id="shipmentstatus" className="text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onChange={(val) => setShipmentStatus(val.target.value)}>
                                            <option >Select a Shipment Status</option>
                                            <option value="in-transit">In Transit</option>
                                            <option value="pending">Pending</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="assigneddriverid" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Assigned Driver Id{" "}
                                        </label>
                                        <select className="text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={fetchData} onChange={(val) => setAssignedDriverId(val.target.value)}>
                                            <option>select Driver Id</option>
                                            {data.map((item)=>(
                                                <option key={item.driverid} value={item.driverid}>{item.driverid}</option>
                                            ))}
                                        </select>
                                    
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label for="planneddeliverydate" className="text-base font-medium text-gray-900">
                                            {" "}
                                            Planned Delivery Date{" "}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="date" onChange={(val) => setPlannedDeliveryDate(val.target.value)}
                                            placeholder="Planned Delivery Date"
                                            id="planneddeliverydate"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Shipment{" "}
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