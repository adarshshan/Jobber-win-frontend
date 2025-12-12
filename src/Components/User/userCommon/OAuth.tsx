import { Button } from "@nextui-org/react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { googleLogin } from "../../../Api/user";
import { useDispatch } from "react-redux";
import { saveUser, setUserCredential } from "../../../app/slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {};
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      className="bg-gradient-to-r from-red-500 to-orange-400 "
    >
      <AiFillGoogleCircle />
      Sign In with Google
    </Button>
  );
};

export default OAuth;
