import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { userLogout } from "../../actions/actions";

import Navbar from "./Navbar";
import { getUser } from "../../selectors";

const mapDispatchToProps = {
  userLogout
};

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
