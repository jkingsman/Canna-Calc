import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";
import dayjs from "dayjs";

export default class TestingCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abvIn: 40,
            amtIn: 3,
            numberConsumed: 1,
            weight: 230,
            isMale: true,
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
        let sd = flOzEthanol * 23.342386982 / 10; // 1 fl oz ethanol = 23.3... grams; divide by ten for standard drinks
        let bw = male ? 0.58 : 0.49; // body water constant
        let kilos = weightLbs * 0.453592;
        let mr = male ? 0.015 : 0.017; // metabolism constant
        let dp = drinkingPeriodMins / 60;

        return 0.806 * sd * 1.2 / (bw * kilos) - mr * dp;
    }

    getBAC(drinkingPeriod) {
        return Math.max(
            this._bacCalc(this.getEthanol(), this.state.isMale, this.state.weight, drinkingPeriod),
            0
        );
    }

    getDriveStatusUnit(bac) {
        let statusEmoji;

        if (bac >= 0.08) {
            statusEmoji = "💀";
        } else if (bac <= 0.08 && bac >= 0.06) {
            statusEmoji = "⚠️";
        } else {
            statusEmoji = "✅";
        }

        return `%  ${statusEmoji}`;
    }

    getMinsFromNow(mins) {
        return dayjs()
            .add(mins, "minute")
            .format("HHmm");
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
                        <div className="form-group">
                            <label>
                                <input
                                    type="radio"
                                    value="male"
                                    checked={this.state.isMale}
                                    onChange={ev =>
                                        this.setState({ isMale: ev.target.value === "male" })
                                    }
                                />
                                Male
                            </label>
                            &nbsp;&nbsp;
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    checked={!this.state.isMale}
                                    onChange={ev =>
                                        this.setState({ isMale: ev.target.value === "male" })
                                    }
                                />
                                Female
                            </label>
                        </div>
                        <hr />
                        <h2>BAC Math</h2>
                        <FixedUnitInput
                            inputLabel="Weight"
                            onChange={val => this.setState({ weight: Number(val) })}
                            number={this.state.weight}
                            unit="lbs"
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
                            outputLabel={`Instantaneous (${this.getMinsFromNow(0)})`}
                            number={defaultRound(this.getBAC(0))}
                            unit={this.getDriveStatusUnit(this.getBAC(0))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+30 minutes (${this.getMinsFromNow(30)})`}
                            number={defaultRound(this.getBAC(30))}
                            unit={this.getDriveStatusUnit(this.getBAC(30))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+1.0 hour (${this.getMinsFromNow(60)})`}
                            number={defaultRound(this.getBAC(60))}
                            unit={this.getDriveStatusUnit(this.getBAC(60))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+1.5 hour (${this.getMinsFromNow(90)})`}
                            number={defaultRound(this.getBAC(90))}
                            unit={this.getDriveStatusUnit(this.getBAC(90))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+2.0 hour (${this.getMinsFromNow(120)})`}
                            number={defaultRound(this.getBAC(120))}
                            unit={this.getDriveStatusUnit(this.getBAC(120))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+2.5 hour (${this.getMinsFromNow(150)})`}
                            number={defaultRound(this.getBAC(150))}
                            unit={this.getDriveStatusUnit(this.getBAC(150))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+3.0 hour (${this.getMinsFromNow(180)})`}
                            number={defaultRound(this.getBAC(180))}
                            unit={this.getDriveStatusUnit(this.getBAC(180))}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
