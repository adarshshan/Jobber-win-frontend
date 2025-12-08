import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { logout } from "../../../Api/user";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../app/slice/AuthSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../app/store";
import { MdOutlineMessage } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IoIosPeople, IoMdHome } from "react-icons/io";
import { FaBell, FaShoppingBag, FaSearch } from "react-icons/fa";
import { setSearchText } from "../../../app/slice/CommonSlice";
import { LuLayoutGrid } from "react-icons/lu";

function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setSearchText(search));
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be signed out of your account",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      await logout();
      dispatch(userLogout());
      toast.success("Logged out successfully!");
    }
  };

  // Determine active route
  const isActive = (path: string) => location.pathname.startsWith(path);

  const navItems = [
    { name: "Home", icon: IoMdHome, path: "/user/home" },
    { name: "My Network", icon: IoIosPeople, path: "/user/my-network" },
    { name: "Find Jobs", icon: FaShoppingBag, path: "/user/find-jobs" },
    { name: "Messaging", icon: MdOutlineMessage, path: "/user/message" },
    { name: "Notifications", icon: FaBell, path: "/user/notifications" },
  ];

  return (
    <>
      {/* Desktop & Tablet Header */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Search */}
            <div className="flex items-center flex-1">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">JobberWin</h1>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:block ml-10 flex-1 max-w-md">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={handleSearch}
                    placeholder="Search jobs, people, companies..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                      active
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="text-2xl" />
                    <p className="text-xs font-medium">{item.name}</p>
                    {active && (
                      <div className="w-12 h-1 bg-blue-600 rounded-full mt-1"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center ml-8">
              <Dropdown className="bg-white shadow-lg" placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    size="md"
                    src={
                      user?.profile_picture ||
                      "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                    }
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="h-14 gap-3"
                    onClick={() => navigate("/user/profile")}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        radius="md"
                        src={
                          user?.profile_picture ||
                          "https://i.pravatar.cc/150?u=default"
                        }
                      />
                      <div>
                        <p className="font-semibold">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                  {user && user?.role === "recruiter" && (
                    <DropdownItem
                      key="recruiter"
                      onClick={() => navigate("/recruiter")}
                      className="py-1"
                    >
                      Go to Recruiter Dashboard
                    </DropdownItem>
                  )}
                  <DropdownItem key="premium" className="py-1">
                    Get Premium
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    onClick={handleLogout}
                    className="py-1 hover:text-red-500"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3 px-2">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={handleSearch}
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all ${
                  active ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className="text-2xl" />
                <span className="text-xs mt-1">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add padding to body content on mobile to avoid overlap with bottom nav */}
      <div className="lg:hidden pb-20"></div>
    </>
  );
}

export default Header;
