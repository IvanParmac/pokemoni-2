import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import groupReducer from './groupReducer';
import pokemonReducer from './pokemonReducer';

export default combineReducers({
  filterReducer,
  groupReducer,
  pokemonReducer
});