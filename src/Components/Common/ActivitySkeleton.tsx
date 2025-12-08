import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const ActivitySkeleton = ({}) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Stack
          key={`skeleton-${index}`}
          className="px-4 pt-3"
          gap="4"
          w={"100%"}
        >
          <div className="flex items-center gap-2">
            <SkeletonCircle size={"10"} />
            <SkeletonText className="w-full" noOfLines={2} />
          </div>
          <Skeleton width="100%" height={"35vh"} />
        </Stack>
      ))}
    </>
  );
};

export default ActivitySkeleton;
