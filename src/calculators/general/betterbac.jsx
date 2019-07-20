import React from "react";

import {
    FreeInput,
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
    CollapseBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

export default class BetterBAC extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            abvIn: 40,
            amountIn: 3,
            numberConsumed: 1,
            drinks: [],
            weight: 240,
            height: 76,
            isMale: true,
            maleMetabolic: 0.015,
            femaleMetabolic: 0.017,
            drinkTime: new Date().toLocaleTimeString(),
            drinkDate: new Date().toLocaleDateString(),
        };

        let state = localStorage.getItem("state");
        if (state && JSON.parse(state).drinks.length > 0) {
            this.state = JSON.parse(state);
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

    getWidmarkBAC(time) {
        let sd = this.getEthanol() * 23.342386982 / 10; // 1 fl oz ethanol = 23.3... grams; divide by ten for standard drinks
        let bw = this.state.isMale ? 0.58 : 0.49; // body water constant
        let kilos = this.state.weight * 0.453592;
        let mr = this.getMetClearance(); // metabolism constant

        let dp = 0;
        if (time > this.getLastDrinkTime()) {
            dp = (time - this.getLastDrinkTime()) / 1000 / 60 / 60; // time in hours
        }

        let bac = 0.806 * sd * 1.2 / (bw * kilos) - mr * dp;

        return Math.max(bac, 0);
    }

    getSmartRWidmarkBAC(time) {
        const alcoholGrams = this.getEthanol() * 23.342386982; // 1 fl oz ethanol = 23.3... grams
        const kilos = this.state.weight * 0.453592;
        const widmark = this.getWidmarkR();
        const mr = this.getMetClearance(); // metabolism constant

        let dp = 0;
        if (time > this.getLastDrinkTime()) {
            dp = (time - this.getLastDrinkTime()) / 1000 / 60 / 60; // time in hours
        }

        return Math.max(alcoholGrams / (widmark * kilos) / 10 - mr * dp, 0);
    }

    getWidmarkDecayBAC(time) {
        if (time < this.getFirstDrinkTime()) {
            return 0;
        }

        const metabolicDecay = this.getMetClearance() / 60 / 60; // hourly decay to seconds
        const bw = this.state.isMale ? 0.58 : 0.49; // body water constant
        const kilos = this.state.weight * 0.453592;

        let drinks = {};
        this.state.drinks.forEach(drink => (drinks[drink.time] = drink.etoh * drink.number));

        let lastVal = 0;
        for (let i = this.getFirstDrinkTime(); i <= time; i += 1000) {
            if (drinks.hasOwnProperty(i)) {
                const sd = drinks[i] * 23.342386982 / 10; // 1 fl oz ethanol = 23.3... grams; divide by ten for standard drinks
                lastVal += 0.806 * sd * 1.2 / (bw * kilos);
            } else {
                lastVal -= metabolicDecay;
            }
        }

        return Math.max(lastVal, 0);
    }

    getSmartRWidmarkDecayBAC(time) {
        if (time < this.getFirstDrinkTime()) {
            return 0;
        }

        const metabolicDecay = this.getMetClearance() / 60 / 60; // hourly decay to seconds
        const kilos = this.state.weight * 0.453592;
        const widmark = this.getWidmarkR();

        let drinks = {};
        this.state.drinks.forEach(drink => (drinks[drink.time] = drink.etoh * drink.number));

        let lastVal = 0;
        for (let i = this.getFirstDrinkTime(); i <= time; i += 1000) {
            if (drinks.hasOwnProperty(i)) {
                lastVal += drinks[i] * 23.342386982 / (widmark * kilos) / 10;
            } else {
                lastVal -= metabolicDecay;
            }
        }

        return Math.max(lastVal, 0);
    }

    getFirstDrinkTime() {
        return Math.min(...this.state.drinks.map(drink => drink.time));
    }

    getLastDrinkTime() {
        return Math.max(...this.state.drinks.map(drink => drink.time));
    }

    getMinsFromStart(mins) {
        return dayjs(this.state.drinkDate + " " + this.state.drinkTime)
            .add(mins, "minute")
            .format("HHmm");
    }

    getBMI() {
        return this.state.weight / Math.pow(this.state.height, 2) * 703;
    }

    getWidmarkR() {
        return this.state.isMale
            ? 1.0181 - 0.01213 * this.getBMI()
            : 0.9367 - 0.0124 * this.getBMI();
    }

    getMetClearance() {
        return this.state.isMale ? this.state.maleMetabolic : this.state.femaleMetabolic;
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

    getDriveStatusUnit(bac) {
        let statusEmoji;

        if (bac > 0.2) {
            statusEmoji = "🚨☠️☠️🚨";
        } else if (bac <= 0.2 && bac > 0.07) {
            statusEmoji = "🚨";
        } else if (bac <= 0.07 && bac >= 0.06) {
            statusEmoji = "❗";
        } else {
            statusEmoji = "👌";
        }

        return `%  ${statusEmoji}`;
    }

    renderDrinks() {
        this.getFirstDrinkTime();
        if (!this.state.drinks) {
            return null;
        }

        const drinkStrings = this.state.drinks
            .sort((drink1, drink2) => drink1.time - drink2.time)
            .map(drink => {
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
        if (this.state.drinks.length === 0) {
            return null;
        }

        const dataIntervalInMillis = 30 * 60 * 1000;  // 30 minutes
        const intervalsToRun = 15;
        let results = [];
        for (let i = 0; i <= intervalsToRun; i++) {
            let time = this.getFirstDrinkTime() + i * dataIntervalInMillis;
            results.push({
                time: new Date(time).toLocaleTimeString(),
                timeObj: new Date(time),
                widmarkBAC: this.getWidmarkBAC(time),
                decayBAC: this.getWidmarkDecayBAC(time),
                smartRWidmarkBAC: this.getSmartRWidmarkBAC(time),
                smartRWidmarkDecayBAC: this.getSmartRWidmarkDecayBAC(time),
            });
        }

        const data = {
            // Labels should be Date objects
            labels: results.map(drink => drink.timeObj),
            datasets: [
                {
                    fill: false,
                    label: "Widmark",
                    data: results.map(drink => drink.widmarkBAC),
                    borderColor: "#fe8b36",
                    backgroundColor: "#fe8b36",
                },
                {
                    fill: false,
                    label: "Widmark Decay",
                    data: results.map(drink => drink.decayBAC),
                    borderColor: "#66a1ff",
                    backgroundColor: "#66a1ff",
                },
                {
                    fill: false,
                    label: "Smart-R Widmark",
                    data: results.map(drink => drink.smartRWidmarkBAC),
                    borderColor: "#c466ff",
                    backgroundColor: "#c466ff",
                },
                {
                    fill: false,
                    label: "Smart-R Widmark Decay",
                    data: results.map(drink => drink.smartRWidmarkDecayBAC),
                    borderColor: "#66ffcf",
                    backgroundColor: "#66ffcf",
                },
                {
                    fill: false,
                    label: "Driving Limit",
                    data: results.map(() => .08),
                    borderColor: "#ff0000",
                    backgroundColor: "#ff0000",
                },
            ],
        };

        const options = {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            displayFormats: {
                                minute: "h:mm a",
                            },
                        },
                    },
                ],
            },
        };

        return (
            <div className="row">
                <div className="col-sm">
                    <hr />
                    <Line data={data} options={options} />
                    <CollapseBlock name="Data">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Widmark</th>
                                    <th>Smart-R Widmark</th>
                                    <th>Widmark Rolling Decay</th>
                                    <th>Smart-R Widmark Rolling Decay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, i) => (
                                    <tr key={i}>
                                        <td>{result.time}</td>
                                        <td>
                                            {defaultRound(result.widmarkBAC)}{" "}
                                            {this.getDriveStatusUnit(result.widmarkBAC)}
                                        </td>
                                        <td>
                                            {defaultRound(result.smartRWidmarkBAC)}{" "}
                                            {this.getDriveStatusUnit(result.smartRWidmarkBAC)}
                                        </td>
                                        <td>
                                            {defaultRound(result.decayBAC)}{" "}
                                            {this.getDriveStatusUnit(result.decayBAC)}
                                        </td>
                                        <td>
                                            {defaultRound(result.smartRWidmarkDecayBAC)}{" "}
                                            {this.getDriveStatusUnit(result.smartRWidmarkDecayBAC)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <hr />
                    </CollapseBlock>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    clearLocal() {
        this.setState(
            {
                drinks: [],
                drinkTime: new Date().toLocaleTimeString(),
                drinkDate: new Date().toLocaleDateString(),
            },
            function() {
                localStorage.setItem("state", JSON.stringify(this.state));
            }
        );
    }

    render() {
        return (
            <div className="container">
                {this.renderDrinks()}
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
                        <CollapseBlock name="Settings">
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
                            <FixedUnitInput
                                inputLabel="Weight"
                                onChange={val => this.setState({ weight: Number(val) })}
                                number={this.state.weight}
                                unit="lbs"
                            />
                            <FixedUnitInput
                                inputLabel="Height"
                                onChange={val => this.setState({ height: Number(val) })}
                                number={this.state.height}
                                unit="in"
                            />
                            <FixedUnitInput
                                inputLabel="Met. Clear. Rate (M)"
                                onChange={val => this.setState({ maleMetabolic: Number(val) })}
                                number={this.state.maleMetabolic}
                                unit="mg/mL per hr"
                            />
                            <FixedUnitInput
                                inputLabel="Met. Clear. Rate (F)"
                                onChange={val => this.setState({ femaleMetabolic: Number(val) })}
                                number={this.state.femaleMetabolic}
                                unit="mg/mL per hr"
                            />
                            <FixedUnitOutput
                                outputLabel="BMI"
                                number={defaultRound(this.getBMI())}
                                unit="(calculated)"
                            />
                            <FixedUnitOutput
                                outputLabel="Widmark-R Value"
                                number={defaultRound(this.getWidmarkR())}
                                unit="(calculated)"
                            />
                        </CollapseBlock>
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
                    </div>
                </div>
                {this.renderBACTable()}
            </div>
        );
    }
}
