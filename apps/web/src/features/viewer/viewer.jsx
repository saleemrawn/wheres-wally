import { useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { VIEWER_ASSETS } from "./viewer-assets";
import { Box, Button, Flex } from "@radix-ui/themes";
import {
  ZoomIn as MagPlus,
  ZoomOut as MagMinus,
  RotateCcw,
} from "lucide-react";
import "./viewer.css";

const ViewerControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <Flex
      direction={"column"}
      gap={"2"}
      className="absolute right-0 bottom-0 mr-4 mb-4 z-10 hidden! lg:flex!"
    >
      <Button
        onClick={(event) => {
          event.stopPropagation();
          zoomIn();
        }}
        className="bg-white! w-12! h-12! shadow-xl/60!"
      >
        <MagPlus className="text-black" />
      </Button>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          zoomOut();
        }}
        className="bg-white! w-12! h-12! shadow-xl/60!"
      >
        <MagMinus className="text-black" />
      </Button>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          resetTransform();
        }}
        className="bg-white! w-12! h-12! shadow-xl/60!"
      >
        <RotateCcw className="text-black" />
      </Button>
    </Flex>
  );
};

const ViewerContainer = ({ children, onClick }) => {
  return (
    <Box
      height={"100%"}
      className="relative bg-white cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const Viewer = ({ token, onClick }) => {
  const wasDragging = useRef(false);

  return (
    <ViewerContainer
      onClick={(event) => {
        if (wasDragging.current) {
          wasDragging.current = false;
          return;
        }

        onClick(event);
      }}
    >
      <TransformWrapper
        initialScale={1}
        minScale={1}
        limitToBounds={true}
        onPanningStart={() => {
          wasDragging.current = false;
        }}
        onPanning={() => {
          wasDragging.current = true;
        }}
        doubleClick={{ disabled: true }}
        wheel={{ disabled: true }}
      >
        <ViewerControls />
        <TransformComponent>
          <img src={VIEWER_ASSETS[token]} className="cursor-pointer" />
        </TransformComponent>
      </TransformWrapper>
    </ViewerContainer>
  );
};

export { Viewer };
