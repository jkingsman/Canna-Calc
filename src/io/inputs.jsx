import React from 'react';
import PropTypes from 'prop-types';

import newId from 'app/utils/unique_key';
import 'app/styles.css';

export class GenericInput extends React.Component {
    componentWillMount() {
        this.inputID = newId();
        this.setState({weight: 0, unit: null});
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID}>{this.props.label}:&nbsp;</label>
                <input type='number' value={this.state.weight} className='input-width' id={'input' + this.inputID} />
            </div>
        );
    }
}

GenericInput.propTypes = {
    label: PropTypes.string,
    conversionFactors: PropTypes.object,
};

export class WeightInput extends React.Component {
    componentWillMount() {
      // to grams
      this.conversionFactors = {
        'lbs': 453.59237,
        'oz': 28.3495231,
        'kg': 1000,
        'g': 1,
      }
    }

    render() {
        return <GenericInput label="Weight" conversionFactors={this.conversionFactors}/>;
    }
}
