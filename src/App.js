import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Products from "./components/Products";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
    </QueryClientProvider>
  );
}

export default App;
