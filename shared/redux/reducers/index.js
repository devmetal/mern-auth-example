import { combineReducers } from 'redux';
import post from './post-reducer';
import auth from './auth-reducer';

export default combineReducers({
  post,
  auth,
});
