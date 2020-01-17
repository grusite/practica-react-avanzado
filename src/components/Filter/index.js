import Filter from "./Filter";
import { compose } from "../../utils/compose";
import withTags from "../../hocs/withTags";

export default compose(withTags)(Filter);
