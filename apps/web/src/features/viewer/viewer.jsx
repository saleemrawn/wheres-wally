import { useEffect, useRef, useState } from "react";
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

const MARKER_SIZE = 48;

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
  const x = posX - MARKER_SIZE / 2;
  const y = posY - MARKER_SIZE / 2;

  return (
    <Flex
      justify={"center"}
      align={"center"}
      className={
        "absolute z-10 bg-green-600/80 border-3 border-white rounded-full shadow-xl/80"
      }
      style={{ width: `${MARKER_SIZE}px`, height: `${MARKER_SIZE}px` }}
      top={`${y}px`}
      left={`${x}px`}
    >
      <Check strokeWidth={"3"} className="text-white" />
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

const ViewerContainer = ({ children, isPanning, onClick }) => {
  return (
    <Box
      height={"100%"}
      className="relative bg-white overflow-hidden"
      onClick={onClick}
      style={{
        cursor: isPanning ? "grabbing" : "pointer",
      }}
    >
      {children}
    </Box>
  );
};

const Viewer = ({ token, ref, markers, onClick }) => {
  const [isPanning, setIsPanning] = useState(false);
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
    setIsPanning(true);
  };

  const handlePanning = () => {
    wasDragging.current = true;
  };

  const handlePanningStop = () => {
    setIsPanning(false);
  };

  const handleCoordsChange = (coords) => {
    lastClickCoords.current = coords;
  };

  return (
    <ViewerContainer
      onClick={handleContainerClick}
      isPanning={isPanning}
      className="relative"
    >
      <TransformWrapper
        ref={ref}
        initialScale={1}
        minScale={1}
        maxScale={2}
        limitToBounds={true}
        onPanningStart={handlePanningStart}
        onPanning={handlePanning}
        onPanningStop={handlePanningStop}
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
