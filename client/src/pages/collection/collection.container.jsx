import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionLoaded } from "../../redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionsPage from "./collection.component";

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: (state) => !selectIsCollectionLoaded(state),
});

const CollectionsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsPage);

export default CollectionsPageContainer;
