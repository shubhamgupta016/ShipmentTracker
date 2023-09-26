"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import EditDriverDataModal from './EditDriverDataModal';
function Driverdata() {
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
        fetch('/api/driverdataapi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Cookies.get('userid')),
        })
            .then((response) => response.json())
            .then((data1) => {
                let arr = data1.data;
                if (arr.length === 0) {
                    setData([]); 
                } else {
                    setData(arr)
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {
                data.length === 0 ? (
                    <p>No data available.</p>
                ) : (
                    <section className="mx-auto w-full max-w-7xl px-4 py-4">
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                            <div>
                                <h2 className="text-lg font-semibold">Your Tasks</h2>
                                <p className="mt-1 text-sm text-gray-700">
                                    You see your task here.
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
                                                        Shipment Status
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                                    >
                                                        Change Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {data.map((item) => (
                                                    <tr className="divide-x divide-gray-200" key={item.shipmentid}>
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
                                                            {moment(item.planneddeliverydate).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4">
                                                            {moment(item.actualdeliverydate).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                            {item.shipmentstatus}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                            <button onClick={() => openModal(item)}>Edit
                                                            </button>
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
                )}
        </div>
    );
}

export default Driverdata;
