import React from 'react';
import PropTypes from 'prop-types';

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
        }, () => console.log(this.state.result));
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
                <label htmlFor={'input' + this.inputID}>{this.props.label}:&nbsp;</label>
                <input type='number' value={this.state.number} onChange={this.handleNumberChange} min="0" className='input-width' id={'input' + this.inputID}/> {this.renderSelect()}
            </div>
        );
    }
}

GenericInput.propTypes = {
    label: PropTypes.string,
    conversionFactors: PropTypes.object
};

export class WeightInput extends React.Component {
    componentWillMount() {
        // to grams
        this.conversionFactors = {
            'g': 1,
            'oz': 28.3495231,
            'lbs': 453.59237,
            'kg': 1000
        }
    }

    render() {
        return <GenericInput label={this.props.label} conversionFactors={this.conversionFactors}/>;
    }
}

WeightInput.propTypes = {
    label: PropTypes.string.required
};

WeightInput.defaultProps = {
    label: 'Weight'
}
