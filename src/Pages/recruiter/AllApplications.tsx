import { Spinner, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { getApplications } from 'Api/recruiter';
import ApplicationDetails from 'Components/Recruiter/ApplicationDetails';
import ApplicationItem from 'Components/Recruiter/ApplicationItem';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ApplicationsData from 'utils/renderProps';


interface IAllApplicationsProps {

}
const AllApplications: React.FC<IAllApplicationsProps> = () => {
    const [applications, setApplications] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    const [singleDetails, setSingleDetails] = useState<any>();
    const [approved, setApproved] = useState<any[]>();
    const [rejected, setRejected] = useState<any[]>();



    const separate = (id: string) => {
        const singleItem = applications?.find((item) => item._id === id);
        setSingleDetails(singleItem)
    }
    const approvedApplications = () => {
        const data = () => applications?.filter((item) => item.status === 'Approved');
        setApproved(data);
    }
    const rejectedApplications = () => {
        const data = () => applications?.filter((item) => item.status === 'Rejected');
        setRejected(data);
    }

    return (
        <>
            <h1 className='text-xl uppercase ms-3'>All Applications</h1>
            <div className="grid grid-cols-12 gap-2 bg-blue-50 p-2">
                <div className="col-span-6  max-h-[600px] p-3 overflow-x-auto hover:overflow-scroll">
                    <Tabs position='relative' variant='unstyled'>
                        <TabList>
                            <Tab>Received</Tab>
                            <Tab onClick={approvedApplications}>Approved</Tab>
                            <Tab onClick={rejectedApplications}>Rejected</Tab>
                        </TabList>
                        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                        <TabPanels>
                            <TabPanel>
                                {loading &&
                                    <div className="flex justify-center">
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                        />
                                    </div>
                                }
                                <ApplicationsData
                                    setLoading={setLoading}
                                    applications={applications}
                                    setApplications={setApplications}
                                    approved={approved}
                                    rejected={rejected}
                                    render={(data: any) => (
                                        <>
                                            {data && data.length && data.filter((x: any) => x.status === 'Applied').length ? (
                                                data.filter((x: any) => x.status === 'Applied').map((item: any, index: number) => (
                                                    <div key={index} onClick={() => separate(item._id)}>
                                                        <ApplicationItem item={item} />
                                                    </div>
                                                ))
                                            ) : (
                                                <h1>Not any new Application</h1>
                                            )}
                                        </>
                                    )} />
                            </TabPanel>
                            <TabPanel>
                                {approved && approved.length ? (
                                    approved.map((item, index) => (
                                        <div key={index} onClick={() => separate(item._id)}>
                                            <ApplicationItem item={item} />
                                        </div>
                                    ))
                                ) : (
                                    <h1>Empty!</h1>
                                )}
                            </TabPanel>
                            <TabPanel>
                                {rejected && rejected.length ? (
                                    rejected.map((item, index) => (
                                        <div key={index} onClick={() => separate(item._id)}>
                                            <ApplicationItem item={item} />
                                        </div>
                                    ))
                                ) : (
                                    <h1>Empty!</h1>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <ApplicationDetails singleDetails={singleDetails} />
            </div>
        </>
    )
}

export default AllApplications
