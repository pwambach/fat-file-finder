import * as types from '../constants/ActionTypes';
import { emitter } from '../emitters/emitter';
var promiseWalk = require ('../utils/PromiseWalker');

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

// function progress_walk_tree(count) {
//   return {
//     type: types.PROGRESS_WALK_TREE,
//     loadedFiles: count
//   };
// }

function emitUpdate(count){
  emitter.emit('updateLoadedFiles', count);
}


function getFilesAsync(dispatch, path){
  dispatch(start_walk_tree(path));

  return promiseWalk(path, (count) => emitUpdate(count), 100)
    .then(
      files => dispatch(success_walk_tree(files)),
      error => dispatch(error_walk_tree(error))
    );
}

export function updateTree(path) {
  return function(dispatch){
    return getFilesAsync(dispatch, path);
  }
}

export function rewindTree() {
  return function(dispatch, getState){
    let path = getState().directory.lastPaths.pop();
    if(path){
      return getFilesAsync(dispatch, path);
    } else {
      return false;
    }
  }
}

export function setMinSize(minSize) {
  return {type: types.SET_MIN_SIZE, minSize: minSize};
}
