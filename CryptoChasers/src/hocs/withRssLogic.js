import React, {Component} from "react";
import { connect } from "react-redux";
import { changeSearchText } from "../actions/changeSearchText";
import { rssFetch } from "../actions/rssFetch";
export const withRssLogic = (RssComponent) => {
    const ComponentWrapper = class extends Component {
        constructor(props) {
            super(props);
            this.props.getRssData();
        }
        render() {
            return (
                <RssComponent {...this.props} />
            )
        }
    }
    const mapStoreToProps = store => ({
        filteredContent: store.rssReducer.filteredContent,
        rss: store.rssReducer.rss,
        searchTerm: store.rssReducer.searchTerm
    })
    const mapDispatchToProps = dispatch => ({
        changeSearchText: (searchTerm) => dispatch(changeSearchText(searchTerm)),
        getRssData: () => dispatch(rssFetch()),
    })
    return connect(mapStoreToProps, mapDispatchToProps)(ComponentWrapper);
}