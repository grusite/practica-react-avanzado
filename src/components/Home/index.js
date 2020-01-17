import { compose } from "../../utils/compose";
import Home from "./Home";
import withAdverts from "../../hocs/withAdverts";
import withSession from "../../hocs/withSession";

export default compose(withAdverts, withSession)(Home);
