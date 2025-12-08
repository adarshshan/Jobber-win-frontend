import React, { useEffect, useState } from "react";
import LeftSide from "Components/User/Home/LeftSide";
import MiddleSide from "Components/User/Home/MiddleSide";
import FriendSuggession from "Components/User/Profile/FriendSuggession";
import { getProfile } from "Api/user";
import { UserData } from "./ProfilePage";
import { BiUpArrowCircle } from "react-icons/bi";
interface ITestProps {}
const Home: React.FC<ITestProps> = () => {
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        if (response) setUserProfile(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <section className="grid md:grid-cols-12 gap-2 sm:gap-5 container  py-5">
        <LeftSide userProfile={userProfile} />
        <MiddleSide userProfile={userProfile} />

        <div className="md:col-span-3 bg-transparent rounded-lg">
          <FriendSuggession />
        </div>
      </section>
      <BiUpArrowCircle
        onClick={scrollToTop}
        className="fixed bottom-20 sm:bottom-10 right-4 sm:right-14 text-5xl text-gray-300 hover:text-black"
      />
    </div>
  );
};

export default Home;
