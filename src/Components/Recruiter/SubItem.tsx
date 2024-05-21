import { SubInterface } from 'Components/Admin/SubItem'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { paymentSubscription } from 'Api/recruiter';

interface ISubItemProps {
    item: SubInterface;
}
const SubItem: React.FC<ISubItemProps> = ({ item }) => {

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51PIV6BSA3RmngPpVthkmR3p45HTyw0UADGi1Qx4Q0GA9U4SdnLVOmx7tMXuWkkjWlXzm7IOJ3N02v3Gj5J3Tpacn00PV6m7lNU');
        const res = await paymentSubscription(item); console.log(res); console.log('result form frontend');
        const result = stripe?.redirectToCheckout({
            sessionId: res?.data.id
        })
        console.log('this is the rseult'); console.log(result);

    };
    return (
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
                <h3 className="text-2xl font-semibold uppercase">{item.planName}</h3>
                <p className="mt-4 text-gray-400">Get started with our basic features.</p>
            </div>
            <div className="mb-8">
                <span className="text-5xl font-extrabold text-gray-700">₹ {item.amount}</span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 user account</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10 transactions per month</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic support</span>
                </li>
            </ul>
            <button onClick={makePayment} className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                purchase
            </button>

        </div>
    )
}

export default SubItem
