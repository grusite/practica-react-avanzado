import { compose } from "../../utils/compose";

import Register from "./Register";
import withTags from "../../hocs/withTags";
import withSession from "../../hocs/withSession";

export default compose(withSession, withTags)(Register);
