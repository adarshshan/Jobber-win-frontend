import { Routes, Route, Router } from 'react-router-dom';
import LandingPage from './Pages/user/LandingPage';
import UserHome from './Pages/user/UserHome';
import User from './Components/User/userCommon/User';
import LoginPage from './Pages/user/LoginPage';
import SignupPage from './Pages/user/SignupPage';
import Admin from './Components/Admin/adminCommon/Admin';
import AdminLogin from './Components/Admin/AdminLogin';
import Users from './Components/Admin/Users';
import Jobs from './Components/Admin/Jobs';
import PageNotFound from './Components/Common/PageNotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path="/user" element={<User />}>
          <Route path='home' element={<UserHome />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>

        <Route path='/admin-login' element={<AdminLogin />} />

        <Route path="/admin" element={<Admin />}>
          <Route path='users' element={<Users />} />
          <Route path='jobs' element={<Jobs />} />
        </Route>

        <Route path='/*' element={<PageNotFound />} />

      </Routes>

    </main>
  );
}

export default App;


