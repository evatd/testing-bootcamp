import { toggleMessageDetail, TOGGLE_MESSAGE_DETAIL } from "../actions/ui";

import uiReducer, { getInitialState } from "./ui";

describe("UI reducer", () => {
  it(`should return the default state if no state is provided`, () => {
    const actualState = uiReducer(undefined, { type: "NO_RELEVANT_ACTION" });
    const expectedState = getInitialState();

    // add a snapshot test
    // can add tests inside of tests
    // can we snapshot state and does that increase our confidence?
    // no, as logic there, esp below: TOGGLE_MESSAGE_DETAIL
    // expect(actualState).toMatchSnapshot();
    expect(actualState).toEqual(expectedState);
  });

  it(`should return a new state if it receives a ${TOGGLE_MESSAGE_DETAIL} action`, () => {
    const actualState = uiReducer(undefined, toggleMessageDetail());
    const expectedState = getInitialState();
    expectedState.isMessageDetailOpen = true;

    expect(actualState).toEqual(expectedState);
  });

  it(`should return the current state if the action it receives it's not handled by the reducer`, () => {
    const expectedState = getInitialState();
    expectedState.isMessageDetailOpen = true;
    const actualState = uiReducer(expectedState, {
      type: "NO_RELEVANT_ACTION"
    });

    expect(actualState).toEqual(expectedState);
  });
});
