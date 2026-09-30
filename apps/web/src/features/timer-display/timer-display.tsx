import type { Time } from "./timer-display-types";
import { padZero } from "../../utils/number";
import { Flex, Text } from "@radix-ui/themes";

interface TimerDisplayProps {
  time: Pick<Time, "hh" | "mm" | "ss">;
}

const TimerDisplay = ({ time }: TimerDisplayProps) => {
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
