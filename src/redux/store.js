import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import sideReducer from "./sideReducer";
import personReducer from "./personReducer";
import accountReducer from "./accountReducer";
import activeChatReducer from "./activeChatReducer";
import createGroupReducer from "./createGroupReducer";
import notificationReducer from "./notificationReducer";
import updateChats from "./updateChats";
import notificationBarReducer from "./notificationBarReducer";
import warningReducer from "./warningReducer";
const persistConfig = {
  key: "projectshare:root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sideReducer,
  personbar: personReducer,
  accountbar: accountReducer,
  activechat: activeChatReducer,
  creategroup: createGroupReducer,
  updatechats: updateChats,
  notification: notificationReducer,
  notificationbar: notificationBarReducer,
  warning: warningReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
