import Pokemons from './Pokemons';
import {fetchPokemons} from '../../actions/index';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  pokemons: state.pokemonReducer.pokemons,
  typeClass: state.pokemonReducer.types,
  filters: state.filterReducer
});

const mapDispatchToProps = dispatch => ({
  fetchAllPokemons: () => dispatch(fetchPokemons())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pokemons);