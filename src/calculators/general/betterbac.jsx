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

        this.state = {
            abvIn: 40,
            amountIn: 3,
            numberConsumed: 1,
            drinks: [],
            weight: 230,
            isMale: true,
            drinkTime: new Date().toLocaleTimeString(),
            drinkDate: new Date().toLocaleDateString(),
        };

        let drinkList = localStorage.getItem("drinks");
        if (drinkList && JSON.parse(drinkList).length > 0) {
            this.state.drinks = JSON.parse(drinkList);
        } else {
            this.state.drinks = [];
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

    getClassicBAC(time) {
        let sd = this.getEthanol() * 23.342386982 / 10; // 1 fl oz ethanol = 23.3... grams; divide by ten for standard drinks
        let bw = this.state.isMale ? 0.58 : 0.49; // body water constant
        let kilos = this.state.weight * 0.453592;
        let mr = this.state.isMale ? 0.015 : 0.017; // metabolism constant

        let dp = 0;
        if (time > this.getLastDrinkTime()){
            dp = (time - this.getLastDrinkTime()) / 1000 / 60 / 60; // time in hours
        }

        let bac = 0.806 * sd * 1.2 / (bw * kilos) - mr * dp;

        return Math.max(bac, 0);
    }

    getFirstDrinkTime() {
        return Math.min(...this.state.drinks.map((drink) => drink.time));
    }

    getLastDrinkTime() {
        return Math.max(...this.state.drinks.map((drink) => drink.time));
    }

    getMinsFromStart(mins) {
        return dayjs(this.state.drinkDate + " " + this.state.drinkTime)
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
            time: Date.parse(this.state.drinkTime + " " + this.state.numberConsumed),
        };

        drinkList.push(drinkObj);
        this.setState({
            drinks: drinkList,
            drinkTime: new Date().toLocaleTimeString(),
            drinkDate: new Date().toLocaleDateString(),
        });
    }

    deleteDrink(i) {
        let drinkList = this.state.drinks;
        drinkList.splice(i, 1);
        this.setState({ drinks: drinkList });
    }

    renderDrinks() {
        this.getFirstDrinkTime();
        if (!this.state.drinks) {
            return null;
        }

        const drinkStrings = this.state.drinks.sort((drink1, drink2) => drink1.time - drink2.time).map(drink => {
            return `${drink.number}x ${defaultRound(drink.amount)} fl.oz. ${
                drink.abv
            }% (${new Date(drink.time).toLocaleTimeString()})`;
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

    renderBACTable() {
        let halfHourInMillis = 30 * 60 * 1000;
        let results = []
        for (let i = 0; i <= 10; i++) {
            let time = this.getFirstDrinkTime() + (i * halfHourInMillis);
            results.push({
                time: new Date(time).toLocaleTimeString(),
                classicBAC: this.getClassicBAC(time)
            });
        }

        console.table(results)
        return (
            <table>
                <tr>
                    <th>Time</th>
                    <th>Classic BAC</th>
                </tr>
                {results.map((result, i) => <tr key={i}><td>{result.time}</td><td>{defaultRound(result.classicBAC)}</td></tr>)}
            </table>
        )
    }

    componentDidUpdate() {
        localStorage.setItem("drinks", JSON.stringify(this.state.drinks));
    }

    clearLocal() {
        this.setState(
            {
                drinks: [],
                drinkTime: new Date().toLocaleTimeString(),
                drinkDate: new Date().toLocaleDateString(),
            },
            function() {
                localStorage.setItem("drinks", JSON.stringify(this.state.drinks));
            }
        );
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
                        <FreeInput
                            inputLabel="Date"
                            onChange={val => this.setState({ drinkDate: val })}
                            val={this.state.drinkDate}
                        />
                        <FreeInput
                            inputLabel="Time"
                            onChange={val => this.setState({ drinkTime: val })}
                            val={this.state.drinkTime}
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
                        {this.renderBACTable()}
                    </div>
                </div>
            </div>
        );
    }
}
