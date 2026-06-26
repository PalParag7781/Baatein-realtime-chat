import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice.js"
import messageReducer from "./slice/message/messageSlice.js"
import socketReducer from "./slice/Socket/socket.slice.js"
import { persistStore, persistReducer } from "redux-persist";


import storageEngine from "redux-persist/lib/storage";


const storage = storageEngine.default || storageEngine;

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["userProfile"],
};

const persistedUserReducer = persistReducer(
    persistConfig,
    userReducer
);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        message: messageReducer,
        socket: socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);