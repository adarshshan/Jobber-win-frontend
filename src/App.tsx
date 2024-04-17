import { Routes, Route, Router } from 'react-router-dom';
import LandingPage from './Pages/user/LandingPage';
import UserHome from './Pages/user/UserHome';
import User from './Components/User/userCommon/User';
import LoginPage from './Pages/user/LoginPage';
import SignupPage from './Pages/user/SignupPage';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Pages/admin/AdminLogin';
import Users from './Pages/admin/Users';
import Jobs from './Pages/admin/Jobs';
import PageNotFound from './Components/Common/PageNotFound';
import { Toaster } from 'react-hot-toast';
import OtpPage from './Pages/user/OtpPage';
import UserLoggedOut from './Components/User/userCommon/UserLoggedOut';
import UserLoggedIn from './Components/User/userCommon/UserLoggedIn';
import AdminLoggedOut from './Components/Admin/AdminLoggedOut';
import AdminLoggedIn from './Components/Admin/AdminLoggedIn';
import ProfilePage from './Pages/user/ProfilePage';

function App() {
  return (
    <main>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>


        {/* User Side */}

        <Route path='' element={<UserLoggedOut />}><Route path='/' element={<LandingPage />} /></Route>

        <Route path="/user" element={<User />}>

          <Route path='/user' element={<UserLoggedOut />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='otp-page' element={<OtpPage />} />
          </Route>

          <Route path='' element={<UserLoggedIn />}>
            <Route path='home' element={<UserHome />} />
            <Route path='profile' element={<ProfilePage />} />
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


