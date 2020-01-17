import { connect } from "react-redux";

import { getTags } from "../selectors";
import { loadTags } from "../actions/actions";

const mapStateToProps = state => ({
  tags: getTags(state)
});

const mapDispatchToProps = {
  loadTags
};

export default connect(mapStateToProps, mapDispatchToProps);
