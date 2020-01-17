import CreateUpdateAdvert from "./CreateUpdateAdvert";
import { compose } from "../../utils/compose";
import withAdverts from "../../hocs/withAdverts";
import withTags from "../../hocs/withTags";

export default compose(withTags, withAdverts)(CreateUpdateAdvert);
