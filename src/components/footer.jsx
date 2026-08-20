import { Flex, Box, Text } from "@radix-ui/themes";
import Logo from "../assets/logos/wheres-wally-logo.png";

const Footer = () => {
  return (
    <Box p={"4"} className="bg-white shadow-xl">
      <footer>
        <Flex align={"center"} gap={"4"}>
          <img src={Logo} alt="wheres wally logo" className="max-h-10" />
        </Flex>
      </footer>
    </Box>
  );
};

export default Footer;
