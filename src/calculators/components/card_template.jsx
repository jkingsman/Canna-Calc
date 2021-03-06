import React from "react";
import PropTypes from "prop-types";

import newId from "app/utils/unique_key";

export default class CardTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: false,
            hasShownFirst: false,
        };
        this.uniqueID = newId();
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({ showCard: !this.state.showCard, hasShownFirst: true }, this.setHash);
    }

    setHash() {
        if (this.state.showCard) {
            window.location.hash = this.props.id;
        } else {
            let noHashURL = window.location.href.replace(/#.*$/, "");
            window.history.replaceState("", document.title, noHashURL);
        }
    }

    matchesKeyword() {
        return this.props.searchTerm
            .trim()
            .split(" ")
            .every(singleTerm => this.props.keywords.includes(singleTerm.toLowerCase()));
    }

    componentDidMount() {
        // expand when the hash matches. this should be done by refs but I couldn't get it to work. I know, it's gross.
        if (window.location.hash === `#${this.props.id}`) {
            setTimeout(
                function() {
                    document.querySelector(`#card${this.uniqueID}`).click();
                }.bind(this),
                100
            );
        }
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
                        className="collapse"
                        aria-labelledby={"card" + this.uniqueID}
                    >
                        <div className="card-body">
                            {this.state.hasShownFirst ? this.props.children : null}
                        </div>
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
