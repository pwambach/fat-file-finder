import * as types from '../constants/ActionTypes';

const initialState = {
  lastPaths: [],
  path: null,
  minSize: 50*1024*1024,
  loading: false,
  loadedFiles: 0,
  error: false,
  files: []
};

export default function directory(state = initialState, action) {
  switch (action.type) {
    case types.START_WALK_TREE:
      let lastPaths;
      if(state.lastPaths[state.lastPaths.length-1] === action.path){
        state.lastPaths.pop();
        lastPaths = [...state.lastPaths];
      } else {
        lastPaths = [...state.lastPaths, state.path];
      }
      return Object.assign({}, state, {loading: true, loadedFiles: 0, path: action.path, lastPaths: lastPaths});

    case types.SUCCESS_WALK_TREE:
      return Object.assign({}, state, {loading: false, error: false, files: action.files});

    case types.ERROR_WALK_TREE:
      console.log(action.error);
      return Object.assign({}, state, {loading: false, error: true});

    case types.PROGRESS_WALK_TREE:
      return Object.assign({}, state, {loadedFiles: action.loadedFiles});

    case types.SET_MIN_SIZE:
      return Object.assign({}, state, {minSize: action.minSize});


  default:
    return state;
  }
}
