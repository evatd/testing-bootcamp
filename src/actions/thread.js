export const RECEIVE_THREAD = "RECEIVE_THREAD";

// just a function that returns an object 
export const receiveThread = thread => ({
  type: RECEIVE_THREAD,
  thread
});
