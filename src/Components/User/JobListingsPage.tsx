import React from 'react';
import JobListing from './JobListing';

const JobListingsPage: React.FC = () => {
    // Sample data for demonstration
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer',
            company: 'ABC Inc.',
            location: 'New York, NY',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'XYZ Corp.',
            location: 'San Francisco, CA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'XYZ Corp.',
            location: 'San Francisco, CA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'XYZ Corp.',
            location: 'San Francisco, CA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'XYZ Corp.',
            location: 'San Francisco, CA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        {
            id: 2,
            title: 'UX Designer',
            company: 'XYZ Corp.',
            location: 'San Francisco, CA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        },
        // Add more job objects here as needed
    ];

    return (
        <div className="container mx-auto  px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">All Jobs</h1>
            <div className="flex flex-wrap -mx-2">
                {jobs.map(job => (
                    <JobListing key={job.id} job={job} />
                ))}
            </div>
        </div>

    );
};

export default JobListingsPage;
