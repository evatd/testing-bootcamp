import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import waitForExpect from "wait-for-expect";

import configureStore from "../../../../store";
// see how we import Messages to isolate the component
// see export default, it includes redux wrapper. 
// Not included in the unit test. If we shallowed CompossedMessages, 
// it would be the outmost part
import ComposedMessages, { Messages, MessageBox, Message } from "./Messages";

// UNIT TEST - must use shallow
// Testing HOW the code works internally
describe("<Messages />", () => {
  it(`should send a message (unit test)`, async () => {
    const receiveMessage = jest.fn();
    // In this case you could also return `const api = {sendMessage: jest.fn()}`,
    // but in the test below (integration test) that approach does not work and you need to return a promise.
    // For simplicity we have used the same api implementation in both examples
    // Dependency injection with prop handling
    const api = {
      sendMessage: jest.fn(message => Promise.resolve(message))
    };
    const wrapper = shallow(
      <Messages receiveMessage={receiveMessage} api={api} username="Alex" />
    );
    // console.log(wrapper.debug());
    wrapper
      .find(MessageBox)
      .props()
      .onChange({ target: { value: "hi!" } });
    // Heads up! the following "await" works in this case because the code that handles the click returns a Promise.resolve,
    // it won't work if the code returns a pending promise waiting to be resolved or rejected.
    // Events don't return anything. Therefore the promise returned from sendMessage is not passed to this code.
    // It's better to use https://www.npmjs.com/package/wait-for-expect. Check the next test to see how to use it
    // Using await here: not to do with fetching here, it's to do with the button clicking.
    // As we don't know when the user will click
    // This is a hack, better is waitForExpect in test below
    await wrapper.find("button").simulate("click");

    // first send message, then receive message get called
    // 5. Assert the 'message was sent' ->
    // You can use toHaveBeenCalled on the my_mocked_api_object you passed.
    // toHaveBeenCalled needs a mock function https://jestjs.io/docs/en/mock-functions, is your sendMessage a mock?
    // You have an example here http://airbnb.io/enzyme/#shallow-rendering heads-up!
    // Enzyme expectations are not camel case,
    // Jest expectations are camel case (for when you copy&paste :)
    expect(api.sendMessage).toHaveBeenCalledWith({
      message: "hi!",
      to: "Alex"
    });
    expect(receiveMessage).toHaveBeenCalledWith({ message: "hi!", to: "Alex" });
  });

  // Final questions re this unit test:
  // - Is this black-box testing or white-box testing?
  //  Here it's white - light grey, as we're testing the internal strucutre - unit test.
  // - If I remove Redux from my application and put all the state in React, do I need to update this test?
  // If we remove Redux, we're removing ReceiveMessage as it's an action. Won't break.
  // We are testing Messages only, with a unit test and shallow rendering.
  // - What's your level of confidence that the user will be able to send a message?
  //  Lesser as we're unit testing, white testing,
  // });

  // INTEGRATION TEST - can be shallow and/or mount (behaviour, all children)
  // WHAT the code does, implementation - more fragile - more confidence?
  it(`should send a message (integration test)`, async () => {
    // Using mount, not shallow, as we want to test all the components, redux, lifecycle methods
    // ComposedMessages as we're testing how the partcles interact
    // If you mount the component then all the children are rendered. Hint: you need to provide a store.
    const store = configureStore();

    // 2  Mock the api. Hint, the api functions are passed as a defaultProp (look at the bottom of Messages.js),
    // you can override that prop by doing <Messages api={my_mocked_api_object} />
    const api = {
      sendMessage: jest.fn(message => Promise.resolve(message))
    };

    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <ComposedMessages api={api} username="Eva" />
        </Provider>
      </Router>
    );

    // Before message is added
    expect(wrapper.find(Message).length).toBe(0);

    // 3. Add some text to the input
    wrapper
      .find("input")
      .simulate("change", { target: { value: "hi there!" } });

    // 4. Find the button -> you have an example here http://airbnb.io/enzyme/#shallow-rendering
    wrapper.find("button").simulate("click");

    // 5. Click on the button -> you have an example here http://airbnb.io/enzyme/#shallow-rendering
    //  Heads-up! you need to use await on the click button. Or even better use https://www.npmjs.com/package/wait-for-expect
    await waitForExpect(() => {
      // Update() as we want to rerender
      // As we are checking the UI, so we want to rerender - to see if there a message
      wrapper.update();
      expect(wrapper.find(Message).length).toBe(1);
      expect(wrapper.find(Message).text()).toBe("hi there!");
    });
  });
});

// Final questions re this integ test:
// - Is this black-box testing or white-box testing?
// Black.
// - If I remove Redux from my application and put all the state in React, do I need to update this test?
// Yes, remove Store. More fragile. As testing what the code does, implementation, not how.
// - What's your level of confidence that the user will be able to send a message?
// This integration test gives more confidence as testing a few pieces together.
// We write unit tests to test units, their internal HOW. Creating mocks
// is more suitable for integ test than unit, as tesitng particles, implementation
// });
