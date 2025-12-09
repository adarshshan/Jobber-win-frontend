import { getAllApplications, getAllAppliedandSaved } from "Api/user";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

interface IAppliedJobScreen {}
const AppliedJobScreen: React.FC<IAppliedJobScreen> = () => {
  const [applications, setApplications] = useState<any[]>();
  const [approved, setApproved] = useState<any[]>();
  const [rejected, setRejected] = useState<any[]>();

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const res = await getAllApplications();
        if (res?.data?.success) {
          setApplications(res?.data?.data);
        } else toast.error(res?.data?.message);
      } catch (error) {
        console.log(error as Error);
      }
    };
    fetchAllApplications();
  }, []);

  const approvedApplications = () => {
    const data = () =>
      applications?.filter((item) => item?.status === "Approved");
    setApproved(data);
  };

  const rejectedApplications = () => {
    const data = () =>
      applications?.filter((item) => item?.status === "Rejected");
    setRejected(data);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="text-green-600" />
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="text-red-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaClock className="text-yellow-600" />
            Pending
          </span>
        );
    }
  };

  const JobApplicationCard = ({ item }: { item: any }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-5">
          <Link
            to={`/user/job-details/${item?.jobId?._id}`}
            className="flex-1 flex items-start gap-5"
          >
            <div className="flex-shrink-0">
              <img
                className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                src={item?.jobId?.job_img || "/placeholder-company.png"}
                alt={item?.jobId?.company_name}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item?.jobId?.title}
              </h3>
              <p className="text-lg font-medium text-gray-700 mt-1">
                {item?.jobId?.company_name}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item?.jobId?.location}
                </span>
                <span className="text-gray-400">•</span>
                <span className="capitalize">
                  {item?.jobId?.job_type?.replace("-", " ")}
                </span>
              </div>
              <div className="mt-4">{getStatusBadge(item?.status)}</div>
            </div>
          </Link>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                className="text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <HiDotsHorizontal className="text-xl" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Application actions"
              className="bg-white shadow-lg rounded-lg border"
            >
              <DropdownItem
                key="cancel"
                className="text-red-600 hover:bg-red-50"
              >
                <div className="flex items-center gap-2">
                  <FaTimesCircle />
                  <span>Withdraw Application</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
      <FaCircleExclamation className="mx-auto text-6xl text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700">{message}</h3>
      <p className="text-gray-500 mt-2">
        Your applications will appear here once submitted.
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">
          Track the status of all jobs you've applied to
        </p>
      </div>

      <Tabs variant="unstyled" colorScheme="blue">
        <TabList className="bg-gray-100 p-1 rounded-xl inline-flex mb-8 shadow-sm">
          <Tab
            className="px-6 py-3 rounded-lg font-medium text-sm transition-all data-[selected]:bg-white data-[selected]:shadow-sm data-[selected]:text-blue-600"
            _selected={{ color: "blue.600", bg: "white", shadow: "sm" }}
          >
            All Applications {applications && `(${applications?.length})`}
          </Tab>
          <Tab
            onClick={approvedApplications}
            className="px-6 py-3 rounded-lg font-medium text-sm transition-all data-[selected]:bg-white data-[selected]:shadow-sm data-[selected]:text-green-600"
            _selected={{ color: "green.600", bg: "white", shadow: "sm" }}
          >
            Approved {approved && `(${approved?.length})`}
          </Tab>
          <Tab
            onClick={rejectedApplications}
            className="px-6 py-3 rounded-lg font-medium text-sm transition-all data-[selected]:bg-white data-[selected]:shadow-sm data-[selected]:text-red-600"
            _selected={{ color: "red.600", bg: "white", shadow: "sm" }}
          >
            Rejected {rejected && `(${rejected?.length})`}
          </Tab>
        </TabList>

        <TabIndicator mt="-2px" height="3px" bg="blue.500" borderRadius="2px" />

        <TabPanels>
          <TabPanel px={0}>
            {applications && applications?.length > 0 ? (
              <div className="space-y-5">
                {applications?.map((item: any) => (
                  <JobApplicationCard key={item?._id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState message="You haven't applied to any jobs yet" />
            )}
          </TabPanel>

          <TabPanel px={0}>
            {approved && approved?.length > 0 ? (
              <div className="space-y-5">
                {approved?.map((item: any) => (
                  <JobApplicationCard key={item?._id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState message="No approved applications yet" />
            )}
          </TabPanel>

          <TabPanel px={0}>
            {rejected && rejected?.length > 0 ? (
              <div className="space-y-5">
                {rejected?.map((item: any) => (
                  <JobApplicationCard key={item?._id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState message="No rejected applications" />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AppliedJobScreen;
