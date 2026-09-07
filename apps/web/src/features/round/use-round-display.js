import { useCallback, useEffect, useState } from "react";
import { useViewerImages } from "../viewer/use-viewer-images";

const useRoundDisplay = () => {
  const { images } = useViewerImages();
  const [totalRounds, setTotalRounds] = useState();
  const [currentRound, setCurrentRound] = useState(1);

  const incrementCurrentRound = useCallback(() => {
    setCurrentRound((prev) => prev + 1);
  });

  useEffect(() => {
    setTotalRounds(images?.length);
  }, [images]);

  return { currentRound, totalRounds, incrementCurrentRound };
};

export { useRoundDisplay };
