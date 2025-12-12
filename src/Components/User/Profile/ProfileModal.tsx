import { UserData } from "@/components/user/ProfilePage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { Textarea, Tooltip } from "@nextui-org/react";
import {
  addSkill,
  createPost,
  getAllSkills,
  updateAbout,
  updateUser,
  uploadPostImage,
} from "Api/user";
import { changeAbout, isUpdateProfile, saveUser } from "app/slice/AuthSlice";
import { useAppSelector } from "app/store";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegSmile } from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import { useDispatch } from "react-redux";

interface IProfileModalProps {
  children: ReactNode;
  createPostScreen?: boolean;
  userProfile?: UserData | null;
  aboutScreen?: boolean;
  setAboutScreen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatePostScreen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSkillAdd?: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | undefined;
  skillAdd?: boolean;
  setUpdateScreen?: React.Dispatch<React.SetStateAction<boolean>>;
  updateScreen?: boolean;
  onClickFn?: () => void;
}

const ProfileModal: React.FC<IProfileModalProps> = ({
  onClickFn,
  children,
  createPostScreen,
  userProfile,
  aboutScreen,
  setAboutScreen,
  setCreatePostScreen,
  setSkillAdd,
  userId,
  skillAdd,
  setUpdateScreen,
  updateScreen,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [caption, setCaption] = useState("");
  const [pic, setPic] = useState("");
  const [picMessages, setPicMessage] = useState("");
  const [about, setAbout] = useState(userProfile?.aboutInfo || "");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState("");

  const [name, setName] = useState<string | undefined>();
  const [headLine, setHeadLine] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [qualification, setQualification] = useState<string | undefined>();
  const [location, setLocation] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

  const dispatch = useDispatch();

  const { user, isUpdate } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setAbout(userProfile?.aboutInfo || "");
  }, [userProfile]);

  const openGallery = () => {
    const butn = document.getElementById("openGallery");
    if (butn) butn.click();
  };

  const postDetails = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadPostImage(formData);
      if (result?.status === 200 && result?.data?.success) {
        setPic(result?.data?.data);
      } else {
        setPic("");
      }
    } catch (error) {
      console.log(error as Error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!pic.length) {
        toast.error("Please select an image");
      } else {
        const result = await createPost(pic, user._id, caption);
        console.log(result);
        console.log("this is the result from the createpostScreen");
        if (result) {
          toast.success("post uploaded successfully.");
          onClose();
          dispatch(isUpdateProfile(!isUpdate));
          if (setCreatePostScreen) setCreatePostScreen(false);
        } else {
          toast.error("somthing went wrong while posting.");
        }
      }
    } catch (error) {
      console.log(error as Error);
    }
  };

  const handleUpdateAbout = async () => {
    try {
      if (!userProfile) return;
      await updateAbout(userProfile?._id, about);
      dispatch(changeAbout(about));
      dispatch(isUpdateProfile(!isUpdate));
      onClose();
      if (setAboutScreen) setAboutScreen(false);
    } catch (error) {
      console.log(error as Error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const result = await getAllSkills(userId);
          setSkill(result?.data?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong while fetching data!");
      }
    };
    fetchData();
  }, [userId]);

  const handleUpdateSkill = async () => {
    try {
      if (userId) {
        const result = await addSkill(userId, skills);
        if (result) toast.success("Skill added successfully");
        else toast.error("Somthing went wrong while adding the skill.");
        if (setSkillAdd) setSkillAdd(false);
        setSkills("");
        onClose();
      } else console.log("userid is not available");
    } catch (error) {
      console.log(error as Error);
    }
  };
  const handleSubmitForm = async () => {
    try {
      if (userId) {
        const result = await updateUser(
          userId,
          name,
          headLine,
          gender,
          qualification,
          location,
          phoneNumber
        );
        if (result?.data.success) {
          toast.success("user details updated successfully");
          dispatch(isUpdateProfile(!isUpdate));
        } else toast.error(result?.data.message);
        dispatch(saveUser(result?.data.data));
        if (setUpdateScreen) setUpdateScreen(false);
        onClose();
      }
    } catch (error) {
      console.log(error as Error);
      toast.error("somthing went wrong while updating the user details!");
    }
  };
  return (
    <>
      <button
        onClick={() => {
          onClickFn && onClickFn();
          onOpen();
        }}
        className="rounded-full px-3 text-sm sm:text-base border border-blue-400 hover:bg-blue-600 hover:text-white"
      >
        {children}
      </button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {createPostScreen
              ? "Create new post"
              : skillAdd
              ? "Add skills"
              : updateScreen
              ? "update profile"
              : "Edit about"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* ------//updateScreen ----------*/}

            {updateScreen && (
              <div className=" shadow-2xl rounded-2xl  text-black ">
                <div className="mx-5">
                  <label htmlFor="">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="mx-5">
                  <label htmlFor="">Headline</label>
                  <input
                    value={headLine}
                    onChange={(e) => setHeadLine(e.target.value)}
                    type="text"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="mx-5">
                  <label htmlFor="">Gender</label>
                  <input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    type="text"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="mx-5">
                  <label htmlFor="">Qualification</label>
                  <input
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    type="text"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="mx-5">
                  <label htmlFor="">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="mx-5">
                  <label htmlFor="">Phone number</label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    className="p-3 w-full border border-gray-300 rounded-full bg-transparent m-2"
                  />
                </div>
                <div className="flex justify-end m-4 text-black">
                  <button
                    onClick={handleSubmitForm}
                    className="border border-gray-300 p-3 rounded-2xl hover:bg-gray-400 hover:text-black"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* -----------Skill Screen------------ */}
            {skillAdd && (
              <div className="shadow-2xl rounded-2xl text-black">
                <div className="m-4 p-3">
                  <p>Enter your Skill here</p>
                  <input
                    type="text"
                    placeholder="type here"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="rounded-full w-full my-8 p-5 bg-transparent border border-gray-300"
                  />
                </div>
                <div className="flex justify-end p-5 me-10">
                  <Button onClick={handleUpdateSkill} variant="secondary">
                    Save
                  </Button>
                </div>
              </div>
            )}

            {/*--------- AboutScreen ------*/}
            {aboutScreen && (
              <div className=" shadow-2xl rounded-2xl text-black">
                <div className="m-4 p-3">
                  <p>
                    You can write about your years of experience, industry, or
                    skills. People also talk about their achievements or
                    previous job experiences.
                  </p>
                  <Textarea
                    variant={"faded"}
                    label="Description"
                    labelPlacement="outside"
                    placeholder="type here"
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 border bg-slate-100 border-white mt-5 h-60"
                  />
                </div>
                <div className="flex justify-end p-5">
                  <Button onClick={handleUpdateAbout} variant="secondary">
                    Save
                  </Button>
                </div>
              </div>
            )}

            {/* --------Create Post Screen ------*/}

            {createPostScreen && (
              <div className="rounded-2xl  z-0 text-black">
                <div className="flex justify-start">
                  <img
                    className="rounded-full w-[50px] h-[50px] m-2 border border-x-white"
                    src={user?.profile_picture}
                    alt="//profile image"
                  />
                  <div>
                    <h1 className="mt-2 ms-3 font-semibold">{user?.name}</h1>
                    <h1 className="ms-3 font-light">{user?.headLine}</h1>
                  </div>
                </div>
                <div className="w-full p-5">
                  <Textarea
                    variant={"bordered"}
                    label=""
                    labelPlacement="outside"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What do you want to talk about ?"
                    className="border border-white rounded-xl p-4 h-52 text-xl"
                  />
                </div>
                <input
                  id="openGallery"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.files?.[0] && postDetails(e.target.files?.[0])
                  }
                  type="file"
                  className="hidden"
                />
                <div className="flex justify-start text-white text-2xl gap-8 ms-10 mt-3">
                  <Tooltip content={"Add media"} className="text-white ">
                    <Button onClick={openGallery}>
                      <GoFileMedia />
                    </Button>
                  </Tooltip>
                  <Tooltip content={"Add imogies"} className="text-white">
                    <Button>
                      {" "}
                      <FaRegSmile />
                    </Button>
                  </Tooltip>
                </div>
                <div className="flex justify-end m-5 me-10">
                  <button
                    onClick={handleSubmit}
                    className="border rounded-full px-8 py-2 bg-gray-200 m-3 hover:bg-gray-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
