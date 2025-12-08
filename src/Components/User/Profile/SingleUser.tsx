import { Avatar } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface ISingleUserProps {
  name: string;
  imageUrl: string;
  id: string;
}
const SingleUser: React.FC<ISingleUserProps> = ({ id, name, imageUrl }) => {
  return (
    <>
      <div>
        <Link
          className="flex gap-1 items-center"
          to={`/user/view-user-profile/${id}`}
        >
          <Avatar src={imageUrl} />
          <p className="truncate">{name}</p>
          <button className="border border-blue-500 text-blue-500 rounded-full px-3 py-1 text-sm mt-2">
            Follow
          </button>
        </Link>
      </div>
    </>
  );
};

export default SingleUser;
