import { useCharacter } from "./use-character";
import { Info } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  RadioCards,
  Skeleton,
  Callout,
} from "@radix-ui/themes";

const CharacterItem = ({ characterName, imgSrc, imgAlt }) => {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"} gap={"4"}>
      <Box className="m-w-100">
        <img src={imgSrc} alt={imgAlt} />
      </Box>
      <Text>{characterName}</Text>
    </Flex>
  );
};

const CharacterList = ({ onCharacterClick }) => {
  const { characters, isLoading, error } = useCharacter();

  if (characters?.length === 0) {
    return (
      <Callout.Root color="red" className="w-full">
        <Callout.Icon>
          <Info size={16} strokeWidth={2} />
        </Callout.Icon>
        <Callout.Text>No characters found.</Callout.Text>
      </Callout.Root>
    );
  }

  return (
    <Flex gap={"8"}>
      <RadioCards.Root
        variant="surface"
        columns={{ initial: "1", sm: "3", lg: "5" }}
        onValueChange={onCharacterClick}
      >
        {characters?.map((character) => (
          <Skeleton loading={isLoading}>
            <RadioCards.Item value={character.id} key={character.id}>
              <CharacterItem
                characterName={character.name}
                imgSrc={character.imgSrc}
                imgAlt={character.name}
              />
            </RadioCards.Item>
          </Skeleton>
        ))}
      </RadioCards.Root>
    </Flex>
  );
};

export default CharacterList;
