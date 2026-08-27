import { useLeaderboard } from "./use-leaderboard";
import { getOrdinalSuffix } from "../../utils/number";
import { Container, Heading, Table, Flex, Skeleton } from "@radix-ui/themes";

const LeaderboardList = () => {
  const { leaderboard, isLoading, error } = useLeaderboard();

  return (
    <Skeleton loading={isLoading}>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Pos.</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {leaderboard.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={"3"}>
                No players yet — be the first!
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ) : (
            leaderboard.map((player, index) => (
              <Table.Row key={player?.id}>
                <Table.Cell>{getOrdinalSuffix(index + 1)}</Table.Cell>
                <Table.Cell>{player?.name}</Table.Cell>
                <Table.Cell>{player?.time}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Skeleton>
  );
};

const Leaderboard = () => {
  return (
    <>
      <Container
        mt={"8"}
        ml={{ initial: "4", md: "0" }}
        mr={{ initial: "4", md: "0" }}
        mb={{ initial: "8", md: "0" }}
      >
        <Flex
          direction={"column"}
          gap={"4"}
          p={"8"}
          className="bg-white rounded-4xl shadow-xl"
        >
          <Heading size={"8"}>Leaderboard</Heading>
          <LeaderboardList />
        </Flex>
      </Container>
    </>
  );
};

export default Leaderboard;
