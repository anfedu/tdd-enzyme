import App from "./App";
import { shallow } from "enzyme";
import { useColorMode } from "@chakra-ui/react";

jest.mock("@chakra-ui/icons", () => {
  return {
    SunIcon: "SunIcon",
    MoonIcon: "MoonIcon",
  };
});
jest.mock("@chakra-ui/react", () => {
  return {
    Box: "Box",
    Button: "Button",
    IconButton: "IconButton",
    useColorMode: jest.fn(),
  };
});

describe("App", () => {
  let wrapper;
  let toggleColorModeMock = jest.fn();
  beforeEach(() => {
    // <-- must declare first -->
    useColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: toggleColorModeMock,
    });

    // <-- must last declare -->
    wrapper = shallow(<App />);
  });

  // <-- snap and check changed file -->
  it("render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // <-- check existing elements -->
  it("Lists component", () => {
    const listsElement = wrapper.find("[role='lists']").exists();
    expect(listsElement).toBe(true);
  });

  // <-- check props -->
  it("List component", () => {
    const listElement = wrapper.find("[roleId='list-0']").props();
    expect(listElement.item.person).toBe("Nuril");
  });

  it("When app on dark mode, component should render properly", () => {
    const iconProps = wrapper.find("[role='iconButton']").props();
    expect(iconProps.icon.type).toBe("SunIcon");

    iconProps.onClick();
    expect(toggleColorModeMock).toHaveBeenCalled();
  });

  // it("When app on light mode, component should render properly", () => {
  //   const iconProps = wrapper.find("[role='iconButton']").props();
  //   expect(iconProps.icon.type).toBe("MoonIcon");

  //   iconProps.onClick();
  //   expect(toggleColorModeMock).toHaveBeenCalled();
  // });
});
