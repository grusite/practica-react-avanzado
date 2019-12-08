import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import advertsReducer from './advertsReducer'

export default combineReducers({
  loginReducer,
  advertsReducer,
})
