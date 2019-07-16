import React from "react";

import {
    FreeInput,
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";
import dayjs from "dayjs";

export default class BetterBAC extends React.Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            abvIn: 40,
            amountIn: 3,
            numberConsumed: 1,
            drinks: [],
            weight: 230,
            isMale: true,
            startTime: new Date().toLocaleTimeString(),
            startDate: new Date().toLocaleDateString(),
        };

        let storedState = localStorage.getItem("state");
        if (!storedState) {
            this.state = this.defaultState;
        } else {
            this.state = JSON.parse(storedState);
        }

        this.alcoholPerDrink = {
            shot: 0.8, // 2fl oz * .4 abv
            beer: 0.72, // 12fl oz * .06abv
            wine: 3.29, // 25.36fl oz * .13 abv
        };
    }

    getEthanol() {
        if (this.state.drinks.length > 0) {
            return this.state.drinks
                .map(drink => drink.etoh)
                .reduce((accumulator, currentValue) => accumulator + currentValue);
        }

        return 0;
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
        // let date = new Date(Date.parse((new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString()));
        return Math.max(
            this._bacCalc(this.getEthanol(), this.state.isMale, this.state.weight, drinkingPeriod),
            0
        );
    }

    getDriveStatusUnit(bac) {
        let statusEmoji;

        if (bac > 0.2) {
            statusEmoji = "🚨☠️☠️🚨";
        } else if (bac <= 0.2 && bac > 0.07) {
            statusEmoji = "🚨";
        } else if (bac <= 0.07 && bac >= 0.05) {
            statusEmoji = "❗";
        } else {
            statusEmoji = "👌";
        }

        return `%  ${statusEmoji}`;
    }

    getMinsFromStart(mins) {
        return dayjs(this.state.startDate + " " + this.state.startTime)
            .add(mins, "minute")
            .format("HHmm");
    }

    addDrink() {
        const drinkList = this.state.drinks;
        const drinkObj = {
            abv: this.state.abvIn,
            amount: this.state.amountIn,
            number: this.state.numberConsumed,
            etoh: this.state.amountIn * this.state.numberConsumed * (this.state.abvIn / 100),
        };

        drinkList.push(drinkObj);
        this.setState({ drinks: drinkList });
    }

    deleteDrink(i) {
        let drinkList = this.state.drinks;
        drinkList.splice(i, 1);
        this.setState({ drinks: drinkList });
    }

    renderDrinks() {
        if (!this.state.drinks) {
            return null;
        }

        const drinkStrings = this.state.drinks.map(drink => {
            return `${drink.number}x ${defaultRound(drink.amount)} fl.oz. ${
                drink.abv
            }% (${defaultRound(drink.etoh)} fl.oz.EtOH)`;
        });

        return (
            <ul>
                {drinkStrings.map((drink, i) => (
                    <li key={i} onClick={() => this.deleteDrink(i)}>
                        {drink}
                    </li>
                ))}
            </ul>
        );
    }

    componentDidUpdate() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    clearLocal() {
        localStorage.setItem("state", JSON.stringify(this.defaultState));
        this.defaultState.startTime = new Date().toLocaleTimeString();
        this.defaultState.startDate = new Date().toLocaleDateString();
        this.setState(this.defaultState);
    }

    render() {
        return (
            <div className="container">
                {this.renderDrinks()}
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
                            onChange={val => this.setState({ amountIn: Number(val) })}
                            conversionFactors={ConversionFactors.drinkVolume}
                            number={this.state.amountIn}
                        />
                        <FixedUnitInput
                            inputLabel="Number Consumed"
                            onChange={val => this.setState({ numberConsumed: Number(val) })}
                            number={this.state.numberConsumed}
                            unit="drinks"
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.clearLocal()}
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary float-right"
                            onClick={() => this.addDrink()}
                        >
                            Add
                        </button>
                        <hr />
                        <h2>BAC Math</h2>
                        <FixedUnitInput
                            inputLabel="Weight"
                            onChange={val => this.setState({ weight: Number(val) })}
                            number={this.state.weight}
                            unit="lbs"
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
                        <FreeInput
                            inputLabel="Start Date"
                            onChange={val => this.setState({ startDate: val })}
                            val={this.state.startDate}
                        />
                        <FreeInput
                            inputLabel="Start Time"
                            onChange={val => this.setState({ startTime: val })}
                            val={this.state.startTime}
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
                            outputLabel={`Instantaneous (${this.getMinsFromStart(0)})`}
                            number={defaultRound(this.getBAC(0))}
                            unit={this.getDriveStatusUnit(this.getBAC(0))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+30 minutes (${this.getMinsFromStart(30)})`}
                            number={defaultRound(this.getBAC(30))}
                            unit={this.getDriveStatusUnit(this.getBAC(30))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+1.0 hour (${this.getMinsFromStart(60)})`}
                            number={defaultRound(this.getBAC(60))}
                            unit={this.getDriveStatusUnit(this.getBAC(60))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+1.5 hour (${this.getMinsFromStart(90)})`}
                            number={defaultRound(this.getBAC(90))}
                            unit={this.getDriveStatusUnit(this.getBAC(90))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+2.0 hour (${this.getMinsFromStart(120)})`}
                            number={defaultRound(this.getBAC(120))}
                            unit={this.getDriveStatusUnit(this.getBAC(120))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+2.5 hour (${this.getMinsFromStart(150)})`}
                            number={defaultRound(this.getBAC(150))}
                            unit={this.getDriveStatusUnit(this.getBAC(150))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+3.0 hour (${this.getMinsFromStart(180)})`}
                            number={defaultRound(this.getBAC(180))}
                            unit={this.getDriveStatusUnit(this.getBAC(180))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+3.5 hour (${this.getMinsFromStart(210)})`}
                            number={defaultRound(this.getBAC(210))}
                            unit={this.getDriveStatusUnit(this.getBAC(210))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+4.0 hour (${this.getMinsFromStart(240)})`}
                            number={defaultRound(this.getBAC(240))}
                            unit={this.getDriveStatusUnit(this.getBAC(240))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+4.5 hour (${this.getMinsFromStart(270)})`}
                            number={defaultRound(this.getBAC(270))}
                            unit={this.getDriveStatusUnit(this.getBAC(270))}
                        />
                        <FixedUnitOutput
                            outputLabel={`+5.0 hour (${this.getMinsFromStart(300)})`}
                            number={defaultRound(this.getBAC(300))}
                            unit={this.getDriveStatusUnit(this.getBAC(300))}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
