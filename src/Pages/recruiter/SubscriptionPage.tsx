import { getAllSubPlans, getCurrentSubDetails } from 'Api/recruiter'
import { SubInterface } from 'Components/Admin/SubItem'
import SubItem from 'Components/Recruiter/SubItem'
import SubModal from 'Components/Recruiter/SubModal'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SubscriptionPage = () => {
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllSubPlans();
                if (res?.data.success) {
                    setSubscription(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchData();
    }, [])
    return (
        <section className="bg-gray-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end text-yellow-600 text-xl cursor-pointer">
                    <SubModal>
                        view your plan
                    </SubModal>
                </div>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold  sm:text-5xl">
                        Pricing Plans
                    </h2>
                    <p className="mt-4 text-xl text-gray-800">
                        Simple, transparent pricing for your business needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {subscription && subscription.length ? (
                        subscription.map((item: SubInterface) => (
                            <SubItem item={item} />
                        ))
                    ) : (
                        <div className="flex justify-center p-10">
                            <h1>Enpty</h1>
                        </div>
                    )}


                </div>
            </div >
        </section >
    )
}

export default SubscriptionPage
