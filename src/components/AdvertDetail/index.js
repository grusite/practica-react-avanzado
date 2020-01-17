import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AdvertDetail from "./AdvertDetail";
import { fetchAdvertById } from "../../actions/actions";
import { getAdvert, getUi } from "../../selectors";

const mapDispatchToProps = dispatch => ({
  fetchAdvertById: advertId => dispatch(fetchAdvertById(advertId))
});

const mapStateToProps = state => ({
  advert: getAdvert(state),
  ui: getUi(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdvertDetail));
