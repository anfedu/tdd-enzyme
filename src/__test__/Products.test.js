import { shallow, mount } from "enzyme";
import { useColorMode } from "@chakra-ui/react";
import Products from "../components/Products";
import { withHooks } from "jest-react-hooks-shallow";

// <-- simple mock react-query -->
import { useQuery } from "react-query";
jest.mock("react-query");

// <-- use spyOn for mock
// import * as ReactQuery from "react-query";

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
  let wrapper;

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
});
