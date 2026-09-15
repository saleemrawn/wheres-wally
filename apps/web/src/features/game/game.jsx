import { useEffect, useState, useRef } from "react";
import { useGameStateUpdate } from "../../context/game-state";
import { Viewer } from "../viewer/viewer";
import { CharacterDialog } from "../character/character-dialog";
import { CharacterList } from "../character/character-list";
import { useCharacters } from "../character/use-characters";
import { useValidateCharacter } from "../character/use-validate-character";
import { useCompletedCharacters } from "../character/use-completed-characters";
import { TimerDisplay } from "../timer-display/timer-display";
import { useTimerDisplay } from "../timer-display/use-timer-display";
import { RoundDisplay } from "../round/round-display";
import { useRoundDisplay } from "../round/use-round-display";
import { RoundCompleteDialog } from "../round/round-complete-dialog";
import { GameCompleteDialog } from "./game-complete-dialog";
import { LeaderboardForm } from "../leaderboard/leaderboard-form";
import { useCheckTopTenTime } from "../leaderboard/use-check-top-ten-time";
import { useAddLeaderboardTime } from "../leaderboard/use-add-leaderboard-time";
import { useViewer } from "../viewer/use-viewer";
import { useDialog } from "../../hooks/use-dialog";
import { useViewerTransform } from "../viewer/use-viewer-transform";
import { Flex, Skeleton } from "@radix-ui/themes";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();
  const { time, startTimer, endTimer, resetTimer } = useTimerDisplay();

  const {
    currentRound,
    totalRounds,
    incrementCurrentRound,
    resetCurrentRound,
  } = useRoundDisplay();

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
    isOpen: isGameCompleteDialogOpen,
    openDialog: openGameCompleteDialog,
    closeDialog: closeGameCompleteDialog,
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

  const {
    isLoading: isAddLeaderboardTimeLoading,
    error: addLeaderboardTimeError,
    addLeaderboardTime,
    resetError,
  } = useAddLeaderboardTime();

  const {
    isTopTen,
    isLoading: isCheckTopTenLoading,
    error: checkTopTenError,
    checkWithinTopTen,
  } = useCheckTopTenTime();

  const { transformRef, resetViewer } = useViewerTransform();

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    x: null,
    y: null,
  });

  const totalCharacters = getCharacterCount();
  const timeoutRef = useRef(null);

  useEffect(() => {
    setGameRunning(true);
    startTimer();
  }, []);

  useEffect(() => {
    if (!totalCharacters || completedIds.size !== totalCharacters) return;

    if (currentRound === totalRounds) {
      endTimer();
      checkWithinTopTen(time.total);
      openGameCompleteDialog();
    } else {
      openRoundCompleteDialog();
      resetViewer();
    }
  }, [completedIds, currentRound]);

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

  const handleNextRound = () => {
    closeRoundCompleteDialog();

    timeoutRef.current = setTimeout(() => {
      incrementCurrentRound();
      nextImage();
      resetCompletedIds();
    }, 300);
  };

  const handlePlayAgain = () => {
    resetCompletedIds();
    resetCurrentRound();
    resetTimer();
    closeGameCompleteDialog();
    startTimer();
  };

  const handleLeaderboardSubmit = async (name) => {
    await addLeaderboardTime({ name, time: time.total });
  };

  return (
    <>
      <Flex className="bg-blue-400 py-1  md:py-2">
        <TimerDisplay time={time} />
        <RoundDisplay currentRound={currentRound} totalRounds={totalRounds} />
      </Flex>

      <Skeleton loading={isLoading}>
        <Viewer
          token={image?.imageToken}
          ref={transformRef}
          onClick={(event) => {
            setSelectedCoordinates(event);
            openCharacterDialog();
          }}
        />
      </Skeleton>

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

      <GameCompleteDialog
        isOpen={isGameCompleteDialogOpen}
        finishTime={time}
        onPlayAgain={handlePlayAgain}
      >
        {isTopTen ? (
          <LeaderboardForm
            errors={addLeaderboardTimeError?.errors}
            onSubmit={handleLeaderboardSubmit}
            onResetErrors={resetError}
          />
        ) : null}
      </GameCompleteDialog>
    </>
  );
};

export { Game };
