import { connect } from "react-redux";

import { getSession } from "../selectors";
import { userLogin, userLogout } from "../actions/actions";

const mapStateToProps = state => ({
  session: getSession(state)
});

const mapDispatchToProps = {
  userLogin,
  userLogout
};

export default connect(mapStateToProps, mapDispatchToProps);
