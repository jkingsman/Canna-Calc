import React from "react";
import PropTypes from "prop-types";

import newId from "app/utils/unique_key";
import { defaultRound } from "app/utils/math";

export class FreeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: this.props.val,
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);

        this.inputID = newId();
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.val !== props.val) {
            return {
                val: props.val,
            };
        }
        return null;
    }

    handleNumberChange(ev) {
        this.setState(
            {
                val: ev.target.value,
            },
            this.props.onChange(ev.target.value)
        );
    }

    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={"input" + this.inputID}
                    className={this.props.noPadding ? "" : "text-label"}
                >
                    {this.props.inputLabel}:&nbsp;
                </label>
                <input
                    value={this.state.val}
                    onChange={this.handleNumberChange}
                    className="calc-input-width"
                    id={"input" + this.inputID}
                />{" "}
                {this.props.unit}
            </div>
        );
    }
}

FreeInput.propTypes = {
    inputLabel: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    val: PropTypes.any.isRequired,
    unit: PropTypes.any.isRequired,
    noPadding: PropTypes.bool,
};

FreeInput.defaultProps = {
    inputLabel: "",
    onChange: () => null,
    val: "",
    unit: "",
    noPadding: false,
};

export class FixedUnitInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);

        this.inputID = newId();
    }

    handleNumberChange(ev) {
        this.setState(
            {
                number: ev.target.value,
            },
            this.props.onChange(ev.target.value)
        );
    }

    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={"input" + this.inputID}
                    className={this.props.noPadding ? "" : "text-label"}
                >
                    {this.props.inputLabel}:&nbsp;
                </label>
                <input
                    type="number"
                    value={this.state.number}
                    onChange={this.handleNumberChange}
                    min={this.props.negative ? -9999999999 : 0}
                    className="calc-input-width"
                    id={"input" + this.inputID}
                />{" "}
                {this.props.unit}
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
    unit: "unit",
    noPadding: false,
};

export class FreeOutput extends React.Component {
    constructor(props) {
        super(props);
        this.inputID = newId();
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={"output" + this.inputID} className="text-label">
                    {this.props.outputLabel}
                    {this.props.noColon ? "" : ":"}&nbsp;
                </label>
                <input
                    value={this.props.prefix + this.props.val}
                    disabled
                    className="calc-input-width"
                    htmlFor={"output" + this.inputID}
                />{" "}
                {this.props.unit}
            </div>
        );
    }
}

FreeOutput.propTypes = {
    outputLabel: PropTypes.string.isRequired,
    val: PropTypes.any.isRequired,
    unit: PropTypes.string,
    noColon: PropTypes.bool,
    prefix: PropTypes.string,
};

FreeOutput.defaultProps = {
    outputLabel: "",
    val: 0,
    unit: "",
    noColon: false,
    prefix: "",
};

export class FixedUnitOutput extends React.Component {
    constructor(props) {
        super(props);
        this.inputID = newId();
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={"output" + this.inputID} className="text-label">
                    {this.props.outputLabel}
                    {this.props.noColon ? "" : ":"}&nbsp;
                </label>
                <input
                    value={this.props.prefix + this.props.number}
                    disabled
                    className="calc-input-width"
                    id={"output" + this.inputID}
                />{" "}
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
    unit: "units",
    noColon: false,
    prefix: "",
};

export class GenericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            unit: Object.keys(this.props.conversionFactors.to)[0],
            result: 0,
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);

        this.inputID = newId();
    }

    componentWillMount() {
        this.convertToFinal();
    }

    handleNumberChange(ev) {
        this.setState(
            {
                number: ev.target.value,
            },
            this.convertToFinal
        );
    }

    handleUnitChange(ev) {
        this.setState(
            {
                unit: ev.target.value,
            },
            this.convertToFinal
        );
    }

    convertToFinal() {
        if (isNaN(this.state.number)) {
            return;
        }

        let result;
        if (this.props.invert) {
            result = this.props.conversionFactors.from[this.state.unit](this.state.number);
        } else {
            result = this.props.conversionFactors.to[this.state.unit](this.state.number);
        }

        this.setState({
            result: result,
        });

        this.props.onChange(result);
    }

    renderPer() {
        if (this.props.per) {
            return <span> per </span>;
        }
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.props.conversionFactors.to).map(unit => (
            <option value={unit} key={"unitSelect" + newId()}>
                {unit}
            </option>
        ));

        return (
            <select
                aria-label="measurement input"
                value={this.state.unit}
                onChange={this.handleUnitChange}
            >
                {selectOptions}
            </select>
        );
    }

    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={"input" + this.inputID}
                    className={this.props.noPadding ? "" : "text-label"}
                >
                    {this.props.inputLabel}:&nbsp;
                </label>
                <input
                    type="number"
                    value={this.state.number}
                    onChange={this.handleNumberChange}
                    min={this.props.negative ? -9999999999 : 0}
                    className="calc-input-width"
                    id={"input" + this.inputID}
                />{" "}
                {this.renderPer()}
                {this.renderSelect()}
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
    invert: PropTypes.bool,
};

