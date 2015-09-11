import * as types from '../constants/ActionTypes';
var promiseWalk = require ('../utils/PromiseWalker');

function setPath(path) {
  return { type: types.SET_PATH, path };
}

function start_walk_tree(path) {
  return { type: types.START_WALK_TREE, path };
}

function success_walk_tree(files) {
  return {
    type: types.SUCCESS_WALK_TREE,
    files: files.sort( (a,b) => b.size-a.size),
    receivedAt: Date.now() };
}

function error_walk_tree(error) {
  return { type: types.ERROR_WALK_TREE, error: error };
}

export function updateTree(path) {
  return function(dispatch){
    dispatch(start_walk_tree(path));

    return promiseWalk(path)
      .then(
        files => dispatch(success_walk_tree(files)),
        error => dispatch(error_walk_tree(error))
      );
  }
}

export function setMinSize(minSize) {
  return {type: types.SET_MIN_SIZE, minSize: minSize};
}
