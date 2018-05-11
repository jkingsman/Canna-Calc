import React from "react";
import PropTypes from "prop-types";

import newId from "app/utils/unique_key";

export default class CardTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.uniqueID = newId();

        this.toggleHash = this.toggleHash.bind(this);
    }

    toggleHash() {
        if (window.location.hash.length < 1 || window.location.hash != `#${this.props.id}`) {
            window.location.hash = this.props.id;
        } else {
            history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
            );
        }
    }

    shouldShow() {
        return window.location.hash == `#${this.props.id}`;
    }

    matchesKeyword() {
        return this.props.searchTerm
            .trim()
            .split(" ")
            .every(singleTerm => this.props.keywords.includes(singleTerm.toLowerCase()));
    }

    render() {
        if (this.matchesKeyword()) {
            return (
                <div className="card pad-left">
                    <a
                        aria-hidden="true"
                        aria-label="Anchor for navigation -- not seen; this is just here for ARIA compliance"
                        name={`${this.props.id}_a`}
                    />
                    <h3
                        className="card-header mb-0"
                        onClick={this.toggleHash}
                        id={`card${this.uniqueID}`}
                        data-target={`#cardCollapse${this.uniqueID}`}
                        aria-controls={`cardCollapse${this.uniqueID}`}
                        data-toggle="collapse"
                        aria-expanded="false"
                    >
                        {this.props.title}
                    </h3>

                    <div
                        id={"cardCollapse" + this.uniqueID}
                        className={this.shouldShow() ? "collapse show" : "collapse"}
                        aria-labelledby={"card" + this.uniqueID}
                        data-parent={`#${this.props.parentID}`}
                    >
                        <div className="card-body">{this.props.children}</div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

CardTemplate.propTypes = {
    id: PropTypes.string,
    parentID: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    keywords: PropTypes.string,
    searchTerm: PropTypes.string,
};
