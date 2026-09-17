import { useEffect, useState } from "react";
import { useViewerImages } from "../viewer/use-viewer-images";

const useRoundDisplay = () => {
  const { images } = useViewerImages();
  const [totalRounds, setTotalRounds] = useState();
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    setTotalRounds(images?.length);
  }, [images]);

  const incrementCurrentRound = () => {
    setCurrentRound((prev) => prev + 1);
  };

  const resetCurrentRound = () => setCurrentRound(1);

  return {
    currentRound,
    totalRounds,
    incrementCurrentRound,
    resetCurrentRound,
  };
};

export { useRoundDisplay };
