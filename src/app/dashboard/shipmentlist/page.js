"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import Swal from 'sweetalert2';
import EditShipmentDataModal from './EditShipmentDataModal';
export default function Shipmentlist() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState('');

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handelStatus = async (val) => {
        console.log(val);
    }

    useEffect(() => {
        fetch('/api/allshipmentdata', {
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

    const cancelFunc = async (item) => {
        try {
            const response = await fetch('/api/cancelshipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item.shipmentid),
            });
            if (response.status === 201) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Cancel Shipment Successfully',
                    text: `Cancel Shipment against ShipmentId: '${data.data.shipmentid}'`,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };
    return (
        <div>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">All Shipment's Data</h2>
                        <p className="mt-1 text-sm text-gray-700">
                            You can edit and cancel shipment here.
                        </p>
                    </div>
                </div>
                <EditShipmentDataModal isOpen={isModalOpen} onClose={closeModal} modalData={modalData} />
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
                                                Customer Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
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
                                                Assigned Driver Id
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
                                                key={item.shipmentid}
                                            >
                                                <td className="whitespace-nowrap px-12 py-4">
                                                    {item.shipmentid}
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4">
                                                    {item.customername}
                                                </td>
                                                <td className="whitespace-nowrap px-12 py-4">
                                                    {item.destinationaddress}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    {item.shipmentstatus}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    {item.assigneddriverid}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                    {moment(item.planneddeliverydate).format("DD-MM-YYYY")}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                    {moment(item.actualdeliverydate).format("DD-MM-YYYY")}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                    {item.shipmentstatus !== 'delivered' && (
                                                        <>
                                                            <button
                                                                type="button" onClick={() => openModal(item)}
                                                                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button" onClick={() => cancelFunc(item)}
                                                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
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