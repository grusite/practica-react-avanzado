import { withRouter } from "react-router-dom";
import { compose } from "../../utils/compose";
import Navbar from "./Navbar";
import withSession from "../../hocs/withSession";

export default compose(withSession, withRouter)(Navbar);
