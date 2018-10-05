import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';
import service from './service/reducer';
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
}
const rootReducer = combineReducers({
    service: persistReducer(rootPersistConfig, service),
});

export const store = compose(applyMiddleware(thunk))(createStore)(rootReducer)
export const persistor = persistStore(store)
