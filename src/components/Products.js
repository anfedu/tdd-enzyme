import React from "react";
import { useColorMode, Box, Button, IconButton } from "@chakra-ui/react";
import Lists from "./Lists";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useQuery } from "react-query";

export default function Products() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, isLoading, error } = useQuery(
    "products",
    () => {
      return axios.get("http://localhost:1337/api/products");
    },
    { select: (result) => result.data.data }
  );

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <>Error!</>;

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
        {data.map((item, key) => (
          <div key={key}>
            <Lists role={`lists`} roleId={`list-${key}`} item={item} />
          </div>
        ))}
      </div>
    </Box>
  );
}
