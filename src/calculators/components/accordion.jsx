import React from 'react';
import PropTypes from 'prop-types';

var _ = require('lodash');

import newId from 'app/utils/unique_key';

export const AccordionContainer = ({id, padLeft, children}) => {
    return (
        <div id={id} className={padLeft
            ? "pad-left"
            : ""}>
            {children}
        </div>
    );
}

AccordionContainer.propTypes = {
    id: PropTypes.string,
    padLeft: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};

export const CardTemplate = ({id, title, children, parentID}) => {
    const toggleHash = () => {
        if (window.location.hash.length < 1 || window.location.hash != `#${id}`) {
            window.location.hash = id;
        } else {
            window.location.hash = '';
        }
    }

    const shouldShow = () => (window.location.hash == `#${id}`)

    const uniqueID = newId();

    return (
        <div className="card">
            <a className="card-header" onClick={_.debounce(toggleHash, 250)} id={`#card${uniqueID}`} data-target={`#cardCollapse${uniqueID}`} aria-controls={`cardCollapse${uniqueID}`} data-toggle="collapse" aria-expanded="false">
                <p className="mb-0">
                    {title}
                </p>
            </a>

            <div id={"cardCollapse" + uniqueID} className={shouldShow()
                ? "collapse show"
                : "collapse"} aria-labelledby={"card" + uniqueID} data-parent={`#${parentID}`}>
                <div className="card-body">
                    {children}

                </div>
            </div>
        </div>
    );
}

CardTemplate.propTypes = {
    id: PropTypes.string,
    parentID: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};
