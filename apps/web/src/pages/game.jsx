import { useEffect, useState } from "react";
import { useGameStateUpdate } from "../context/game-state";
import { Viewer } from "../features/viewer/viewer";
import { CharacterDialog } from "../features/character-select/character-dialog";
import { CharacterList } from "../features/character-select/character-list";
import { useValidateCharacter } from "../features/character-select/use-validate-character";
import { useCompletedCharacters } from "../features/character-select/use-completed-characters";
import { TimerDisplay } from "../features/timer-display/timer-display";
import { useTimerDisplay } from "../features/timer-display/use-timer-display";
import { RoundsDisplay } from "../features/rounds-display/rounds-display";
import { useRoundsDisplay } from "../features/rounds-display/use-rounds-display";
import { useViewer } from "../features/viewer/use-viewer";
import { useDialog } from "../hooks/use-dialog";
import { getSelectedCoordinates } from "../utils/coordinates";
import { Flex, Skeleton } from "@radix-ui/themes";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();
  const { time, startTimer, endTimer } = useTimerDisplay();
  const { currentRound, totalRounds } = useRoundsDisplay();
  const { image, isLoading } = useViewer(currentRound);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    x: null,
    y: null,
  });

  const {
    isLoading: isValidateCharacterLoading,
    error: errorValidateCharacter,
    validate,
  } = useValidateCharacter();

  const { completed, addCompleted } = useCompletedCharacters();

  useEffect(() => {
    setGameRunning(true);
    startTimer();
  }, []);

  const handleValidate = async () => {
    const validatedId = await validate({
      coordinates: selectedCoordinates,
      characterId: selectedCharacter,
      illustrationId: image?.id,
    });

    if (validatedId) addCompleted(validatedId);

    closeDialog();
  };

  return (
    <>
      <Skeleton loading={isLoading}>
        <Viewer
          token={image?.imageToken}
          onClick={(event) => {
            setSelectedCoordinates(getSelectedCoordinates(event));
            openDialog();
          }}
        />
      </Skeleton>

      <Flex className="bg-red-500">
        <TimerDisplay time={time} />
        <RoundsDisplay currentRound={currentRound} totalRounds={totalRounds} />
      </Flex>

      <CharacterDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={handleValidate}
      >
        <CharacterList completed={completed} onSelect={setSelectedCharacter} />
      </CharacterDialog>
    </>
  );
};

export { Game };
