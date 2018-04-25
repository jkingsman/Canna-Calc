import React from 'react';
import PropTypes from 'prop-types';

import {weightConversionFactors} from 'app/utils/conversion_factors';
import newId from 'app/utils/unique_key';
import 'app/styles.css';

export class GenericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            unit: Object.keys(this.props.conversionFactors)[0],
            result: 0
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);

        this.inputID = newId();
    }

    handleNumberChange(ev) {
        this.setState({
            number: ev.target.value
        }, this.convertToFinal);
    }

    handleUnitChange(ev) {
        this.setState({
            unit: ev.target.value
        }, this.convertToFinal);
    }

    convertToFinal() {
        if (isNaN(this.state.number)) {
            return;
        }

        const result = this.state.number * this.props.conversionFactors[this.state.unit];
        this.setState({
            result: result
        });

        this.props.onChange(result);
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.props.conversionFactors).map(unit => <option value={unit} key={'unitSelect' + newId()}>{unit}</option>);

        return (
            <select value={this.state.unit} onChange={this.handleUnitChange}>{selectOptions}</select>
        )
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID}>{this.props.inputLabel}:&nbsp;</label>
                <input type='number' value={this.state.number} onChange={this.handleNumberChange} min="0" className='input-width' id={'input' + this.inputID}/> {this.renderSelect()}
            </div>
        );
    }
}

GenericInput.propTypes = {
    inputLabel: PropTypes.string,
    conversionFactors: PropTypes.object,
    onChange: PropTypes.func,
};

export class WeightInput extends React.Component {
    render() {
        return <GenericInput inputLabel={this.props.inputLabel} conversionFactors={weightConversionFactors} onChange={this.props.onChange}/>;
    }
}

WeightInput.propTypes = {
    inputLabel: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

WeightInput.defaultProps = {
    inputLabel: 'Input Weight',
    onChange: () => null,
}
