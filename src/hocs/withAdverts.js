import { connect } from "react-redux";

import {
  getAdverts,
  getAdvert,
  getAdvertById,
  getUpdatedAdvert,
  getCreatedAdvert
} from "../selectors";
import {
  fetchAdverts,
  fetchAdvertById,
  updateAdvert,
  createAdvert
} from "../actions/actions";

const mapStateToProps = (state, ownProps) => ({
  adverts: getAdverts(state),
  advert: getAdvert(state),
  advertById: getAdvertById(state)(ownProps.match.params.id),
  advertUpdated: getUpdatedAdvert(state),
  advertCreated: getCreatedAdvert(state)
});

const mapDispatchToProps = {
  fetchAdverts,
  fetchAdvertById,
  updateAdvert,
  createAdvert
};

export default connect(mapStateToProps, mapDispatchToProps);
