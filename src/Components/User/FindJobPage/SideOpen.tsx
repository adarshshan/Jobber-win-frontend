import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

interface ISideOpenProps {
  children: ReactNode;
  listItems: {
    title: string;
    handleClick?: () => void;
    icon: ReactNode;
    pathTo?: string;
  }[];
}
const SideOpen: React.FC<ISideOpenProps> = ({ children, listItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  return (
    <>
      <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
        {children}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>menu</DrawerHeader>

          <DrawerBody>
            <div className="w-full rounded-md bg-white sm:block hidden py-4">
              {listItems?.map((item, index) => (
                <div
                  key={`menuitem-${index}`}
                  onClick={() => item?.pathTo && navigate(item?.pathTo)}
                  className={`${
                    item?.pathTo &&
                    location.pathname.includes(item?.pathTo) &&
                    "bg-[#efefef] font-semibold"
                  } flex gap-2 items-center w-full p-4 hover:bg-[#f5f5f5] hover:text-[black] shadow-md`}
                >
                  {item?.icon}
                  {item?.title}
                </div>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideOpen;
