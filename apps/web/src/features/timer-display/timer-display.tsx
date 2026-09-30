import { padZero } from "../../utils/number";
import { Button, Flex, Text } from "@radix-ui/themes";

const TimerDisplay = ({ time }) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap={"2"}
      className="w-full border-r border-r-white"
    >
      <Text className="text-blue-950 md:text-xl">Time</Text>
      <Flex>
        <Text className="font-bold text-blue-950 md:text-xl">
          {padZero(time.hh)}:
        </Text>
        <Text className="font-bold text-blue-950 md:text-xl">
          {padZero(time.mm)}:
        </Text>
        <Text className="font-bold text-blue-950 md:text-xl">
          {padZero(time.ss)}
        </Text>
      </Flex>
    </Flex>
  );
};

export { TimerDisplay };
