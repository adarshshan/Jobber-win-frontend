import React, { useEffect, useState } from "react";
import MenuTabs from "./MenuTabs";
import { Divider } from "@nextui-org/react";
import PostListItem from "./PostListItem";
import { FaArrowRightLong } from "react-icons/fa6";
import { getAllPosts } from "Api/user";
import ProfileModal from "./ProfileModal";

interface IPostCardProps {
  setCreatePostScreen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
  createPostScreen: boolean;
}
export interface PostInterface extends Document {
  _id: string;
  userId?: string;
  caption?: string;
  imageUrl?: string;
  isDeleted: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const PostCard: React.FC<IPostCardProps> = ({
  setCreatePostScreen,
  userId,
  createPostScreen,
}) => {
  const [posts, setPosts] = useState<PostInterface[]>();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userId) {
          const result = await getAllPosts(userId);
          if (result?.data.success) {
            let posts = result.data.data.filter(
              (item: PostInterface) => !item.isDeleted
            );
            setPosts(posts);
          }
        }
      } catch (error) {
        console.log(error as Error);
      }
    };
    fetchPosts();
  }, [userId, fetchAgain]);

  return (
    <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg p-4 sm:p-6 sm:pt-8 shadow-lg">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Activity</h1>
          <p className="text-blue-500">959 Followers</p>
        </div>
        <ProfileModal
          onClickFn={() => setCreatePostScreen(!createPostScreen)}
          createPostScreen={createPostScreen}
          setCreatePostScreen={setCreatePostScreen}
        >
          Create a post
        </ProfileModal>
      </div>
      <MenuTabs />
      {posts?.length ? (
        posts.map((postItem) => {
          return (
            <div key={Math.random()}>
              <Divider className="my-4" />
              <PostListItem
                postItem={postItem}
                like={100}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            </div>
          );
        })
      ) : (
        <div className="m-2">
          <h1>You havn't posted anything yet</h1>
        </div>
      )}
      <Divider className="my-4" />
      <div id="postListFooter" className=" flex justify-center w-full">
        <p>Show all Posts </p>
        <FaArrowRightLong className="text-xl m-1 ms-2" />
      </div>
    </div>
  );
};

export default PostCard;
