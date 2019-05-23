import React from "react";
import PropTypes from "prop-types";

import newId from "app/utils/unique_key";

export default class CardTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: false,
            childCalc: this.props.children
        };
        this.uniqueID = newId();

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({showCard: !this.state.showCard}, this.setHash)
    }

    setHash() {
        if (this.state.showCard) {
            window.location.hash = this.props.id;
        } else {
            let noHashURL = window.location.href.replace(/#.*$/, '');
            window.history.replaceState(
                "",
                document.title,
                noHashURL
            );
        }
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
                        onClick={this.toggleVisibility}
                        id={`card${this.uniqueID}`}
                        data-target={`#cardCollapse${this.uniqueID}`}
                        aria-controls={`cardCollapse${this.uniqueID}`}
                        data-toggle="collapse"
                        aria-expanded="false"
                        area-role="button"
                        tabIndex="0"
                    >
                        {this.props.title}
                    </h3>

                    <div
                        id={"cardCollapse" + this.uniqueID}
                        className={"collapse"}
                        aria-labelledby={"card" + this.uniqueID}
                    >
                        <div className="card-body">{this.state.showCard ? this.state.childCalc : null}</div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

CardTemplate.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    keywords: PropTypes.string,
    searchTerm: PropTypes.string,
};
