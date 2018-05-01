import React from 'react';

import {GenericInput, GenericOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class EvapPrediction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solventStartWeight: 10,
            weightAfterTime: 9.2,
            time: 12,
            expectedYield: .5,
        };
    }

    getCorrectedSolventAmt() {
        return this.state.weightAfterTime - this.state.expectedYield;
    }

    getSolventLoss() {
        return this.state.solventStartWeight - this.getCorrectedSolventAmt();
    }

    getSolventLossPerHour() {
        return this.getSolventLoss() / this.state.time;
    }

    getEvapTime() {
        return this.getCorrectedSolventAmt() / this.getSolventLossPerHour();
    }

    render() {
        return (
            <div className="container">
                <p>To use this calculator, measure the weight of the solvent you are using before introducing it to the cannabis. After a time, weigh it again and note the new weight. Estimate the rough yield of product you expect as a correction factor (or measure the weight of the solvent before and after cannabis contact for a more precise value), and then this calculator will predict (assuming a linear evaporation rate) the rough amount of time it will take for the remaining solvent to evaporate. Please not that this is very imprecise and should only be used for vauge estimages; true solvent evaporation is not always linear</p>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Pre-cannabis Solvent Weight" onChange={(val) => this.setState({solventStartWeight: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.solventStartWeight}/>
                        <GenericInput inputLabel="Current Solvent Weight" onChange={(val) => this.setState({weightAfterTime: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.weightAfterTime}/>
                        <GenericInput inputLabel="Time Since Start" onChange={(val) => this.setState({time: Number(val)})} conversionFactors={ConversionFactors.basicTime} number={this.state.time}/>
                        <GenericInput inputLabel="Estimated Yield" onChange={(val) => this.setState({expectedYield: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.expectedYield}/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel="Evapd. Solvent" number={defaultRound(this.getSolventLoss())} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Solvent Loss/hr" number={defaultRound(this.getSolventLossPerHour())} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Time to Total Evap" number={defaultRound(this.getEvapTime())} conversionFactors={ConversionFactors.basicTime} showSplitter={false}/>
                    </div>
                </div>
            </div>
        );
    }
}
