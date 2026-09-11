import { useEffect } from "react";
import { useGameState } from "../context/game-state";
import { Flex, Box, Text } from "@radix-ui/themes";
import Logo from "../assets/logos/logo-text-only.png";

const Footer = () => {
  const { isRunning } = useGameState();
  if (isRunning) return;

  return (
    <Box p={"4"} className="bg-white shadow-xl">
      <footer>
        <Flex align={"center"} gap={"4"}>
          <img src={Logo} alt="wheres wally logo" className="max-h-10" />
        </Flex>
      </footer>
    </Box>
  );
};

export { Footer };
