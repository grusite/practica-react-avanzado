import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";

const mapStateToProps = state => ({
  authorized: state.user.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
