import { Dialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";

const CharacterDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="max-w-240! p-10!">
        <Flex justify={"between"}>
          <Dialog.Title size={"8"}>Select character</Dialog.Title>
          <Dialog.Close>
            <Button
              className="w-10! h-10! p-0! shadow-none! focus-visible:outline-transparent!"
              variant="outline"
              color={"gray"}
              onClick={onClose}
            >
              <X />
            </Button>
          </Dialog.Close>
        </Flex>

        <Dialog.Description mb={"4"}>
          Pick a character to check if your selection is correct:
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CharacterDialog;
