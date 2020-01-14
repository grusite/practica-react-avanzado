import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Filter from "./Filter";
import { login } from "../../actions/actions";
import { getTags } from "../../selectors";

const mapDispatchToProps = dispatch => ({
  login: (name, surname, tag) => dispatch(login(name, surname, tag))
});

const mapStateToProps = state => ({
  tags: getTags(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filter));