GenericInput.defaultProps = {
    inputLabel: "",
    conversionFactors: {},
    onChange: () => null,
    number: 0,
    negative: false,
    per: false,
    noPadding: false,
    invert: false,
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
            splitFactor: 1,
        };

        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.updateSplitFactor = this.updateSplitFactor.bind(this);

        this.inputID = newId();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                originalNumber: nextProps.number,
                outputNumber: nextProps.number,
                conversionFactors: nextProps.conversionFactors,
                outputLabel: nextProps.outputLabel,
            },
            this.generateFinalResult
        );
    }

    handleUnitChange(ev) {
        this.setState(
            {
                unit: ev.target.value,
            },
            this.generateFinalResult
        );
    }

    generateFinalResult() {
        const result =
            this.state.conversionFactors.from[this.state.unit](this.state.originalNumber) /
            this.state.splitFactor;
        this.setState({
            outputNumber: defaultRound(result),
        });

        this.props.resultHandler(defaultRound(result), this.state.unit);
    }

    renderPer() {
        if (this.props.per) {
            return <span> per </span>;
        }
    }

    renderSelect() {
        if (!this.props.conversionFactors) {
            return null;
        }

        let selectOptions = Object.keys(this.state.conversionFactors.from).map(unit => (
            <option value={unit} key={"unitSelect" + newId()}>
                {unit}
            </option>
        ));

        return (
            <select
                aria-label="measurement input"
                value={this.state.unit}
                onChange={this.handleUnitChange}
            >
                {selectOptions}
            </select>
        );
    }

    updateSplitFactor(ev) {
        this.setState(
            {
                splitFactor: Number(ev.target.value),
            },
            this.generateFinalResult
        );
    }

    renderSplitter() {
        if (this.props.showSplitter) {
            return (
                <span>
                    when split{" "}
                    <input
                        value={this.state.splitFactor}
                        onChange={this.updateSplitFactor}
                        type="number"
                        min={1}
                        className="calc-tiny-input-width"
                    />{" "}
                    ways (e.g. per plant or per room)
                </span>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={"input" + this.inputID}
                    className={this.props.noPadding ? "" : "text-label"}
                >
                    {this.state.outputLabel}:&nbsp;
                </label>
                <input
                    type="number"
                    value={this.state.outputNumber}
                    disabled
                    className="calc-input-width"
                    id={"input" + this.inputID}
                />{" "}
                {this.renderSelect()} {this.renderSplitter()}
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
            number: 0,
        };

        this.setNumber = this.setNumber.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.number != this.state.number;
    }

    setNumber(number) {
        this.setState({
            number: number,
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel={`Input ${this.props.labelSuffix}`}
                            onChange={this.setNumber}
                            conversionFactors={this.props.conversionFactors}
                            negative={this.props.negative}
                            noPadding={this.props.noPadding}
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel={`Output ${this.props.labelSuffix}`}
                            resultHandler={this.props.resultHandler}
                            number={this.state.number}
                            conversionFactors={this.props.conversionFactors}
                            showSplitter={this.props.showSplitter}
                            noPadding={this.props.noPadding}
                        />
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

export function EquationBlock(props) {
    return (
        <CollapseBlock name="Equations">
            <pre>{props.equations.join("\n")}</pre>
        </CollapseBlock>
    );
}

EquationBlock.propTypes = {
    equations: PropTypes.arrayOf(PropTypes.string),
};

EquationBlock.defaultProps = {
    equations: ["<no equations provided>"],
};

export class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        };

        this.handleChange = this.handleChange.bind(this);

        this.inputID = newId();
    }

    handleChange(ev) {
        this.setState(
            {
                checked: ev.target.checked,
            },
            this.props.onChange(ev.target.checked)
        );
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={"input" + this.inputID} className={"text-label"}>
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        onChange={this.handleChange}
                    />&nbsp;{this.props.label}
                </label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
};

Checkbox.defaultProps = {
    inputLabel: "",
    onChange: () => null,
    checked: false,
};

export class CollapseBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: this.props.show };

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({ show: !this.state.show });
    }

    render() {
        return (
            <span>
                <a
                    className="equationTrigger"
                    onClick={this.toggleShow}
                    aria-label="Expand or Collapse Data"
                >
                    {this.state.show ? "Hide" : "Show"} {this.props.name}{" "}
                    {this.state.show ? "▴" : "▾"}
                </a>
                {this.state.show ? this.props.children : null}
            </span>
        );
    }
}

CollapseBlock.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string,
    show: PropTypes.bool.isRequired,
};

CollapseBlock.defaultProps = {
    name: "",
    show: false,
};
