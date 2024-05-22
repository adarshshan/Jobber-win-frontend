import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { getSubscriptions } from 'Api/admin'
import SubItem from 'Components/Admin/SubItem'
import SubscriptionForm from 'Components/Admin/SubscriptionForm'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Subscription: React.FC = () => {
    const [subScription, setSubscription] = useState([]);
    const [fetchAgain, setFetchAgain] = useState(false);
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await getSubscriptions();
                if (res?.data.success) {
                    setSubscription(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchSubscription()
    }, [fetchAgain])
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Dynamic tabs" className='bg-gray-200 shadow-lg gap-4'>
                <Tab title='all Subscriptions' className='px-10 rounded-full'>
                    <Card>
                        <CardBody>
                            <div className="w-full">
                                {
                                    subScription && subScription.length ? (
                                        subScription.map((item) => (
                                            <SubItem item={item}   setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
                                        ))
                                    ) : (
                                        <div className='flex justify-center p-5 text-yellow-500 text-4xl'>
                                            <h1>Empty</h1>
                                        </div>
                                    )
                                }

                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab title='create new' className='px-10 rounded-full'>
                    <Card>
                        <CardBody>
                            <SubscriptionForm  setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs >
        </div >
    )
}

export default Subscription
