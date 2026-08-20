import { useState } from "react";
import { Link } from "react-router";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logos/logo-text-only.png";

const LogoLink = () => {
  return (
    <Link to={"/"}>
      <img src={Logo} alt="wheres wally" className="max-h-15" />
    </Link>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 1, urlPath: "/", text: "How to play?" },
    { id: 2, urlPath: "/leaderboard", text: "Leaderboard" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav>
      <Flex
        align={"center"}
        gap={"4"}
        display={{ initial: "none", lg: "flex" }}
      >
        {links.map((link) => (
          <Button key={link.id} variant={"solid"} size={"3"} asChild>
            <Link to={link.urlPath}>{link.text}</Link>
          </Button>
        ))}
      </Flex>

      {isOpen ? (
        <>
          <Box display={{ initial: "flex", lg: "none" }}>
            <Button variant="outline" size={"3"} mb={"1"} onClick={toggleMenu}>
              <X size={24} strokeWidth={1} />
            </Button>
          </Box>

          <Flex
            direction={"column"}
            gap={"4"}
            display={{ initial: "flex", lg: "none" }}
            className="absolute top-23 left-0 w-full h-screen bg-white p-6 z-1"
          >
            {links.map((link) => (
              <Button
                key={link.id}
                variant={"solid"}
                size={"4"}
                onClick={toggleMenu}
                asChild
              >
                <Link to={link.urlPath}>{link.text}</Link>
              </Button>
            ))}
          </Flex>
        </>
      ) : (
        <Box display={{ initial: "flex", lg: "none" }}>
          <Button variant="outline" size={"3"} mb={"1"} onClick={toggleMenu}>
            <Menu size={24} strokeWidth={1} />
          </Button>
        </Box>
      )}
    </nav>
  );
};

const Header = () => {
  return (
    <header class="bg-white shadow-xl z-1">
      <Flex justify={"between"} align={"center"} p={"4"}>
        <LogoLink />
        <Nav />
      </Flex>
    </header>
  );
};

export default Header;
