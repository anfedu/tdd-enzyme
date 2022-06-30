import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import enableHooks from "jest-react-hooks-shallow";
import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react";
const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js",
};
copyProps(window, global);

Enzyme.configure({ adapter: new Adapter() });

// pass an instance of jest to `enableHooks()`
// enableHooks(jest, { dontMockByDefault: true });
enableHooks(jest);

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
jest.mock("axios", () => {
  return {
    axios: jest.fn(),
  };
});
