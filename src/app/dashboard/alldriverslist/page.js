"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import EditDriverDataModal from './EditDriverDataModal';
export default function Alldriverslist() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState('');

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [data, setData] = useState([]);
    const handelStatus = async (val) => {
        console.log(val);
    }

    useEffect(() => {
        fetch('/api/alldriverdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
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
        <div>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">All Drivers's Data</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            You can edit and manage Drivers data here.
                        </p>
                    </div>
                </div>
                <EditDriverDataModal isOpen={isModalOpen} onClose={closeModal} modalData={modalData} />
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
                                                Driver Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Driver Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Driver User Id
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Driver Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Vehicle Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                License Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Contact Number
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data.map((item) => (
                                        <tr className="divide-x divide-gray-200"
                                        key={item.driverid}
                                        >
                                            <td className="whitespace-nowrap px-12 py-4">
                                                {item.driverid}
                                            </td>
                                            <td className="whitespace-nowrap px-12 py-4">
                                                {item.username}
                                            </td>
                                            <td className="whitespace-nowrap px-12 py-4">
                                                {item.userid}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {item.email}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {item.vehiclenumber}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {item.licensenumber}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {item.contactnumber}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                <button
                                                    type="button" onClick={() => openModal(item)}
                                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                >
                                                    Edit
                                                </button>
                                                {/* <button
                                                    type="button" onClick={() => cancelFunc(item)}
                                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                >
                                                    Cancel
                                                </button> */}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
            </div>
        </div>
    )
}