import { createStore,applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { thunk } from "redux-thunk";
import { rootreducer } from "./Component/Services/Reducer/rootReducer";

export const store = createStore(
    rootreducer,
    composeEnhancers(applyMiddleware(thunk))
)