import { SET_PATH } from '../constants/ActionTypes';

const initialState = {
  path: '/Users/phil/Downloads',
  content: [
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

let getDirectoryStructure = function (path) {
  return [
    {
      path: '/Users/phil/Downloads/.',
      size: 0,
      directory: true
    },
    {
      path: '/Users/phil/Downloads/..',
      size: 0,
      directory: true
    },
    {
      path: '/Users/phil/Downloads/new.txt',
      size: 123,
      directory: false
    }
  ];
};

export default function directory(state = initialState, action) {
  switch (action.type) {
  case SET_PATH:
    return Object.assign({}, state, {content: getDirectoryStructure(action.path), path: action.path})

  default:
    return state;
  }
}
