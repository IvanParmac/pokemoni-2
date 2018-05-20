import Filters from './Filters';
import { changeFilters } from '../../actions/index';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  filters: state.filterReducer,
  typeClass: state.pokemonReducer.types
});

const mapDispatchToProps = dispatch => ({
  handleFilterChange: (name, value, checkbox) => dispatch(changeFilters(name, value, checkbox))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);