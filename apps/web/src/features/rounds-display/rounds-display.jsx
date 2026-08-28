import { Flex, Text } from "@radix-ui/themes";

const RoundsDisplay = ({ currentRound, totalRounds }) => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      className="w-full"
    >
      <Text className="font-sniglet text-white text-xl md:text-3xl">Round</Text>
      <Text className="font-semibold text-white text-xl md:text-3xl">
        {currentRound} of {totalRounds}
      </Text>
    </Flex>
  );
};

export default RoundsDisplay;
