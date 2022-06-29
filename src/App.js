import React from "react";
import { useColorMode, Box, Button, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Lists from "./components/Lists";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const people = [
    { person: "Nuril" },
    { person: "Rizqi" },
    { person: "Imroatul" },
    { person: "Amalia" },
  ];

  return (
    <Box className="h-[100vh] flex justify-center items-center gap-x-5">
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? "dark" : "light"} mode
      </Button>
      <IconButton
        role="iconButton"
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      />
      <div>
        {people.map((item, key) => (
          <div key={key}>
            <Lists role={`lists`} roleId={`list-${key}`} item={item} />
          </div>
        ))}
      </div>
    </Box>
  );
}

export default App;
