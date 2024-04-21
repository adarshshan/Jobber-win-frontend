import { initFlowbite } from 'flowbite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../Api/user';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../app/slice/AuthSlice';
import toast from 'react-hot-toast';
import { Avatar, Badge, Input } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../../app/store';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from '../../../@/components/ui/alert-dialog';
import { AlertDialogTitle } from '../../../@/components/ui/alert-dialog';
import { AlertDialogDescription } from '../../../@/components/ui/alert-dialog';
import { AlertDialogFooter } from '../../../@/components/ui/alert-dialog';
import { AlertDialogCancel } from '../../../@/components/ui/alert-dialog';
import { AlertDialogAction } from '../../../@/components/ui/alert-dialog';

function Header() {

  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    initFlowbite()
  }, [])

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          logout().then(() => console.log(''))
          dispatch(userLogout());
          toast.success("You are logged out!")
        }
      });
    } catch (error) {
      console.log(error as Error);
    }
  }
  const handl = async () => {
    try {
      await logout()
      dispatch(userLogout());
      toast.success("You are logged out!")
    } catch (error) {
      console.log(error as Error);
    }
  }
  return (
    <>
      <nav className="bg-gradient-to-b from-blue-800 
                to-blue-950 bg-white  z-50
                shadow-lg text-white dark:bg-black dark:text-white sticky top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex">
            <Link to='/'>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">JobberWin</span>
            </Link>
            <input type="search" className='bg-transparent border border-gray-950 shadow-black  ms-14 rounded-full p-2' placeholder='Search' />
          </div>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              {/* <img className="w-8 h-8 rounded-full" src={user.profilePicture} alt="user photo" /> */}
              <Avatar
                radius="full"
                src={user ? user.profile_picture : 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'}
              />
            </button>
            {/* Dropdown menu */}
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              <Link to='/user/profile' className="px-4 py-3 flex cursor-pointer">
                <Badge content="" color="success" shape="circle" placement="bottom-right">
                  <Avatar
                    radius="full"
                    src={user ? user.profile_picture : 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'}
                  />
                </Badge>
                <div className='ms-3'>
                  <span className="block text-sm text-gray-900 dark:text-white">{user ? user.name : 'user'}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user ? user.email : ''}</span>
                </div>

              </Link>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Post a Job</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Get started with Premium</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Services</a>
                </li>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  onClick={handleLogout}>
                  {/* <AlertDialog>
                    <AlertDialogTrigger>Logout</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          .
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handl}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}
                  Sign out
                </li>
              </ul>
            </div>
            <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to='/user/home' className="block py-2 px-3 text-white bg-gray-200 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Home</Link>
              </li>
              <li>
                <Link to='/user/my-network' className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Network</Link>
              </li>
              <li>
                <Link to='/user/find-jobs' className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find Jobs</Link>
              </li>
              <li>
                <Link to='/user/messaging' className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Messaging</Link>
              </li>
              <li>
                <Link to='/user/notifications' className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notifications</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
