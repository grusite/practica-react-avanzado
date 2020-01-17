import { connect } from "react-redux";

import CreateUpdateAdvert from "./CreateUpdateAdvert";
// import { compose } from "../../utils/compose";
// import withAdverts from "../../hocs/withAdverts";
// import withTags from "../../hocs/withTags";
// import withUi from "../../hocs/withUi";

import {
  getTags,
  getAdvertById,
  getUi,
  getUpdatedAdvert,
  getCreatedAdvert
} from "../../selectors";
import {
  createAdvert,
  updateAdvert,
  fetchAdvertById
} from "../../actions/actions";

const mapDispatchToProps = dispatch => ({
  createAd: advert => dispatch(createAdvert(advert)),
  updateAd: (advert, advertId) => dispatch(updateAdvert(advert, advertId)),
  fetchAdvertById: advertId => dispatch(fetchAdvertById(advertId))
});

const mapStateToProps = (state, ownProps) => ({
  tags: getTags(state),
  advert: getAdvertById(state)(ownProps.match.params.id),
  ui: getUi(state),
  advertUpdated: getUpdatedAdvert(state),
  advertCreated: getCreatedAdvert(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateAdvert);
// export default compose(withTags, withAdverts, withUi)(CreateUpdateAdvert);
