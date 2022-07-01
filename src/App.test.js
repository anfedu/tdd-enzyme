import App from "./App";
import { shallow, mount } from "enzyme";
import { useColorMode } from "@chakra-ui/react";
import Products from "./components/Products";
import { withHooks } from "jest-react-hooks-shallow";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createWaitForElement } from "enzyme-wait";

// <-- simple mock react-query -->
// import { useQuery } from "react-query";
// jest.mock("react-query");

// <-- use spyOn for mock
import * as ReactQuery from "react-query";

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

// describe("App", () => {
//   let wrapper;
//   let toggleColorModeMock = jest.fn();
//   beforeEach(() => {
//     // <-- wrapper component -->
//     wrapper = shallow(<App />);
//   });

//   // <-- snap and check changed file -->
//   it("render", () => {
//     expect(wrapper).toMatchSnapshot();
//   });
// });

describe("Products", () => {
  let toggleColorModeMock = jest.fn();
  let useQuery = jest.spyOn(ReactQuery, "useQuery");
  let QueryClientProvider = jest.spyOn(ReactQuery, "QueryClientProvider");
  let QueryClient = jest.spyOn(ReactQuery, "QueryClient");
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

    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    // wrapper = mount(
    //   <QueryClientProvider client={new QueryClient()}>
    //     <Products />
    //   </QueryClientProvider>
    // );
  });

  afterAll(() => {
    server.close();
  });

  it("render snapshot", () => {
    const component = shallow(<Products />);
    expect(component).toMatchSnapshot();
  });

  it("isLoading true", () => {
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });
    const component = shallow(<Products />);
    expect(component.exists()).toBe(true);
  });

  it("error", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      error: "Error",
      data: null,
    });
    const component = shallow(<Products />);
    expect(component.exists()).toBe(true);
  });

  it("Lists component", () => {
    const component = shallow(<Products />);
    const listsElement = component.find("[role='lists']").exists();
    expect(listsElement).toBe(true);
  });

  it("dark mode", () => {
    const component = shallow(<Products />);
    const iconProps = component.find("[role='iconButton']").props();
    expect(iconProps.icon.type).toBe("SunIcon");

    iconProps.onClick();
    expect(toggleColorModeMock).toHaveBeenCalled();
  });

  it("light mode", () => {
    useColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: toggleColorModeMock,
    });
    const component = shallow(<Products />);
    const iconProps = component.find("[role='iconButton']").props();
    expect(iconProps.icon.type).toBe("MoonIcon");

    iconProps.onClick();
    expect(toggleColorModeMock).toHaveBeenCalled();
  });

  it("when data render", () => {
    const component = shallow(<Products />);
    expect(component).toMatchSnapshot();
  });

  it("when mounted api call", () => {
    useQuery.mockRestore();
    const waitForList = createWaitForElement("#element");
    server.use(
      rest.get("http://localhost:1337/api/products", (req, res, ctx) => {
        console.log("testing");
        return res(ctx.json(mockData));
      })
    );
    const component = shallow(<Products />);
    waitForList(component).then((component) => {
      console.log("testing");
    });
  });
});
