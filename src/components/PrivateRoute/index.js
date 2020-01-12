import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import { isUserRegistered } from "../../selectors";

const mapStateToProps = state => ({
  authorized: isUserRegistered(state)
});

export default connect(mapStateToProps)(PrivateRoute);
