import { JobInterface } from "@/components/recruiter/PostJobForm";
import { getAllJobs, getJobsByDate, getJobsByExperience } from "Api/user";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MdOutlineReport } from "react-icons/md";
import {
  FaAngleDown,
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaRegSave,
} from "react-icons/fa";
import { useAppSelector } from "app/store";
import { useDispatch } from "react-redux";
import { setSearchText } from "app/slice/CommonSlice";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

export interface JobResult {
  _id: string;
  title: string;
  company_name: string;
  industry: string;
  description: string;
  total_vaccancy: number;
  location: string;
  job_img?: string;
  job_type: string;
  recruiter_details: any;
  experience: number;
  min_salary: number;
  max_salary: number;
}
interface IAllJobsProps {}
const AllJobs: React.FC<IAllJobsProps> = () => {
  const [jobs, setJobs] = useState<JobResult[]>();
  const [skillJob, setSkillJob] = useState<JobResult[]>();
  const [color, setColor] = useState("A");

  const { search } = useAppSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchText(""));
  }, []);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await getAllJobs(search);
        if (res?.data.success) {
          console.log(res);
          setJobs(res.data.data.alljobs);
          setSkillJob(res.data.data.jobs);
        } else toast.error(res?.data.message);
      } catch (error) {
        console.log(error as Error);
      }
    };
    fetchAllJobs();
  }, [search]);

  const handleSortJobs = async (jobType: string, payLoad: string) => {
    try {
      setColor(payLoad);
      const res = await getAllJobs(jobType);
      if (res?.data.success) {
        console.log(res);
        setJobs(res.data.data.alljobs);
        setSkillJob(res.data.data.jobs);
      } else toast.error(res?.data.message);
    } catch (error) {
      console.log(error as Error);
    }
  };
  const handleSortJobsByDate = async (num: number) => {
    try {
      const res = await getJobsByDate(num);
      if (res?.data.success) {
        setJobs(res.data.data);
      } else toast.error(res?.data.message);
    } catch (error) {
      console.log(error as Error);
    }
  };
  const handleSortJobsByExperience = async (start: number, end: number) => {
    try {
      const res = await getJobsByExperience(start, end);
      if (res?.data.success) {
        setJobs(res.data.data);
      } else toast.error(res?.data.message);
    } catch (error) {
      console.log(error as Error);
      alert("its here...");
    }
  };

  const JobCard = ({ item }: { item: JobResult }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <Link to={`/user/job-details/${item?._id}`} className="block">
        <div className="flex items-start gap-5 p-6">
          <div className="flex-shrink-0">
            <img
              className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
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
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-gray-500" />
                {item?.location}
              </span>
              <span className="flex items-center gap-1">
                <FaBriefcase className="text-gray-500" />
                {item?.job_type}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-gray-500" />
                {item?.experience === 0 ? "Fresher" : `${item?.experience} yrs`}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 pb-4 flex justify-end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              className="text-gray-600 hover:bg-gray-100"
            >
              <BsThreeDotsVertical className="text-xl" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Job actions"
            className="bg-white shadow-lg rounded-lg"
          >
            <DropdownItem key="save" className="hover:bg-blue-50">
              <div className="flex items-center gap-2 text-blue-600">
                <FaRegSave />
                <span>Save Job</span>
              </div>
            </DropdownItem>
            <DropdownItem key="report" className="hover:bg-red-50 text-red-600">
              <div className="flex items-center gap-2">
                <MdOutlineReport />
                <span>Report Job</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Recommended Jobs Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-blue-600">✦</span>
          Jobs Matching Your Skills
        </h2>

        {skillJob && skillJob?.length > 0 ? (
          <div className="space-y-4">
            {skillJob?.map((item) => (
              <JobCard key={item?._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-center gap-3 text-yellow-800">
            <FaCircleExclamation className="text-2xl" />
            <p className="font-medium">
              No jobs match your skills yet. Update your profile to see better
              recommendations!
            </p>
          </div>
        )}
      </section>

      {/* All Jobs Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Jobs</h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            {["A", "", "full-time", "part-time", "remote"].map((type, idx) => {
              const labels = ["All", "Full-Time", "Part-Time", "Remote"];
              const payload = ["A", "B", "C", "D"][idx];
              const label = labels[idx];
              return (
                <button
                  key={type}
                  onClick={() => handleSortJobs(type, payload)}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    color === payload
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* Sort by Date Popover */}
            <Popover>
              <PopoverTrigger>
                <button
                  onClick={() => setColor("F")}
                  className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${
                    color === "F"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Date Posted
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody className="p-2 space-y-1">
                  {[
                    { days: 1, text: "Last 24 hours" },
                    { days: 7, text: "Last 7 days" },
                    { days: 15, text: "Last 15 days" },
                    { days: 30, text: "Last 30 days" },
                  ].map((item) => (
                    <button
                      key={item.days}
                      onClick={() => handleSortJobsByDate(item.days)}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      {item.text}
                    </button>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>

            {/* Experience Filter */}
            <Popover>
              <PopoverTrigger>
                <button
                  onClick={() => setColor("E")}
                  className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-1 ${
                    color === "E"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Experience
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody className="p-2 space-y-1">
                  {[
                    { start: 0, end: 0, label: "Entry Level (No Experience)" },
                    { start: 0, end: 1, label: "Less than 1 year" },
                    { start: 0, end: 2, label: "Less than 2 years" },
                    { start: 2, end: 4, label: "2 - 4 years" },
                    { start: 4, end: 0, label: "More than 4 years" },
                  ].map((exp) => (
                    <button
                      key={`${exp?.start}-${exp?.end}`}
                      onClick={() =>
                        handleSortJobsByExperience(exp?.start, exp.end)
                      }
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      {exp?.label}
                    </button>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Jobs List */}
        {jobs && jobs?.length > 0 ? (
          <div className="space-y-5">
            {jobs?.map((item) => (
              <JobCard key={item?._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <FaCircleExclamation className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 font-medium">
              No jobs found matching your criteria
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting filters or search terms
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllJobs;
