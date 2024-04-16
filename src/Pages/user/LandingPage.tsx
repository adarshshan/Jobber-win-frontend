import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../Components/User/userCommon/Header'
import Footer from '../../Components/User/userCommon/Footer'
import { Link } from 'react-router-dom'
import './css/LandingPage.css';
import JobListingsPage from '../../Components/User/LandingPage/JobListingsPage'
import LandingPageHeader from '../../Components/User/LandingPage/LandingPageHeader'
import { useAppSelector } from '../../app/store'

function LandingPage() {


    return (
        <>
            <LandingPageHeader />
            <div className="outerdiv bg-gray-100 pt- flex flex-col justify-center items-start  md:min-h-screen sm:h-screen">
                <div className="w-lg ms-5 px-2">
                    <h1 className='text-4xl title'>DISCOVER YOUR</h1>
                    <h1 className='text-4xl title'> DREAM <span className='text-blue-500'>JOB</span></h1>
                    <p className='text-amber-200'>Great platform for the job seeker that searching for new career heights and <br /> passionate about startups.</p>
                    <div className="bg-white rounded-lg shadow-lg py-0 sm:p-6 mt-5 mb-8">
                        <form className="flex flex-col sm:flex-row items-center">
                            <div className="flex-grow mb-4 sm:mb-0 sm:mr-2">
                                <input type="text" id="jobTitle" name="jobTitle" placeholder="job title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex-grow mb-4 sm:mb-0 sm:ml-2">
                                <input type="text" id="location" name="location" placeholder="location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ml-0 sm:ml-2">Search Jobs</button>
                        </form>
                    </div>
                </div>
            </div>
            <JobListingsPage />
            <Footer />
        </>
    )
}

export default LandingPage
