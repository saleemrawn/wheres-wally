import { useEffect, useState, useRef } from "react";
import { useGameStateUpdate } from "../context/game-state";
import { Viewer } from "../features/viewer/viewer";
import { CharacterDialog } from "../features/character/character-dialog";
import { CharacterList } from "../features/character/character-list";
import { useCharacters } from "../features/character/use-characters";
import { useValidateCharacter } from "../features/character/use-validate-character";
import { useCompletedCharacters } from "../features/character/use-completed-characters";
import { TimerDisplay } from "../features/timer-display/timer-display";
import { useTimerDisplay } from "../features/timer-display/use-timer-display";
import { RoundDisplay } from "../features/round/round-display";
import { useRoundDisplay } from "../features/round/use-round-display";
import { RoundCompleteDialog } from "../features/round/round-complete-dialog";
import { useViewer } from "../features/viewer/use-viewer";
import { useDialog } from "../hooks/use-dialog";
import { getSelectedCoordinates } from "../utils/coordinates";
import { Flex, Skeleton } from "@radix-ui/themes";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();
  const { time, startTimer, endTimer } = useTimerDisplay();
  const { currentRound, totalRounds, incrementCurrentRound } =
    useRoundDisplay();
  const { image, isLoading, nextImage } = useViewer(currentRound);

  const {
    isOpen: isCharacterDialogOpen,
    openDialog: openCharacterDialog,
    closeDialog: closeCharacterDialog,
  } = useDialog();

  const {
    isOpen: isRoundCompleteDialogOpen,
    openDialog: openRoundCompleteDialog,
    closeDialog: closeRoundCompleteDialog,
  } = useDialog();

  const {
    characters,
    isLoading: isCharactersLoading,
    error: charactersError,
    getCharacterCount,
  } = useCharacters();

  const {
    isLoading: isValidateCharacterLoading,
    error: errorValidateCharacter,
    validate,
  } = useValidateCharacter();

  const { completedIds, addCompletedId, resetCompletedIds } =
    useCompletedCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    x: null,
    y: null,
  });

  const timeoutRef = useRef(null);

  useEffect(() => {
    setGameRunning(true);
    startTimer();
  }, []);

  useEffect(() => {
    handleRoundCheck();
  }, [completedIds]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleValidate = async () => {
    const validatedId = await validate({
      coordinates: selectedCoordinates,
      characterId: selectedCharacter,
      illustrationId: image?.id,
    });

    if (validatedId) addCompletedId(validatedId);

    closeCharacterDialog();
  };

  const handleRoundCheck = () => {
    if (completedIds.size === 5 && currentRound !== totalRounds) {
      openRoundCompleteDialog();
    }
  };

  const handleNextRound = () => {
    closeRoundCompleteDialog();

    timeoutRef.current = setTimeout(() => {
      incrementCurrentRound();
      nextImage();
      resetCompletedIds();
    }, 300);
  };

  return (
    <>
      <Skeleton loading={isLoading}>
        <Viewer
          token={image?.imageToken}
          onClick={(event) => {
            setSelectedCoordinates(getSelectedCoordinates(event));
            openCharacterDialog();
          }}
        />
      </Skeleton>

      <Flex className="bg-red-500">
        <TimerDisplay time={time} />
        <RoundDisplay currentRound={currentRound} totalRounds={totalRounds} />
      </Flex>

      <CharacterDialog
        isOpen={isCharacterDialogOpen}
        onClose={closeCharacterDialog}
        onSubmit={handleValidate}
      >
        <CharacterList
          characters={characters}
          completedIds={completedIds}
          onSelect={setSelectedCharacter}
        />
      </CharacterDialog>

      <RoundCompleteDialog
        isOpen={isRoundCompleteDialogOpen}
        currentRound={currentRound}
        onNextRound={handleNextRound}
      />
    </>
  );
};

export { Game };
