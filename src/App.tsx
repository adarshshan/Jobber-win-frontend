import { Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/user/LandingPage';
import UserHome from './Pages/user/UserHome';
import Header from './Components/User/userCommon/Header';
import User from './Components/User/userCommon/User';
import LoginPage from './Pages/user/LoginPage';
import SignupPage from './Pages/user/SignupPage';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path="/user" element={<User />}>
          <Route path='home' element={<UserHome />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path='ad' element={<LoginPage />} />
          <Route path='home' element={<UserHome />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;



function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}