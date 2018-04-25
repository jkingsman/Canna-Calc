import React from 'react';
import PropTypes from 'prop-types';

import newId from 'app/utils/unique_key';
import 'app/styles.css';

export class GenericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            unit: Object.keys(this.props.conversionFactors)[0],
            result: 0
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);

        this.inputID = newId();
    }

    componentWillMount() {
        this.convertToFinal();
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
    inputLabel: PropTypes.string.isRequired,
    conversionFactors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
};

GenericInput.defaultProps = {
    inputLabel: "",
    conversionFactors: {},
    onChange: () => null,
    number: 0,
};

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
    outputLabel: PropTypes.string.isRequired,
    conversionFactors: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
};

GenericOutput.defaultProps = {
    outputLabel: "",
    conversionFactors: {},
    number: 0,
};
