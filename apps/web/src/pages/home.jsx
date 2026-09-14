import { useEffect } from "react";
import { useGameStateUpdate } from "../context/game-state";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import WallyImage from "../assets/logos/logo-with-wally.png";

const Home = () => {
  const { setGameRunning } = useGameStateUpdate();

  useEffect(() => {
    setGameRunning(false);
  }, []);

  return (
    <>
      <Container
        size={{ lg: "2" }}
        height={"100%"}
        mt={"8"}
        ml={{ initial: "4", md: "0" }}
        mr={{ initial: "4", md: "0" }}
        mb={{ initial: "8", md: "0" }}
      >
        <Flex
          direction={"column"}
          align={"center"}
          gap={"6"}
          p={"6"}
          className="bg-white rounded-4xl shadow-xl"
        >
          <Box>
            <img src={WallyImage} alt="where's wally" className="max-h-64" />
          </Box>

          <Box>
            <Heading as={"h2"} size={"8"} align={"center"} mb={"4"}>
              How to play?
            </Heading>
            <Text>
              <ul className="list-disc">
                <li className="mb-2 md:mb-1">Play all 5 rounds</li>
                <li className="mb-2 md:mb-1">
                  Tag the photo & select a character from the popup
                </li>
                <li className="mb-2 md:mb-1">
                  Find all the characters in fastest possible time
                </li>
                <li>
                  Submit your name if your time has made it into the top 10
                </li>
              </ul>
            </Text>
          </Box>

          <Box justifySelf={"start"}>
            <Button size={"4"} asChild>
              <Link to={"/game"}>Start Game</Link>
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export { Home };
