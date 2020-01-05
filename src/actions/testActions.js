export const TEST_ACTION = 'TEST_ACTION';
export const testAction = (store, getState) => (dispatch) => {
  console.log(store, getState);
  dispatch({
    type: TEST_ACTION,
    payload: 'test23',
  });
};
