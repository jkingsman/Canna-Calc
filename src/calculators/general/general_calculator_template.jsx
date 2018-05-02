import React from "react";
import PropTypes from "prop-types";

import GenericCalculator from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class GeneralCalculatorTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            splitFactor: 1,
            resultNumber: 0,
            resultUnit: "",
        };

        this.resultHandler = this.resultHandler.bind(this);
        this.updateSplitFactor = this.updateSplitFactor.bind(this);
    }

    resultHandler(number, unit) {
        this.setState({
            resultNumber: number,
            resultUnit: unit,
        });
    }

    updateSplitFactor(ev) {
        this.setState({
            splitFactor: Number(ev.target.value),
        });
    }

    getSplitResult() {
        const splitResult = this.state.resultNumber / this.state.splitFactor;
        const roundedResultWithUnit = `${defaultRound(
            splitResult
        ).toString()} ${this.state.resultUnit}`;
        return roundedResultWithUnit;
    }

    render() {
        let message = null;
        if (this.props.message) {
            message = (
                <span>
                    <p>{this.props.message}</p>
                    <hr />
                </span>
            );
        }

        return (
            <div>
                {message}
                <GenericCalculator
                    conversionFactors={this.props.conversionFactors}
                    labelSuffix={this.props.labelSuffix}
                    negative={this.props.negative}
                    resultHandler={this.resultHandler}
                    showSplitter={!this.props.hideSplitter}
                    noPadding
                />
            </div>
        );
    }
}

GeneralCalculatorTemplate.propTypes = {
    labelSuffix: PropTypes.string,
    conversionFactors: PropTypes.object,
    negative: PropTypes.bool,
    message: PropTypes.string,
    hideSplitter: PropTypes.bool,
};

GeneralCalculatorTemplate.defaultProps = {
    negative: false,
    hideSplitter: false,
};
