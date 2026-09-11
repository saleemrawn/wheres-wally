import { useState } from "react";
import {
  Flex,
  Button,
  TextField,
  Heading,
  Text,
  Callout,
} from "@radix-ui/themes";
import { Form } from "radix-ui";

const LeaderboardForm = ({ errors, onSubmit, onResetErrors }) => {
  const [name, setName] = useState("");

  return (
    <Form.Root
      onSubmit={(event) => {
        event.preventDefault();
        onResetErrors();
        onSubmit(name);
      }}
      onClearServerErrors={onResetErrors}
      className="bg-gray-200 p-10 rounded-3xl"
    >
      <Flex direction={"column"} gap={"6"}>
        <Heading as="h2" className="text-center">
          ...and made the top 10 fastest times!
        </Heading>

        {errors ? (
          <Flex direction={"column"} gap={"3"}>
            {errors.map((err) => {
              return (
                <Callout.Root color="red" size={"1"} key={err.msg}>
                  <Callout.Text>{err.msg}</Callout.Text>
                </Callout.Root>
              );
            })}
          </Flex>
        ) : null}

        <Form.Field name="name" serverInvalid={Boolean(errors)}>
          <Flex direction={"column"} gap={"2"} align={"center"}>
            <Form.Label className="text-center">
              Enter your name, nickname or initials
            </Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your name
            </Form.Message>
            <Form.Control asChild>
              <TextField.Root
                size="3"
                className="w-full"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  onResetErrors();
                }}
                required
              />
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
