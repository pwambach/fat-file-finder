import * as types from '../constants/ActionTypes';
import { emitter } from '../emitters/emitter';
var promiseWalk = require ('../utils/PromiseWalker');

function startWalkTree(path) {
  return { type: types.START_WALK_TREE, path };
}

function successWalkTree(files) {
  return {
    type: types.SUCCESS_WALK_TREE,
    files: files.sort( (a,b) => b.size-a.size),
    receivedAt: Date.now() };
}

function errorWalkTree(error) {
  return { type: types.ERROR_WALK_TREE, error: error };
}

function progressWalkTree(count) {
  return {
    type: types.PROGRESS_WALK_TREE,
    loadedFiles: count
  };
}

function getFilesAsync(dispatch, path){
  dispatch(startWalkTree(path));

  return promiseWalk(path, (count) => dispatch(progressWalkTree(count)), 100)
    .then(
      files => dispatch(successWalkTree(files)),
      error => dispatch(errorWalkTree(error))
    );
}

export function updateTree(path) {
  return function(dispatch, getState){
    //do nothing if the path did not change
    if(path === getState().directory.path){
      return false;
    }
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
