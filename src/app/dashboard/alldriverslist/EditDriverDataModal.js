// Modal.js
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const EditDriverDataModal = ({ isOpen, onClose, modalData }) => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const driverid = modalData.driverid;
    const userid = modalData.userid;
    const [username, setUsername] = useState(modalData.username);
    const [password, setPassword] = useState(modalData.password);
    const [email, setEmail] = useState(modalData.email);
    const [vehiclenumber, setVehicleNumber] = useState(modalData.vehiclenumber);
    const [licensenumber, setLicenseNumber] = useState(modalData.licensenumber);
    const [contactnumber, setContactNumber] = useState(modalData.contactnumber);
    useEffect(() => {
        if (isOpen) {
        setUsername(modalData.username);
        setPassword(modalData.password);
        setEmail(modalData.email);
        setVehicleNumber(modalData.vehiclenumber);
        setLicenseNumber(modalData.licensenumber);
        setContactNumber(modalData.contactnumber);
        }
    }, [isOpen, modalData]);

    if (!isOpen) return null;

    const callShipmentApi = async (val) => {

        try {
            const driverData = { driverid, userid, username, password, email, vehiclenumber, licensenumber, contactnumber}
            const response = await fetch('/api/updatedriverapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverData),
            });
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Driver Data Update Successfully',
                })
                window.location.reload();
            } else {
                
                router.push('/dashboard/alldriverslist');
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
                                Driver Id{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" value={modalData.driverid} disabled
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                User Id{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" value={modalData.userid} disabled
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Driver Name{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    value={username} 
                                     onChange={(val) => setUsername(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Password{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    onChange={(val) => setPassword(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Email{" "}
                            </label>
                                <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" value={email} onChange={(val) => setEmail(val.target.value)}
              /> 
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Vehicle Number{" "}
                            </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" value={vehiclenumber} onChange={(val) => setVehicleNumber(val.target.value)}
                                />
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                License Number{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    value={licensenumber} 
                                    onChange={(val) => setLicenseNumber(val.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label for="" className="text-base font-medium text-gray-900">
                                {" "}
                                Contact Number{" "}
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text" 
                                    value={contactnumber} 
                                    onChange={(val) => setContactNumber(val.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-4 text-center">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Save Driver Data
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default EditDriverDataModal;