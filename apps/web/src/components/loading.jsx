import { useEffect, useState, useRef } from "react";
import { Box } from "@radix-ui/themes";

const Loading = ({ isLoading }) => {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (!isLoading) {
      timerRef.current = setTimeout(() => {
        setVisible((prev) => !prev);
      }, 400);
    }

    return () => clearTimeout(timerRef.current);
  }, [isLoading]);

  return (
    <Box
      className="fixed inset-0 transition-opacity duration-1000 ease flex! justify-center items-center bg-blue-400 z-20"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Box className="loader font-sniglet text-4xl md:text-5xl text-white [clip-path:inset(0_1.5ch_-1ch_0)] animate-l4 before:content-['Loading._._.']"></Box>
    </Box>
  );
};

export { Loading };
