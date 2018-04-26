import React from 'react';

import GenericCalculator from 'app/calculators/io';
import PropTypes from 'prop-types';
import newId from 'app/utils/unique_key';

export default class GeneralCalculatorTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            splitFactor: 1,
            resultNumber: 0,
            resultUnit: '',
        }

        this.resultHandler = this.resultHandler.bind(this);
        this.updateSplitFactor = this.updateSplitFactor.bind(this);
    }

    resultHandler(number, unit) {
        this.setState({resultNumber: number, resultUnit: unit});
    }

    updateSplitFactor(ev) {
        this.setState({splitFactor: Number(ev.target.value)});
    }

    getSplitResult() {
        const splitResult = (this.state.resultNumber / this.state.splitFactor);
        const roundedResult = Math.round(splitResult * 10000) / 10000;
        const roundedResultWithUnit = `${roundedResult.toString()} ${this.state.resultUnit}`;
        return roundedResultWithUnit;
    }

    render() {
        this.uniqueID = newId();

        let message = null;
        if (this.props.message) {
            message = <p>{this.props.message}</p>;
        }

        return (
            <div className="card">
                <a className="card-header" id={"conversion" + this.uniqueID} data-toggle="collapse" data-target={"#conversionCollapse" + this.uniqueID} aria-expanded="true" aria-controls={"conversionCollapse" + this.uniqueID}>
                    <p className="mb-0">
                        {this.props.labelSuffix}{' '}
                        Conversion
                    </p>
                </a>

                <div id={"conversionCollapse" + this.uniqueID} className="collapse" aria-labelledby={"conversion" + this.uniqueID} data-parent="#generalAccordion">
                    <div className="card-body">
                        {message}
                        <GenericCalculator conversionFactors={this.props.conversionFactors} labelSuffix={this.props.labelSuffix} negative={this.props.negative} resultHandler={this.resultHandler}/>
                        (or <input value={this.getSplitResult()} disabled className="calc-input-width" /> when split <input value={this.state.splitFactor} onChange={this.updateSplitFactor} type='number' min={1} className="calc-tiny-input-width" /> ways i.e. per plant or per room)
                    </div>
                </div>
            </div>
        );
    }
}

GeneralCalculatorTemplate.propTypes = {
    labelSuffix: PropTypes.string,
    conversionFactors: PropTypes.object,
    negative: PropTypes.bool,
    message: PropTypes.string
};
