import { Box } from "@radix-ui/themes";

const ViewerImage = ({ token }) => {
  return (
    <>
      <img src={token} />
    </>
  );
};

const ViewerContainer = ({ children }) => {
  return (
    <Box height={"100%"} className="bg-white overflow-y-scroll">
      {children}
    </Box>
  );
};

const Viewer = ({ token }) => {
  return (
    <ViewerContainer>
      <ViewerImage token={token} />
    </ViewerContainer>
  );
};

export { Viewer };
