import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Navbar from "./Navbar";

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(withRouter(Navbar));
