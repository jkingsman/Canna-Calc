import React from 'react';
import PropTypes from 'prop-types';

import newId from 'app/utils/unique_key';
import {defaultRound} from 'app/utils/math';

export class FixedUnitInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);

        this.inputID = newId();
    }

    handleNumberChange(ev) {
        this.setState({
            number: ev.target.value
        }, this.props.onChange(ev.target.value));
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID} className={this.props.noPadding ? "" : "text-label"}>{this.props.inputLabel}:&nbsp;</label>
                <input type='number' value={this.state.number} onChange={this.handleNumberChange} min={this.props.negative
                    ? -9999999999
                    : 0} className='calc-input-width' id={'input' + this.inputID}/>{' '}{this.props.unit}
            </div>
        );
    }
}

FixedUnitInput.propTypes = {
    inputLabel: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    negative: PropTypes.bool,
    unit: PropTypes.string,
    noPadding: PropTypes.bool,
};

FixedUnitInput.defaultProps = {
    inputLabel: "",
    onChange: () => null,
    number: 0,
    negative: false,
    unit: 'unit',
    noPadding: false,
};

export class FixedUnitOutput extends React.Component {
    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'output' + this.inputID} className="text-label">{this.props.outputLabel}{this.props.noColon ? "" : ":"}&nbsp;</label>
                <input value={this.props.prefix + this.props.number} disabled className='calc-input-width' htmlFor={'output' + this.inputID}/>{' '}
                {this.props.unit}
            </div>
        );
    }
}

FixedUnitOutput.propTypes = {
    outputLabel: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    unit: PropTypes.string,
    noColon: PropTypes.bool,
    prefix: PropTypes.string,
};

FixedUnitOutput.defaultProps = {
    outputLabel: "",
    number: 0,
    unit: 'units',
    noColon: false,
    prefix: '',
};

export class GenericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            unit: Object.keys(this.props.conversionFactors.to)[0],
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

        const result = this.props.conversionFactors.to[this.state.unit](this.state.number);
        this.setState({result: result});

        this.props.onChange(result);
    }

    renderPer() {
        if (this.props.per) {
            return (
                <span>{' '}per{' '}</span>
            );
        }
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.props.conversionFactors.to).map(unit => <option value={unit} key={'unitSelect' + newId()}>{unit}</option>);

        return (
            <select value={this.state.unit} onChange={this.handleUnitChange}>{selectOptions}</select>
        )
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID} className={this.props.noPadding ? "" : "text-label"}>{this.props.inputLabel}:&nbsp;</label>
                <input type='number' value={this.state.number} onChange={this.handleNumberChange} min={this.props.negative
                    ? -9999999999
                    : 0} className='calc-input-width' id={'input' + this.inputID}/> {this.renderPer()}{this.renderSelect()}
            </div>
        );
    }
}

GenericInput.propTypes = {
    inputLabel: PropTypes.string.isRequired,
    conversionFactors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    negative: PropTypes.bool,
    per: PropTypes.bool,
    noPadding: PropTypes.bool,
};

GenericInput.defaultProps = {
    inputLabel: "",
    conversionFactors: {},
    onChange: () => null,
    number: 0,
    negative: false,
    per: false,
    noPadding: false,
};

export class GenericOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalNumber: this.props.number,
            outputNumber: this.props.number,
            conversionFactors: this.props.conversionFactors,
            unit: Object.keys(this.props.conversionFactors.from)[0],
            outputLabel: this.props.outputLabel,
            splitFactor: 1
        };

        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.updateSplitFactor = this.updateSplitFactor.bind(this);

        this.inputID = newId();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            originalNumber: nextProps.number,
            outputNumber: nextProps.number,
            conversionFactors: nextProps.conversionFactors,
            outputLabel: nextProps.outputLabel
        }, this.generateFinalResult);
    }

    handleUnitChange(ev) {
        this.setState({
            unit: ev.target.value
        }, this.generateFinalResult);
    }

    generateFinalResult() {
        const result = this.state.conversionFactors.from[this.state.unit](this.state.originalNumber) / this.state.splitFactor;
        this.setState({outputNumber: defaultRound(result)});

        this.props.resultHandler(defaultRound(result), this.state.unit);
    }

    renderPer() {
        if (this.props.per) {
            return (
                <span>{' '}per{' '}</span>
            );
        }
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.state.conversionFactors.from).map(unit => <option value={unit} key={'unitSelect' + newId()}>{unit}</option>);

        return (
            <select value={this.state.unit} onChange={this.handleUnitChange}>{selectOptions}</select>
        )
    }

    updateSplitFactor(ev) {
        this.setState({
            splitFactor: Number(ev.target.value)
        }, this.generateFinalResult)
    }

    renderSplitter() {
        if (this.props.showSplitter) {
            return (
                <span>
                    when split{' '}
                    <input value={this.state.splitFactor} onChange={this.updateSplitFactor} type='number' min={1} className="calc-tiny-input-width"/>{' '}
                    ways i.e. per plant or per room)
                </span>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={'input' + this.inputID} className={this.props.noPadding ? "" : "text-label"}>{this.state.outputLabel}:&nbsp;</label>
                <input type='number' value={this.state.outputNumber} disabled className='calc-input-width' id={'input' + this.inputID}/>{' '} {this.renderSelect()}{' '} {this.renderSplitter()}
            </div>
        );
    }
}

GenericOutput.propTypes = {
    outputLabel: PropTypes.string.isRequired,
    conversionFactors: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    resultHandler: PropTypes.func,
    per: PropTypes.bool,
    showSplitter: PropTypes.bool,
    noPadding: PropTypes.bool,
};

GenericOutput.defaultProps = {
    outputLabel: "",
    conversionFactors: {},
    number: 0,
    resultHandler: () => null,
    per: false,
    showSplitter: false,
    noPadding: false,
};

export default class GenericCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };

        this.setNumber = this.setNumber.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.number != this.state.number;
    }

    setNumber(number) {
        this.setState({number: number});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel={`Input ${this.props.labelSuffix}`} onChange={this.setNumber} conversionFactors={this.props.conversionFactors} negative={this.props.negative} noPadding={this.props.noPadding}/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel={`Ouput ${this.props.labelSuffix}`} resultHandler={this.props.resultHandler} number={this.state.number} conversionFactors={this.props.conversionFactors} showSplitter={this.props.showSplitter} noPadding={this.props.noPadding}/>
                    </div>
                </div>
            </div>
        );
    }
}

GenericCalculator.propTypes = {
    labelSuffix: PropTypes.string.isRequired,
    conversionFactors: PropTypes.object.isRequired,
    negative: PropTypes.bool,
    resultHandler: PropTypes.func,
    showSplitter: PropTypes.bool,
    noPadding: PropTypes.bool,
};

GenericOutput.defaultProps = {
    outputLabel: "",
    conversionFactors: {},
    negative: false,
    resultHandler: () => null,
    showSplitter: true,
    noPadding: false,
};
