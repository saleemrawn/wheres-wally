import { Dialog, Button, Flex } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { X } from "lucide-react";

const CharacterDialog = ({ isOpen, onClose, onSubmit, children }) => {
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

        <Form.Root
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Form.Field name="character" className="mb-4">
            {children}
          </Form.Field>

          <Form.Submit asChild>
            <Button size={"3"} radius={"full"}>
              Submit
            </Button>
          </Form.Submit>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { CharacterDialog };
