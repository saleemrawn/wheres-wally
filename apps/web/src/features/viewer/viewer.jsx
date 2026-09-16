import { useEffect, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  useTransformComponent,
} from "react-zoom-pan-pinch";
import { VIEWER_ASSETS } from "./viewer-assets";
import { Box, Button, Flex } from "@radix-ui/themes";
import {
  ZoomIn as MagPlus,
  ZoomOut as MagMinus,
  RotateCcw,
  Check,
} from "lucide-react";
import "./viewer.css";

const CursorCoordinates = ({ mousePosition, onMouseMove }) => {
  const { scale, positionX, positionY } = useTransformComponent(
    ({ state }) => state,
  );

  const contentX = (mousePosition?.x - positionX) / scale;
  const contentY = (mousePosition?.y - positionY) / scale;

  useEffect(() => {
    onMouseMove({ x: contentX.toFixed(0), y: contentY.toFixed(0) });
  }, [mousePosition]);
};

const ViewerMarker = ({ posX, posY }) => {
  const x = posX - 20;
  const y = posY - 20;

  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={
        "absolute z-10 w-10 h-10 bg-green-600/80 border-2 border-white rounded-full shadow-3xl"
      }
      top={`${y}px`}
      left={`${x}px`}
    >
      <Check className="text-white" />
    </Flex>
  );
};

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
        <MagPlus className="text-red-600" />
      </Button>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          zoomOut();
        }}
        className="bg-white! w-12! h-12! shadow-xl/60!"
      >
        <MagMinus className="text-red-600" />
      </Button>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          resetTransform();
        }}
        className="bg-white! w-12! h-12! shadow-xl/60!"
      >
        <RotateCcw className="text-red-600" />
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

const Viewer = ({ token, ref, markers, onClick }) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastClickCoords = useRef({ x: 0, y: 0 });
  const wasDragging = useRef(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleContainerClick = () => {
    if (wasDragging.current) {
      wasDragging.current = false;
      return;
    }
    onClick(lastClickCoords.current);
  };

  const handlePanningStart = () => {
    wasDragging.current = false;
  };

  const handlePanning = () => {
    wasDragging.current = true;
  };

  const handleCoordsChange = (coords) => {
    lastClickCoords.current = coords;
  };

  return (
    <ViewerContainer onClick={handleContainerClick} className="relative">
      <TransformWrapper
        ref={ref}
        initialScale={1}
        minScale={1}
        maxScale={2}
        limitToBounds={true}
        onPanningStart={handlePanningStart}
        onPanning={handlePanning}
        doubleClick={{ disabled: true }}
      >
        <CursorCoordinates
          mousePosition={mousePosition.current}
          onMouseMove={handleCoordsChange}
        />

        <ViewerControls />

        <Box onMouseMove={handleMouseMove} className="h-full relative">
          <TransformComponent>
            {markers.map((marker) => (
              <ViewerMarker
                key={marker.id}
                posX={marker.coordinates.x}
                posY={marker.coordinates.y}
              />
            ))}

            <img src={VIEWER_ASSETS[token]} alt="" className="cursor-pointer" />
          </TransformComponent>
        </Box>
      </TransformWrapper>
    </ViewerContainer>
  );
};

export { Viewer };
