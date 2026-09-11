import { Link } from "react-router";
import { padZero } from "../../utils/number";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";

const GameCompleteDialog = ({ isOpen, finishTime, onPlayAgain, children }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="flex flex-col items-center gap-3 p-10!">
        <Dialog.Title size={"8"}>Game Complete!</Dialog.Title>
        <Flex direction={"column"} gap={"6"}>
          <Dialog.Description className="flex flex-col items-center gap-2">
            <Text>You completed the game in:</Text>
            <Text className="font-bold text-2xl">
              {padZero(finishTime?.hh)}:{padZero(finishTime?.mm)}:
              {padZero(finishTime?.ss)}
            </Text>
          </Dialog.Description>

          {children}

          <Flex gap={"2"} justify={"center"}>
            <Button onClick={onPlayAgain} size={"3"} className="bg-green-600!">
              Play Again?
            </Button>
            <Button size={"3"} asChild>
              <Link to={"/leaderboard"}>View Leaderboard</Link>
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { GameCompleteDialog };
