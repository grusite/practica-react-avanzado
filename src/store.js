import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, devToolsEnhancer())
}
