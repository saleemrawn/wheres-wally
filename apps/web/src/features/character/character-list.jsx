import { useCharacters } from "./use-characters";
import { CHARACTER_ASSETS } from "./character-assets";
import { Info } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  RadioCards,
  Skeleton,
  Callout,
} from "@radix-ui/themes";

const CharacterItem = ({ name, token, alt, isCompleted }) => {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"} gap={"4"}>
      <Box className={`m-w-100 ${isCompleted ? "opacity-30" : "opacity-100"}`}>
        <img src={CHARACTER_ASSETS[token]} alt={alt} />
      </Box>
      <Text>{name}</Text>
    </Flex>
  );
};

const CharacterList = ({ onSelect, completedIds }) => {
  const { characters, isLoading, error } = useCharacters();

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
        onValueChange={onSelect}
      >
        {characters?.map((character) => {
          const isCompleted = completedIds.has(character.id);
          return (
            <Skeleton loading={isLoading} key={character.id}>
              <RadioCards.Item value={character.id} disabled={isCompleted}>
                <CharacterItem
                  name={character.name}
                  token={character.imageToken}
                  alt={character.name}
                  isCompleted={isCompleted}
                />
              </RadioCards.Item>
            </Skeleton>
          );
        })}
      </RadioCards.Root>
    </Flex>
  );
};

export { CharacterList };
