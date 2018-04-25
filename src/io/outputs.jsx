import React from 'react';
import PropTypes from 'prop-types';

import {weightConversionFactors} from 'app/utils/conversion_factors';
import newId from 'app/utils/unique_key';
import 'app/styles.css';

export class GenericOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalNumber: this.props.number,
            outputNumber: this.props.number,
            conversionFactors: this.props.conversionFactors,
            unit: Object.keys(this.props.conversionFactors)[0],
            outputLabel: this.props.outputLabel
        };

        this.handleUnitChange = this.handleUnitChange.bind(this);

        this.inputID = newId();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            originalNumber: nextProps.number,
            outputNumber: nextProps.number,
            conversionFactors: nextProps.conversionFactors,
            outputLabel: nextProps.outputLabel
        }, this.generateFinal);
    }

    handleUnitChange(ev) {
        this.setState({
            unit: ev.target.value
        }, this.generateFinal);
    }

    generateFinal() {
        const result = this.state.originalNumber / this.state.conversionFactors[this.state.unit];
        const roundedResult = Math.round(result * 1000) / 1000;
        this.setState({outputNumber: roundedResult});
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.state.conversionFactors).map(unit => <option value={unit} key={'unitSelect' + newId()}>{unit}</option>);

        return (
            <select value={this.state.unit} onChange={this.handleUnitChange}>{selectOptions}</select>
        )
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID}>{this.state.outputLabel}:&nbsp;</label>
                <input type='number' value={this.state.outputNumber} disabled className='input-width' id={'input' + this.inputID}/> {this.renderSelect()}
            </div>
        );
    }
}

GenericOutput.propTypes = {
    outputLabel: PropTypes.string,
    conversionFactors: PropTypes.object,
    number: PropTypes.number
};

export class WeightOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outputLabel: this.props.outputLabel,
            weight: this.props.weight
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({weight: nextProps.weight, outputLabel: nextProps.outputLabel});
    }

    render() {
        return <GenericOutput outputLabel={this.state.outputLabel} conversionFactors={weightConversionFactors} number={this.state.weight}/>;
    }
}

WeightOutput.propTypes = {
    outputLabel: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired // in grams
};

WeightOutput.defaultProps = {
    outputLabel: 'Output Weight',
    weight: 0
}
