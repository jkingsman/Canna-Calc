import React from "react";
import PropTypes from "prop-types";

import newId from "app/utils/unique_key";

export default class HoverTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.uniqueID = newId();
    }

    render() {
        return (
            <div className="customTooltip">
                <sup>{this.props.indicatorChar}</sup>
                <span className="customTooltipText">{this.props.message}</span>
            </div>
        );
    }
}

HoverTooltip.propTypes = {
    indicatorChar: PropTypes.string,
    message: PropTypes.string.isRequired,
};

HoverTooltip.defaultProps = {
    indicatorChar: "?",
};
