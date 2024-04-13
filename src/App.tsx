import { Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/user/LandingPage';
import UserHome from './Pages/user/UserHome';
import Header from './Components/User/common/Header';
import User from './Components/User/common/User';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path="/user" element={<User />}>
          <Route path='ad' element={<LandingPage />} />
          <Route path='home' element={<UserHome />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path='ad' element={<LandingPage />} />
          <Route path='home' element={<UserHome />} />
        </Route>
      </Routes>
    </main>
  );
}


function Admin() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet />
    </div>
  );
}

export default App;
