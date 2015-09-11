import * as types from '../constants/ActionTypes';
var promiseWalk = require ('../utils/PromiseWalker');

function setPath(path) {
  return { type: types.SET_PATH, path };
}

function start_walk_tree() {
  return { type: types.START_WALK_TREE };
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

export function updateTree(path, minSize = 0) {
  return function(dispatch){
    dispatch(setPath(path));
    dispatch(start_walk_tree());

    return promiseWalk(path)
      .then(files => files.filter( file => file.size > minSize ))
      .then(
        files => dispatch(success_walk_tree(files)),
        () => dispatch(error_walk_tree(error))
      );
  }
}
