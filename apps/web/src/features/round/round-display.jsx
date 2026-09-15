import { Flex, Text } from "@radix-ui/themes";

const RoundDisplay = ({ currentRound, totalRounds }) => {
  return (
    <Flex justify={"center"} align={"center"} gap={"2"} className="w-full">
      <Text className="text-blue-950 md:text-xl">Round</Text>
      <Text className="font-bold text-blue-950 md:text-xl">
        {currentRound} of {totalRounds}
      </Text>
    </Flex>
  );
};

export { RoundDisplay };
