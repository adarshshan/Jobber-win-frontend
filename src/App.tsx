import { Routes, Route, Router, RouterProvider } from 'react-router-dom';

import User from './Components/User/userCommon/User';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Pages/admin/AdminLogin';
import Users from './Pages/admin/Users';
import Jobs from './Pages/admin/Jobs';
import PageNotFound from './Components/Common/PageNotFound';
import { Toaster } from 'react-hot-toast';
import UserLoggedOut from './Components/User/userCommon/UserLoggedOut';
import UserLoggedIn from './Components/User/userCommon/UserLoggedIn';
import AdminLoggedOut from './Components/Admin/AdminLoggedOut';
import AdminLoggedIn from './Components/Admin/AdminLoggedIn';
import Test from './Pages/user/Test';
import React, { Suspense, lazy } from 'react';
import { Skeleton } from './@/components/ui/skeleton';

const LandingPage = lazy(() => import('./Pages/user/LandingPage'))
const UserHome = lazy(() => import('./Pages/user/UserHome'))
const LoginPage = lazy(() => import('./Pages/user/LoginPage'))
const SignupPage = lazy(() => import('./Pages/user/SignupPage'))
const OtpPage = lazy(() => import('./Pages/user/OtpPage'))
const ProfilePage = lazy(() => import('./Pages/user/ProfilePage'))


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

        <Route path="/user" element={<User />}>

          <Route path='' element={<UserLoggedOut />}>
            <Route path='login' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><LoginPage /></Suspense>} />
            <Route path='signup' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><SignupPage /></Suspense>} />
            <Route path='otp-page' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><OtpPage /></Suspense>} />
          </Route>

          <Route path='' element={<UserLoggedIn />}>
            <Route path='home' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><UserHome /></Suspense>} />
            <Route path='profile' element={<Suspense fallback={<Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />}><ProfilePage /></Suspense>} />
            <Route path='test' element={<Test />} />
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


