import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Api/admin';
import { setAdminCredential } from '../../app/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../app/store';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { adminData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (adminData) {
      navigate('/admin/users');
    }
  }, [adminData])

  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      console.log('submitHandler present...');
      if (!emailPattern.test(email)) {
        setErr('Enter a valid Email!');
        return;
      }
      if (password.trim().length < 4) {
        setErr('Enter a Valid Password!');
        return;
      }
      let result = await login(email, password);
      console.log(result);
      if (result?.data.data.success) {
        dispatch(setAdminCredential(result.data.data.token))
        navigate('/admin');
      }

    } catch (error) {
      console.log(error as Error);
    }
  }

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-200  via-green-600   to-red-500">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div className="mb-4">
          <p className="text-gray-600">Sign In</p>
          <h2 className="text-xl font-bold">Admin Login</h2>
          <p className="text-red-500">{err}</p>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <button type='submit' className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
              Sign In
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default AdminLogin;
