// Modal.js
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const EditShipmentDataModal = ({ isOpen, onClose, modalData }) => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const shipmentid = modalData.shipmentid
    const [customername, setCustomername] = useState('');
    const [customeraddress, setCustomeraddress] = useState('');
    const [shipmentstatus, setShipmentStatus] = useState('');
    const [assigneddriverid, setAssignedDriverId] = useState('');
    const [planneddeliverydate, setPlannedDeliveryDate] = useState('');
    const [actualdeliverydate, setActualDeliveryDate] = useState('');

    useEffect(() => {
        if (isOpen) {
        setCustomername(modalData.customername);
        setCustomeraddress(modalData.destinationaddress);
        setShipmentStatus(modalData.shipmentstatus);
        setAssignedDriverId(modalData.assigneddriverid);
        setPlannedDeliveryDate(modalData.planneddeliverydate);
        setActualDeliveryDate(modalData.actualdeliverydate);
        }
    }, [isOpen, modalData]);
    
    if (!isOpen) return null;
    

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

        try {
            const shipmentData = { shipmentid, customername, customeraddress, shipmentstatus, assigneddriverid, planneddeliverydate, actualdeliverydate}
            const response = await fetch('/api/updateshipmentapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shipmentData),
            });
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Shipment Update Successfully',
                })
                window.location.reload();
                
            } else {
                
                router.push('/dashboard/shipmentlist');
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
            <div
                className="m-auto my-6 w-screen max-w-sm rounded-lg border border-gray-200 p-4 pt-4 shadow-sm sm:p-6 lg:p-8"
                aria-modal="true"
                role="dialog"
                tabindex="-1"
            >
                <button className="relative ml-auto block text-gray-600 transition hover:scale-110" onClick={onClose}>
                    <span className="sr-only">Close cart</span>
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
                        className="lucide lucide-x"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <form method="POST" onSubmit={callShipmentApi} className="mt-8">
                    <div className="mt-6 space-y-6">
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Shipment Id{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" value={modalData.shipmentid} disabled
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Customer Name{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    value={customername} 
                                     onChange={(val) => setCustomername(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Customer Address{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    value={customeraddress} 
                                    onChange={(val) => setCustomeraddress(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Shipment Status{" "}
                            </label>
                            
                                <select id="shipmentstatus" className="text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onChange={(val) => setShipmentStatus(val.target.value)} 
                                
                                >
                                    <option value={shipmentstatus}>{shipmentstatus}</option>
                                    <option value="in-transit">In Transit</option>
                                    <option value="pending">Pending</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Assigned Driver Id{" "}
                            </label>
                            
                                <select className="text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={fetchData} onChange={(val) => setAssignedDriverId(val.target.value)} 
                                value={assigneddriverid}
                                >
                                    <option>Select DriverId</option>
                                    {data.map((item) => (
                                        <option key={item.driverid} value={item.driverid}>{item.driverid}</option>
                                    ))}
                                </select>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Planned Delivery Date{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="date" 
                                    // value={moment(planneddeliverydate).format('dd-mm-yyyy')} 
                                    onChange={(val) => setPlannedDeliveryDate(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Actual Delivery Date{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="date" 
                                    // value={actualdeliverydate} 
                                    onChange={(val) => setActualDeliveryDate(val.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Save Shipment
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default EditShipmentDataModal;