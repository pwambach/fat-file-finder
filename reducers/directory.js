import * as types from '../constants/ActionTypes';

const initialState = {
  path: '/Users/phil/Downloads',
  minSize: 10*1024*1024,
  files: [
    {
      path: '/Users/phil/Downloads/a.txt',
      size: 123,
      dir: false
    },
    {
      path: '/Users/phil/Downloads/page.pdf',
      size: 111234,
      dir: false
    },
    {
      path: '/Users/phil/Downloads/another_directory',
      size: 0,
      dir: true
    }
  ]
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case types.START_WALK_TREE:
      return Object.assign({}, state, {path: action.path})
    case types.SUCCESS_WALK_TREE:
      return Object.assign({}, state, {files: action.files})
    case types.ERROR_WALK_TREE:
      console.error(action.error);
      return state;
    case types.SET_MIN_SIZE:
      return Object.assign({}, state, {minSize: action.minSize});

  default:
    return state;
  }
}
