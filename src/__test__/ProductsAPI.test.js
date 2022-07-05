import App from "../App";
import { shallow, mount } from "enzyme";
import { useColorMode } from "@chakra-ui/react";
import Products from "../components/Products";
import { withHooks } from "jest-react-hooks-shallow";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createWaitForElement } from "enzyme-wait";

// <-- simple mock react-query -->
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
// jest.mock("react-query");

// <-- use spyOn for mock
// import * as ReactQuery from "react-query";

const server = setupServer();

let mockData = [
  {
    id: 1,
    attributes: {
      product: "from enzyme",
      createdAt: "2022-06-29T06:38:10.456Z",
      updatedAt: "2022-06-29T06:42:50.763Z",
      publishedAt: "2022-06-29T06:42:50.761Z",
    },
  },
];

describe("Products", () => {
  let toggleColorModeMock = jest.fn();
  // let useQuery = jest.spyOn(ReactQuery, "useQuery");
  // let QueryClientProvider = jest.spyOn(ReactQuery, "QueryClientProvider");
  // let QueryClient = jest.spyOn(ReactQuery, "QueryClient");
  let queryClient = new QueryClient();
  let wrapper;

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  beforeEach(() => {
    // <-- mock declaration -->
    useColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: toggleColorModeMock,
    });

    wrapper = mount(
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    );
  });

  afterAll(() => {
    server.close();
  });

  it("when mounted api call", async () => {
    const waitForList = createWaitForElement("div");
    server.use(
      rest.get("http://localhost:1337/api/products", (req, res, ctx) => {
        console.log("testing");
        return res(ctx.json(mockData));
      })
    );
    const componentReady = await waitForList(wrapper);
    console.log(componentReady.debug());
  });
});
