import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userSlice from "./slice/userSlice";
import roomsSlice from "./slice/roomsSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    rooms: roomsSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    // whitelist: ["user"],
    // stateReconciler: hardSet,
};
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
