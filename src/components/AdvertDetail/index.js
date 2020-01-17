import { withRouter } from "react-router-dom";
import { compose } from "../../utils/compose";

import AdvertDetail from "./AdvertDetail";
import withAdverts from "../../hocs/withAdverts";

export default compose(withAdverts, withRouter)(AdvertDetail);
