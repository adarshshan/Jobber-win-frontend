import { Button, useDisclosure } from "@chakra-ui/react";
import { getAllSavedJobs, removeSavedJobs } from "Api/user";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaTrashAlt,
} from "react-icons/fa";

interface ISavedJObScreenProps {}
const SavedJobScreen: React.FC<ISavedJObScreenProps> = ({}) => {
  const [jobId, setJobId] = useState("");
  const [savedJobs, setSavedJobs] = useState<any[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLInputElement | any>(null);

  useEffect(() => {
    const fetchSave = async () => {
      try {
        const res = await getAllSavedJobs();
        if (res?.data?.success) {
          setSavedJobs(res?.data?.data);
        } else toast.error(res?.data?.message);
      } catch (error) {
        console.log(error as Error);
      }
    };
    fetchSave();
  }, [jobId]);

  const handleUnsaveJob = async () => {
    try {
      if (jobId) {
        const res = await removeSavedJobs(jobId);
        setJobId("");
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        } else toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error as Error);
    }
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay backdropFilter="blur(4px)">
          <AlertDialogContent mx={4} borderRadius="xl" shadow="2xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Saved Job?
            </AlertDialogHeader>
            <AlertDialogBody>
              This job will be removed from your saved list. You can save it
              again later.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleUnsaveJob();
                  onClose();
                }}
                ml={3}
              >
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBookmark className="text-blue-600" />
            Saved Jobs
          </h1>
          <p className="text-gray-600 mt-2">
            {savedJobs?.length
              ? `You have ${savedJobs?.length} job${
                  savedJobs?.length > 1 ? "s" : ""
                } saved`
              : "Jobs you save will appear here"}
          </p>
        </div>

        {savedJobs && savedJobs?.length > 0 ? (
          <div className="space-y-5">
            {savedJobs?.map((item) => (
              <div
                key={item?._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    {/* Job Info */}
                    <Link
                      to={`/user/job-details/${item?._id}`}
                      className="flex-1 flex items-start gap-5"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="w-20 h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                          src={item?.job_img || "/placeholder-company.png"}
                          alt={item?.company_name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item?.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-700 mt-1">
                          {item?.company_name}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-gray-500" />
                            {item?.location}
                          </span>
                          {item?.job_type && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="flex items-center gap-1.5">
                                <FaBriefcase className="text-gray-500" />
                                <span className="capitalize">
                                  {item?.job_type.replace("-", " ")}
                                </span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <div className="flex items-center">
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        size="md"
                        leftIcon={<FaTrashAlt />}
                        onClick={() => {
                          setJobId(item?._id);
                          onOpen();
                        }}
                        className="hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl mb-6 flex items-center justify-center">
              <FaBookmark className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700">
              No Saved Jobs Yet
            </h3>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              When you save a job, it will appear here so you can easily find it
              later.
            </p>
            <Link to="/all-jobs">
              <Button colorScheme="blue" mt={6} size="lg">
                Browse Jobs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedJobScreen;
