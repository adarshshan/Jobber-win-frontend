import { UserData } from "@/components/user/ProfilePage";
import { Image } from "@nextui-org/react";
import { cancelRequest, sendRequest } from "Api/user";
import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../@/components/ui/alert-dialog";
import { BiUserPlus } from "react-icons/bi";

interface IContactCardProps {
  item: UserData;
  sendReq: string[] | undefined;
  setConfirmFriend: React.Dispatch<React.SetStateAction<boolean>>;
  confirmFriend: boolean;
}
const ContactCard: React.FC<IContactCardProps> = ({
  item,
  sendReq,
  setConfirmFriend,
  confirmFriend,
}) => {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const centerChild = () => {
      const parent = parentRef.current;
      const child = childRef.current;

      if (parent && child) {
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        const offsetX = (parentRect.width - childRect.width) / 2;
        const offsetY = (parentRect.height - childRect.height) / 2;

        child.style.left = `${offsetX}px`;
        child.style.top = `${offsetY + 35}px`;
      }
    };

    centerChild();
    window.addEventListener("resize", centerChild);
    return () => {
      window.removeEventListener("resize", centerChild);
    };
  }, []);

  const handleSendRequest = async (receiverId: string) => {
    try {
      const result = await sendRequest(receiverId);
      if (result) setConfirmFriend(!confirmFriend);
    } catch (error) {
      console.log(error as Error);
    }
  };

  const withdrawRequest = async (id: string) => {
    try {
      const res = await cancelRequest(id);
      if (res) setConfirmFriend(!confirmFriend);
    } catch (error) {
      console.log(error);
    }
  };

  const isRequestSent = sendReq?.includes(item?._id);

  return (
    <div
      onClick={() => navigate(`/user/view-user-profile/${item?._id}`)}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer max-w-sm mx-auto"
    >
      {/* Cover Photo */}
      <div className="h-24 sm:h-28 md:h-28 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <Image
          src={
            item?.cover_image ||
            "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
          }
          alt="Cover"
          className="w-full h-full object-cover"
          removeWrapper
        />
      </div>

      {/* Profile Picture - Perfectly Centered Over Cover */}
      <div className="relative px-4 pb-6 -mt-12 sm:-mt-14">
        <div className="flex justify-center">
          <img
            src={item?.profile_picture || "/default-avatar.png"}
            alt={item?.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg object-cover z-50"
          />
        </div>

        {/* Name & Headline */}
        <div className="text-center mt-4">
          <h2 className="text-lg font-bold text-gray-900">
            {item?.name || "User"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {item?.headLine || "Software Engineer"}
          </p>
        </div>

        {/* Connect / Requested Button */}
        <div className="mt-6 flex justify-center">
          {isRequestSent ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  Requested Requested
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Withdraw friend request?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel the connection request sent to {item?.name}
                    .
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => withdrawRequest(item?._id)}>
                    Yes, Withdraw
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendRequest(item?._id);
              }}
              className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <BiUserPlus className="text-lg" />
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
