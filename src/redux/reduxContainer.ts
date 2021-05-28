import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function reduxContainer(WrappedComponent: any, mapStateToProps: any, dispatchToProps: any) {
  function mapDispatchToProps(dispatch: any) {
    return bindActionCreators(dispatchToProps, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default reduxContainer;
