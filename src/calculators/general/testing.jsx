import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class TestingCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abvIn: 40,
            amtIn: 1,
            numberConsumed: 1,
            weight: 230,
            period: 45,
        };

        this.alcoholPerDrink = {
            shot: 0.8, // 2fl oz * .4 abv
            beer: 0.72, // 12fl oz * .06abv
            wine: 3.29, // 25.36fl oz * .13 abv
        };
    }

    getEthanol() {
        return this.state.amtIn * this.state.numberConsumed * (this.state.abvIn / 100);
    }

    _bacCalc(flOzEthanol, male, weightLbs, drinkingPeriodMins) {
        let sd = flOzEthanol / 0.4826; // 10 grams ethanol = .4826 fl. oz
        let bw = male ? 0.58 : 0.49; // body water constant
        let kilos = weightLbs * 0.453592;
        let mr = male ? 0.015 : 0.017; // metabolism constant
        let dp = drinkingPeriodMins / 60;

        return (0.806 * sd * 1.2 / (bw * kilos) - mr * dp) * 10;
    }

    getBAC() {
        return {
            male: this._bacCalc(this.getEthanol(), true, this.state.weight, this.state.period),
            female: this._bacCalc(this.getEthanol(), false, this.state.weight, this.state.period),
        };
    }

    render() {
        return (
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="ABV"
                            onChange={val => this.setState({ abvIn: Number(val) })}
                            number={this.state.abvIn}
                            unit="%"
                        />
                        <GenericInput
                            inputLabel="Amount"
                            onChange={val => this.setState({ amtIn: Number(val) })}
                            conversionFactors={ConversionFactors.drinkVolume}
                            number={this.state.amtIn}
                        />
                        <FixedUnitInput
                            inputLabel="Number Consumed"
                            onChange={val => this.setState({ numberConsumed: Number(val) })}
                            number={this.state.numberConsumed}
                            unit="drinks"
                        />
                        <hr />
                        <h2>BAC Math</h2>
                        <FixedUnitInput
                            inputLabel="Weight"
                            onChange={val => this.setState({ weight: Number(val) })}
                            number={this.state.weight}
                            unit="lbs"
                        />
                        <FixedUnitInput
                            inputLabel="Drinking Period"
                            onChange={val => this.setState({ period: Number(val) })}
                            number={this.state.period}
                            unit="minutes"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Total Ethanol"
                            number={defaultRound(this.getEthanol())}
                            conversionFactors={ConversionFactors.drinkVolume}
                            showSplitter={false}
                        />
                        <FixedUnitOutput
                            outputLabel="Equivalent to"
                            number={defaultRound(this.getEthanol() / this.alcoholPerDrink.shot)}
                            unit="shots"
                        />
                        <FixedUnitOutput
                            noColon
                            number={defaultRound(this.getEthanol() / this.alcoholPerDrink.beer)}
                            unit="beers"
                        />
                        <FixedUnitOutput
                            noColon
                            number={defaultRound(this.getEthanol() / this.alcoholPerDrink.wine)}
                            unit="wine bottles"
                        />
                        <FixedUnitOutput
                            outputLabel="BAC (Male)"
                            number={defaultRound(this.getBAC().male)}
                            unit="%"
                        />
                        <FixedUnitOutput
                            outputLabel="BAC (Female)"
                            number={defaultRound(this.getBAC().female)}
                            unit="%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
