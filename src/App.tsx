import { Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './Pages/user/LandingPage';
import UserHome from './Pages/user/UserHome';
import Header from './Components/User/Header';

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

function User() {
  return (
    <div>
      <Header />
      <h1>User Dashboard</h1>
      <Outlet />
    </div>
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
