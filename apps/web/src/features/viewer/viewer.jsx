import { VIEWER_ASSETS } from "./viewer-assets";
import { Box } from "@radix-ui/themes";

const ViewerImage = ({ token }) => {
  return (
    <>
      <img src={VIEWER_ASSETS[token]} />
    </>
  );
};

const ViewerContainer = ({ children, onClick }) => {
  return (
    <Box
      height={"100%"}
      className="bg-white overflow-y-scroll"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const Viewer = ({ token, onClick }) => {
  return (
    <ViewerContainer onClick={onClick}>
      <ViewerImage token={token} />
    </ViewerContainer>
  );
};

export { Viewer };
