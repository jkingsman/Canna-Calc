import React from 'react';
import PropTypes from 'prop-types';

import newId from 'app/utils/unique_key';
import 'app/styles.css';

export default class GenericInput extends React.Component {
    componentWillMount () {
        this.inputID = newId();
    }

    onChange (ev) {
        console.log(ev);
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID}>{this.props.label}:&nbsp;</label>
                <input type='number' className='input-width' id={'input' + this.inputID} onChange={this.onChange} />
            </div>
        );
    }
}

GenericInput.propTypes = {
  label: PropTypes.string,
};
