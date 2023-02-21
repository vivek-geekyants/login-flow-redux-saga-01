import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import types from "../../utils/actionTypes";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserLoggedIn {
  name: string;
  email: string;
}
interface UserLoggedInObject {
  userVariable: UserLoggedIn;
}

const defaultUserState: UserLoggedInObject = {
  userVariable: {
    name: "",
    email: "",
  },
};

const reduceUsers = (
  state = defaultUserState || { name: "", email: "" },
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        userVariable: { ...action.payload },
      };

    case types.LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        userVariable: { ...action.payload },
      };

    default:
      return state;
  }
};

//rootreducer
const rootReducer = combineReducers({ reduceUsers });
export default rootReducer;

//saga-middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancer = applyMiddleware(...middleware);

//store
const persistConfig = {
  key: "persist-key",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(enhancer)
);
sagaMiddleware.run(watcherSaga);
export const persistor = persistStore(store);
