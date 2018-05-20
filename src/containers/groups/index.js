import Groups from './Groups';
import {changeGroups} from '../../actions/index';
import {connect} from 'react-redux';

const mapStateToProps = null;

const mapDispatchToProps=dispatch=>({
  groupSelect:(name)=>dispatch(changeGroups(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Groups);