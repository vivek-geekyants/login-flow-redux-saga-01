import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import types from "../../utils/actionTypes";

console.log(types.LOGIN_USER);

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
interface UserLoggedIn {
  email: string;
  password: string;
  error: "";
}
interface UserLoggedInObject {
  userVariable: UserLoggedIn;
}

const defaultUserState: UserLoggedInObject = {
  userVariable: { email: "", password: "", error: "" },
};

const reduceUsers = (
  state = defaultUserState || { email: "", password: "", error: "" },
  action: { type: string; payload: UserLoggedIn }
) => {
  switch (action.type) {
    case types.LOGIN_USER:
      console.log(action);
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
