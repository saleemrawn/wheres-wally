import { Flex, Button, TextField, Heading, Text } from "@radix-ui/themes";
import { Form } from "radix-ui";

const LeaderboardForm = ({ onSubmit }) => {
  return (
    <Form.Root
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="bg-gray-200 p-10 rounded-3xl"
    >
      <Flex direction={"column"} gap={"6"}>
        <Heading as="h2" className="text-center">
          ...and made the top 10 fastest times!
        </Heading>
        <Form.Field name="name">
          <Flex direction={"column"} gap={"2"} align={"center"}>
            <Form.Label className="text-center">
              Enter your name, nickname or initials
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your name
            </Form.Message>
            <Form.Control asChild>
              <TextField.Root size="3" className="w-full" required />
            </Form.Control>
          </Flex>
        </Form.Field>
      </Flex>
      <Form.Submit asChild>
        <Flex justify={"center"}>
          <Button type={"submit"} size={"3"} mt={"4"}>
            Add to Leaderboard
          </Button>
        </Flex>
      </Form.Submit>
    </Form.Root>
  );
};

export { LeaderboardForm };
