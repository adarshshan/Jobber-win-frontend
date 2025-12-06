import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./Components/User/userCommon/User";
import Admin from "./Components/Admin/Admin";
import { Toaster } from "react-hot-toast";
import UserLoggedOut from "./Components/User/userCommon/UserLoggedOut";
import UserLoggedIn from "./Components/User/userCommon/UserLoggedIn";
import AdminLoggedOut from "./Components/Admin/AdminLoggedOut";
import AdminLoggedIn from "./Components/Admin/AdminLoggedIn";
import Test from "./Components/User/userCommon/BottomNavbar";
import React, { lazy } from "react";
import SuspenseLayout from "./Components/Common/SuspenseLayout";

const AdminLogin = lazy(() => import("./Pages/admin/AdminLogin"));
const LandingPage = lazy(() => import("./Pages/user/LandingPage"));
const Home = lazy(() => import("./Pages/user/Home"));
const LoginPage = lazy(() => import("./Pages/user/LoginPage"));
const SignupPage = lazy(() => import("./Pages/user/SignupPage"));
const OtpPage = lazy(() => import("./Pages/user/OtpPage"));
const ProfilePage = lazy(() => import("./Pages/user/ProfilePage"));
const ViewUserProfile = lazy(() => import("./Pages/user/ViewUserProfile"));
const FindJobPage = lazy(() => import("./Pages/user/FindJobPage"));
const MyNetworkPage = lazy(() => import("./Pages/user/MyNetworkPage"));

const Recruiter = lazy(() => import("./Pages/recruiter/Recruiter"));
const AllJobsComponent = lazy(
  () => import("./Pages/recruiter/AllJobsComponents")
);
const PostJobForm = lazy(() => import("./Pages/recruiter/PostJobForm"));
const DashBoard = lazy(() => import("./Pages/recruiter/Dashboard"));
const JobDetails = lazy(() => import("./Pages/user/JobDetails"));
const ChatPage = lazy(() => import("./Pages/user/ChatPage"));
const ForgotOtpPage = lazy(() => import("./Pages/user/ForgotOtpPage"));
const AllApplications = lazy(() => import("./Pages/recruiter/AllApplications"));
const PageNotFound = lazy(() => import("./Components/Common/PageNotFound"));
const SubscriptionPage = lazy(
  () => import("./Pages/recruiter/SubscriptionPage")
);
const Success = lazy(() => import("./Pages/recruiter/Success"));
const Cancel = lazy(() => import("./Pages/recruiter/Cancel"));
const NotificationPage = lazy(() => import("./Pages/user/NotificationPage"));

const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const Users = lazy(() => import("./Pages/admin/Users"));
const Jobs = lazy(() => import("./Pages/admin/Jobs"));
const RoomPage = lazy(() => import("./Pages/user/RoomPage"));
const Subscription = lazy(() => import("./Pages/admin/Subscription"));
const ReportedPosts = lazy(() => import("./Pages/admin/ReportedPosts"));
const ReportedJobs = lazy(() => import("./Pages/admin/ReportedJobs"));

interface IAppProps {}

const router = createBrowserRouter([
  {
    element: <SuspenseLayout />,
    children: [
      {
        element: <UserLoggedOut />,
        children: [
          {
            path: "/",
            element: <LandingPage />,
          },
          {
            path: "/user/login",
            element: <LoginPage />,
          },
          {
            path: "/user/signup",
            element: <SignupPage />,
          },
          {
            path: "/user/otp-page",
            element: <OtpPage />,
          },
          {
            path: "/user/forgot-password",
            element: <ForgotOtpPage />,
          },
        ],
      },
      {
        path: "/user",
        element: <User />,
        children: [
          {
            element: <UserLoggedIn />,
            children: [
              {
                path: "home",
                element: <Home />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "view-user-profile/:userId",
                element: <ViewUserProfile />,
              },
              {
                path: "my-network",
                element: <MyNetworkPage />,
              },
              {
                path: "find-jobs",
                element: <FindJobPage />,
              },
              {
                path: "for-test",
                element: <Test />,
              },
              {
                path: "room/:roomId",
                element: <RoomPage />,
              },
              {
                path: "job-details/:jobId",
                element: <JobDetails />,
              },
              {
                path: "message",
                element: <ChatPage />,
              },
              {
                path: "notifications",
                element: <NotificationPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/recruiter",
        element: <Recruiter />,
        children: [
          {
            element: <UserLoggedIn />,
            children: [
              {
                path: "",
                element: <DashBoard />,
              },
              {
                path: "all-jobs",
                element: <AllJobsComponent />,
              },
              {
                path: "post-jobform",
                element: <PostJobForm />,
              },
              {
                path: "applications",
                element: <AllApplications />,
              },
              {
                path: "subscription",
                element: <SubscriptionPage />,
              },
              {
                path: "success",
                element: <Success />,
              },
              {
                path: "cancel",
                element: <Cancel />,
              },
            ],
          },
        ],
      },
      {
        element: <AdminLoggedOut />,
        children: [
          {
            path: "/admin-login",
            element: <AdminLogin />,
          },
        ],
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            element: <AdminLoggedIn />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "jobs",
                element: <Jobs />,
              },
              {
                path: "reported-jobs",
                element: <ReportedJobs />,
              },
              {
                path: "reported-posts",
                element: <ReportedPosts />,
              },
              {
                path: "subscription",
                element: <Subscription />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
