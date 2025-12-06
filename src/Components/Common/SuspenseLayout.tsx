import { Skeleton } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const SuspenseLayout: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Skeleton className="w-full h-[50px] mt-3 gap-5 rounded-full" />
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default SuspenseLayout;
