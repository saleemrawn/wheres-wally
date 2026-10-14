import { CHARACTER_ASSETS } from "./character-assets";
import { ApiError, type TError } from "../../utils/error";
import { Info } from "lucide-react";
import {
  Box,
  Flex,
  Text,
  RadioCards,
  Callout,
  Skeleton,
} from "@radix-ui/themes";

type CharacterToken = keyof typeof CHARACTER_ASSETS;

interface CharacterItemProps {
  name: string;
  token: CharacterToken;
  alt: string;
  isCompleted: boolean;
}

interface CharacterListProps {
  characters: { id: number; name: string; imageToken: CharacterToken }[];
  completedIds: Set<number>;
  error: TError | null;
  isLoading: boolean;
  onSelect: (value: number) => void;
}

const CharacterItem = ({
  name,
  token,
  alt,
  isCompleted,
}: CharacterItemProps) => {
  return (
    <Flex direction={"column"} justify={"center"} align={"center"} gap={"4"}>
      <Box className={`m-w-100 ${isCompleted ? "opacity-30" : "opacity-100"}`}>
        <img src={CHARACTER_ASSETS[token]} alt={alt} />
      </Box>
      <Text>{name}</Text>
    </Flex>
  );
};

const CharacterList = ({
  characters,
  completedIds,
  error,
  isLoading,
  onSelect,
}: CharacterListProps) => {
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
    <Skeleton loading={isLoading}>
      {error instanceof ApiError && (
        <Callout.Root color="red" size={"1"}>
          <Callout.Text>
            {error.message} ({error.status})
          </Callout.Text>
        </Callout.Root>
      )}

      <Flex gap={"8"}>
        <RadioCards.Root
          variant="surface"
          columns={{ initial: "1", sm: "3", lg: "5" }}
          onValueChange={(id) => onSelect(Number(id))}
        >
          {characters?.map((character) => {
            const isCompleted = completedIds.has(character.id);
            return (
              <RadioCards.Item
                key={character.id}
                value={String(character.id)}
                disabled={isCompleted}
              >
                <CharacterItem
                  name={character.name}
                  token={character.imageToken}
                  alt={character.name}
                  isCompleted={isCompleted}
                />
              </RadioCards.Item>
            );
          })}
        </RadioCards.Root>
      </Flex>
    </Skeleton>
  );
};

export { CharacterList };
