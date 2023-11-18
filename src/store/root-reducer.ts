import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { videoSlice } from './video-slice/video-slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: videoSlice.reducer,
});
