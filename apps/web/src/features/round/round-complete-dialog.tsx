import { Dialog, Button } from "@radix-ui/themes";

interface RoundCompleteDialogProps {
  isOpen: boolean;
  currentRound: number;
  onNextRound: () => void;
}

const RoundCompleteDialog = ({
  isOpen,
  currentRound,
  onNextRound,
}: RoundCompleteDialogProps) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="flex flex-col items-center gap-3 max-w-96! p-10!">
        <Dialog.Title size={"8"}>Round {currentRound} Complete!</Dialog.Title>
        <Button onClick={onNextRound} size={"4"} className="bg-green-600!">
          Next Round
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { RoundCompleteDialog };
