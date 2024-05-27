import { Routes, Route } from 'react-router-dom';
import User from './Components/User/userCommon/User';
import Admin from './Components/Admin/Admin';
import Users from './Pages/admin/Users';
import Jobs from './Pages/admin/Jobs';
import { Toaster } from 'react-hot-toast';
import UserLoggedOut from './Components/User/userCommon/UserLoggedOut';
import UserLoggedIn from './Components/User/userCommon/UserLoggedIn';
import AdminLoggedOut from './Components/Admin/AdminLoggedOut';
import AdminLoggedIn from './Components/Admin/AdminLoggedIn';
import Test from './Components/User/userCommon/BottomNavbar';
import React, { Suspense, lazy } from 'react';
import { Skeleton } from './@/components/ui/skeleton';
import ReportedJobs from './Pages/admin/ReportedJobs';
import ReportedPosts from './Pages/admin/ReportedPosts';
import Subscription from './Pages/admin/Subscription';
import RoomPage from './Pages/user/RoomPage';
import Dashboard from './Pages/admin/Dashboard';



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
const ChatPage = lazy(() => import('./Pages/user/ChatPage'))
const ForgotOtpPage = lazy(() => import('./Pages/user/ForgotOtpPage'));
const AllApplications = lazy(() => import('./Pages/recruiter/AllApplications'));
const PageNotFound = lazy(() => import('./Components/Common/PageNotFound'));
const SubscriptionPage = lazy(() => import('./Pages/recruiter/SubscriptionPage'));
const Success = lazy(() => import('./Pages/recruiter/Success'));
const Cancel = lazy(() => import('./Pages/recruiter/Cancel'));
const NotificationPage = lazy(() => import('./Pages/user/NotificationPage'))


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
            <Route path='room/:roomId' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><RoomPage /></Suspense>} />
            <Route path='job-details/:jobId' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><JobDetails /></Suspense>} />
            <Route path='message' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><ChatPage /></Suspense>} />
            <Route path='notifications' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><NotificationPage /></Suspense>} />
          </Route>
        </Route>

        {/* Recruiter Side */}

        <Route path='/recruiter' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><Recruiter /></Suspense>}>
          <Route path='' element={<UserLoggedIn />}>
            <Route path='' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><DashBoard /></Suspense>} />
            <Route path='all-jobs' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><AllJobsComponent /></Suspense>} />
            <Route path='post-jobform' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><PostJobForm /></Suspense>} />
            <Route path='applications' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><AllApplications /></Suspense>} />
            <Route path='subscription' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><SubscriptionPage /></Suspense>} />
            <Route path='success' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><Success /></Suspense>} />
            <Route path='cancel' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><Cancel /></Suspense>} />
          </Route>
        </Route>




        {/* Admin Side */}

        <Route path='' element={<AdminLoggedOut />}>
          <Route path='/admin-login' element={<AdminLogin />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path='' element={<AdminLoggedIn />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='jobs' element={<Jobs />} />
            <Route path='reported-jobs' element={<ReportedJobs />} />
            <Route path='reported-posts' element={<ReportedPosts />} />
            <Route path='subscription' element={<Subscription />} />
          </Route>
        </Route>

        {/* Page Not Found */}
        <Route path='/*' element={<Suspense fallback={<Skeleton className='w-full h-[50px] mt-3 gap-5 rounded-full' />}><PageNotFound /></Suspense>} />

      </Routes>

    </main>
  );
}

export default App;


