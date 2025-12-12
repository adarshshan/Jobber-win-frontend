import { Box } from "@chakra-ui/react";
import ChatBox from "Components/Message/ChatBox";
import Mychats from "Components/Message/Mychats";
import SideDrawer from "Components/Message/SideDrawer";
import { ChatState } from "Context/ChatProvider";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  const { userr } = ChatState();

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("screen resize");
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div style={{ width: "100%" }} className="sm:container sm:py-5">
      {userr && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {userr && (
          <Mychats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {userr && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
