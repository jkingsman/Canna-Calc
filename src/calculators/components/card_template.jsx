import React from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce'

import newId from 'app/utils/unique_key';

const CardTemplate = ({
    id,
    title,
    children,
    parentID,
    keywords,
    searchTerm
}) => {
    const toggleHash = () => {
        if (window.location.hash.length < 1 || window.location.hash != `#${id}`) {
            window.location.hash = id;
        } else {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }

    const shouldShow = () => (window.location.hash == `#${id}`)

    const uniqueID = newId();

    const matchesKeyword = searchTerm.trim().split(" ").every(singleTerm => keywords.includes(singleTerm.toLowerCase()));

    if (matchesKeyword) {
        return (
            <div className="card pad-left">
                <h6 className="card-header mb-0" onClick={debounce(toggleHash, 250)} id={`#card${uniqueID}`} data-target={`#cardCollapse${uniqueID}`} aria-controls={`cardCollapse${uniqueID}`} data-toggle="collapse" aria-expanded="false">
                    {title}
                </h6>

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

    return null;
}

CardTemplate.propTypes = {
    id: PropTypes.string,
    parentID: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    keywords: PropTypes.string,
    searchTerm: PropTypes.string,
};

export default CardTemplate;
