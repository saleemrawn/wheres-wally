import { padZero } from "../../utils/number";
import { Button, Flex, Text } from "@radix-ui/themes";

const TimerDisplay = ({ time }) => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      py={{ initial: "2", xs: "4" }}
      className="w-full border-r-2 border-r-white"
    >
      <Text className="font-sniglet text-white text-xl md:text-3xl">Time</Text>
      <Flex>
        <Text className="font-semibold text-white text-xl md:text-3xl">
          {padZero(time.hh)}:
        </Text>
        <Text className="font-semibold text-white text-xl md:text-3xl">
          {padZero(time.mm)}:
        </Text>
        <Text className="font-semibold text-white text-xl md:text-3xl">
          {padZero(time.ss)}
        </Text>
      </Flex>
    </Flex>
  );
};

export { TimerDisplay };
