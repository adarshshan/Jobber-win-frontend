import React from 'react';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
}

interface JobListingProps {
    job: Job;
}

const JobListing: React.FC<JobListingProps> = ({ job }) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-2">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <h3 className="text-gray-600 mb-2">{job.company}</h3>
                <p className="text-gray-700 mb-4">{job.location}</p>
                <p className="text-gray-800">{job.description}</p>
            </div>
        </div>
    );
};

export default JobListing;
