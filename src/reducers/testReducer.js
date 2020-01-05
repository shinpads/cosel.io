import { TEST_ACTION } from '../actions/testActions';

const initalState = {
  test: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  }
};
