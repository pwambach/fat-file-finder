import * as types from '../constants/ActionTypes';

export function setPath(path) {
  return { type: types.SET_PATH, path };
}
