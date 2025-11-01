import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "Context/ChatProvider";

interface IChatBox {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChatBox: React.FC<IChatBox> = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      className="mb-16"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />{" "}
      {/* Here is the socket.io is using...(SingleChat)*/}
    </Box>
  );
};

export default ChatBox;
