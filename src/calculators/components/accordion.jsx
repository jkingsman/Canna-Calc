import React from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce'

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
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }

    const shouldShow = () => (window.location.hash == `#${id}`)

    const uniqueID = newId();

    return (
        <div className="card">
            <span className="card-header" onClick={debounce(toggleHash, 250)} id={`#card${uniqueID}`} data-target={`#cardCollapse${uniqueID}`} aria-controls={`cardCollapse${uniqueID}`} data-toggle="collapse" aria-expanded="false">
                <p className="mb-0">
                    {title}
                </p>
            </span>

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
