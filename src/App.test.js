// import { render, screen } from '@testing-library/react';
import App from "./App";
import { shallow } from "enzyme";

describe("App", () => {
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = shallow(<App />);
  // });

  test("render", () => {
    const component = shallow(<App />);
    console.log(component.debug());

    expect(component).toMatchSnapshot();
  });

  // it("render div", () => {
  //   const element = wrapper.find("div").exists();
  //   expect(element).toBe(true);
  // });

  // it("render <a>", () => {
  //   const element = wrapper.find("a");
  //   expect(element).toHaveLength(1);
  // });

  // it("render img", () => {
  //   const element = wrapper.find("img");
  //   expect(element).toHaveLength(1);
  // });
});
