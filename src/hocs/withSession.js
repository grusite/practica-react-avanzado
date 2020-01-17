import { connect } from "react-redux";

import { getSession, getUser } from "../selectors";
import { userLogin, userLogout } from "../actions/actions";

const mapStateToProps = state => ({
  user: getUser(state),
  session: getSession(state)
});

const mapDispatchToProps = {
  userLogin,
  userLogout
};

export default connect(mapStateToProps, mapDispatchToProps);
