import React from 'react';
import { truncateDescription } from '../Profile/PostListItem';
import { Link } from 'react-router-dom';

interface Job {
    id: number;
    title: string;
    company_name: string;
    location: string;
    description: string;

}

interface JobListingProps {
    job: Job;
}

const JobListing: React.FC<JobListingProps> = ({ job }) => {
    const descr = truncateDescription(job.description, 15);
    return (
        <div className="w-full  sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
            <Link to='/user/login'>
                <div className="bg-gray-100 rounded-lg shadow-md p-6  min-h-[200px]">
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <h3 className="text-gray-600 mb-2">{job.company_name}</h3>
                    <p className="text-gray-700 mb-4">{job.location}</p>
                    <p className="text-gray-800">{descr}</p>
                </div>
            </Link>
        </div>
    );
};

export default JobListing;
