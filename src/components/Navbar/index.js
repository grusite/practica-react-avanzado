import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { userLogout } from "../../actions/actions";

import Navbar from "./Navbar";

const mapDispatchToProps = {
  userLogout
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
