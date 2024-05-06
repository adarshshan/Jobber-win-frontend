import { Routes, Route, Outlet } from 'react-router-dom';


import User from './Components/User/userCommon/User';
import Admin from './Components/Admin/Admin';
import Users from './Pages/admin/Users';
import Jobs from './Pages/admin/Jobs';
import PageNotFound from './Components/Common/PageNotFound';
import { Toaster } from 'react-hot-toast';
import UserLoggedOut from './Components/User/userCommon/UserLoggedOut';
import UserLoggedIn from './Components/User/userCommon/UserLoggedIn';
import AdminLoggedOut from './Components/Admin/AdminLoggedOut';
import AdminLoggedIn from './Components/Admin/AdminLoggedIn';
import Test from './Pages/user/Test';
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Skeleton } from './@/components/ui/skeleton';
import MessagePage from './Pages/user/MessagePage';
import ForgotOtpPage from './Pages/user/ForgotOtpPage';


const AdminLogin = lazy(() => import('./Pages/admin/AdminLogin'));
const LandingPage = lazy(() => import('./Pages/user/LandingPage'))
const Home = lazy(() => import('./Pages/user/Home'))
const LoginPage = lazy(() => import('./Pages/user/LoginPage'))
const SignupPage = lazy(() => import('./Pages/user/SignupPage'))
const OtpPage = lazy(() => import('./Pages/user/OtpPage'))
const ProfilePage = lazy(() => import('./Pages/user/ProfilePage'))
const ViewUserProfile = lazy(() => import('./Pages/user/ViewUserProfile'));
const FindJobPage = lazy(() => import('./Pages/user/FindJobPage'));
const MyNetworkPage = lazy(() => import('./Pages/user/MyNetworkPage'));
const Recruiter = lazy(() => import('./Pages/recruiter/Recruiter'))
const AllJobsComponent = lazy(() => import('./Pages/recruiter/AllJobsComponents'))
const PostJobForm = lazy(() => import('./Pages/recruiter/PostJobForm'));
const DashBoard = lazy(() => import('./Pages/recruiter/Dashboard'))
const JobDetails = lazy(() => import('./Pages/user/JobDetails'))


interface IAppProps {

}

const App: React.FunctionComponent<IAppProps> = () => {
  

  return (
    <main>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>


        {/* User Side */}

        <Route path='' element={<UserLoggedOut />}><Route path='/' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />
        }><LandingPage /></Suspense>} /></Route>

        <Route path='' element={<UserLoggedOut />}>
          <Route path='/user/login' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><LoginPage /></Suspense>} />
          <Route path='/user/signup' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><SignupPage /></Suspense>} />
          <Route path='/user/otp-page' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><OtpPage /></Suspense>} />
          <Route path='/user/forgot-password' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><ForgotOtpPage /></Suspense>} />
        </Route>

        <Route path="/user" element={<User />}>
          <Route path='' element={<UserLoggedIn />}>
            <Route path='home' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><Home /></Suspense>} />
            <Route path='profile' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><ProfilePage /></Suspense>} />
            <Route path='view-user-profile/:userId' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><ViewUserProfile /></Suspense>} />
            <Route path='my-network' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><MyNetworkPage /></Suspense>} />
            <Route path='find-jobs' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><FindJobPage /></Suspense>} />
            <Route path='for-test' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><Test /></Suspense>} />
            <Route path='job-details/:jobId' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><JobDetails /></Suspense>} />
            <Route path='message' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><MessagePage /></Suspense>} />
          </Route>
        </Route>

        {/* Recruiter Side */}

        <Route path='/recruiter' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><Recruiter /></Suspense>}>
          <Route path='' element={<UserLoggedIn />}>
            <Route path='' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><DashBoard /></Suspense>} />
            <Route path='all-jobs' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><AllJobsComponent /></Suspense>} />
            <Route path='post-jobform' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><PostJobForm /></Suspense>} />
          </Route>
        </Route>




        {/* Admin Side */}

        <Route path='' element={<AdminLoggedOut />}>
          <Route path='/admin-login' element={<AdminLogin />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path='' element={<AdminLoggedIn />}>
            <Route path='users' element={<Users />} />
            <Route path='jobs' element={<Jobs />} />
          </Route>
        </Route>

        {/* Page Not Found */}
        <Route path='/*' element={<PageNotFound />} />

      </Routes>

    </main>
  );
}

export default App;


