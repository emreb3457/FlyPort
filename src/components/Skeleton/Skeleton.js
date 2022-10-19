import { Skeleton, Stack } from "@chakra-ui/react";
const SkeletonComp = () => {
  return (
    <Stack w="100%" marginTop={"50px"}>
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Skeleton height="30px" />
    </Stack>
  );
};
export default SkeletonComp;
