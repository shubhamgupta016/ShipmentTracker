"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
import moment from 'moment';
export default function Shipmentstatus() {
    const router = useRouter();
    const [obj, setObj] = useState({});
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (val) => {
        const shipmentData = { inputValue };
        try {
            const response = await fetch('/api/shipmentstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shipmentData),
            });
            if (response.status === 201) {
                const data = await response.json();
                setObj(data.data);
                
                    router.push('/shipmentstatus');
            } else {
                router.push('/shipmentstatus');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <div>
            <div className="relative w-full bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center space-x-2">
                        <span className="font-bold">Track your Shipment Status here</span>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            Go to Login Page
                        </button>
                    </div>
                    <div className="flex w-full items-center space-x-2 md:w-1/3">
                        <form onSubmit={handleSubmit} method="POST">
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                value={inputValue}
                                onChange={(val) => setInputValue(val.target.value)}
                                placeholder="Shipment Number"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <div>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Shipment Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                <span>Customer Name</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Customer Address
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Shipment Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Planned Delivery Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Actual Delivery Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        <tr className="divide-x divide-gray-200">
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {obj.shipmentid}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {obj.customername}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {obj.destinationaddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {obj.shipmentstatus}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {moment(obj.planneddeliverydate).format("DD-MM-YYYY")}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                {moment(obj.actualdeliverydate).format("DD-MM-YYYY")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}