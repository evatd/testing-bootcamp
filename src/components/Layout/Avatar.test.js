import React from "react";
import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Avatar from "./Avatar";

// TASK 1: configure the Enzyme adapter. Hint https://airbnb.io/enzyme/
// Enzyme.configure({ adapter: new Adapter() });
// We then set it up in package.json
describe("<Avatar />", () => {
  it("renders Avatar", () => {
    // You can use console.log(wrapper.debug()) to console.log the component that you are testing
    // console.log(wrapper.debug()) //  <styled.img size="medium" src="/images/undefined_lg.jpg" alt="undefined" />

    // TASK 2: Shallow the Avatar component
    // Hint:  https://github.com/adriantoine/enzyme-to-json#helper
    // add username as it's a required propType, otherwise you get a warning
    const wrapper = shallow(<Avatar username="Eva"/>);

    // TASK 3: Create the snapshot
    // toJson creates a more readable serialised output
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
