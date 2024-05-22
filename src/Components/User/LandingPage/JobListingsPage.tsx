import React, { useEffect, useState } from 'react';
import JobListing from './JobListing';
import JobSearchBar from './JobSearchBar';
import { getJobs } from 'Api/user';
import toast from 'react-hot-toast';


interface IJobListingInterface {
    jobs: never[];
    setJobs: React.Dispatch<React.SetStateAction<never[]>>
}
const JobListingsPage: React.FC<IJobListingInterface> = ({ jobs, setJobs }) => {

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs('');
                if (res?.data.success) {
                    setJobs(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchJobs();
    }, [])

    return (
        <div className="container  mx-auto  px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">All Jobs</h1>
            <JobSearchBar setJobs={setJobs} />
            <div className="flex flex-wrap -mx-2">
                {jobs.length ? (
                    jobs.map((job: any) => (
                        <JobListing key={job._id} job={job} />
                    ))
                ) : (
                    <div>
                        <h1>No Jobs found </h1>
                    </div>
                )}
            </div>
        </div>

    );
};

export default JobListingsPage;
