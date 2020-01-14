import { connect } from "react-redux";

import Register from "./Register";
import { userLogin } from "../../actions/actions";
import { getTags } from "../../selectors";

const mapDispatchToProps = {
  userLogin
};

const mapStateToProps = state => ({
  tags: getTags(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
