import { combineReducers } from 'redux'
import simpleReducer from './simpleReducer'
import loginReducer from './loginReducer'

export default combineReducers({
  simpleReducer,
  loginReducer,
})
