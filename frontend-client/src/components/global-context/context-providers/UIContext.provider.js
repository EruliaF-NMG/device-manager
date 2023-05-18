/*
 * @Author: Nisal Madusanka(EruliaF)
 * @Date: 2020-03-21 09:57:06
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2021-03-09 12:13:46
 */

import React, { createContext, useReducer } from 'react';

import { uiAction } from '../actions/uiContext.actions';
import {
    setPageLoaderKey,
} from '../../../configs/actionKeys.config';

const initialState = {
  setPageLoader: false,
};

const UIContext = createContext({});

const uiReducer = (state, action) => {
  switch (action.type) {
    case setPageLoaderKey:
      return {
        ...state,
        setPageLoader: action.playload,
      };
    default:
      return state;
  }
};

const UIContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const dispatchFunction = uiAction(dispatch);
  return (
    <UIContext.Provider value={[state, dispatchFunction]}>
      {children}
    </UIContext.Provider>
  );
};

export { UIContext, UIContextProvider };