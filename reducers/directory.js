import { SET_PATH, SUCCESS_WALK_TREE } from '../constants/ActionTypes';

const initialState = {
  path: '/Users/phil/Downloads/sample',
  files: [
    {
      path: '/Users/phil/Downloads/a.txt',
      size: 123,
      directory: false
    },
    {
      path: '/Users/phil/Downloads/page.pdf',
      size: 234,
      directory: false
    },
    {
      path: '/Users/phil/Downloads/another_directory',
      size: 0,
      directory: true
    }
  ]
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case SET_PATH:
      return Object.assign({}, state, {path: action.path})
    case SUCCESS_WALK_TREE:
      return Object.assign({}, state, {files: action.files})

  default:
    return state;
  }
}
