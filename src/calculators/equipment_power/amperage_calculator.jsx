import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound, round } from "app/utils/math";

export default class AmperageCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watts: 700,
            voltage: 120,
            kWhCost: 0.12,
            hoursOnPerDay: 12,
            lightCount: 1,
        };
    }

    // W = A * V
    getAmps() {
        return this.state.watts / this.state.voltage * this.state.lightCount;
    }

    getKWhPerDay() {
        return this.state.watts * this.state.hoursOnPerDay * this.state.lightCount / 1000;
    }

    getCostPerDay() {
        return round(this.getKWhPerDay() * this.state.kWhCost, 2);
    }

    render() {
        return (
            <div className="container">
                <p>
                    <strong>Important note: </strong>
                    the wattage referred to here is not the light output wattage (i.e. how bright
                    the lights are). This is wattage in the true sense of power consumed by the
                    lights. This information can usually be found in the datasheet for your lights.
                    If no wattage is found, you can calculate it by multiplying the amperage the
                    lights consume by the voltage (usually 120 in the US). For example, a light
                    consuming 5 amps of power would consume 600 watts (5 amps * 120 volts).
                </p>
                <p>Month assumes 31 days.</p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Single Light Wattage"
                            onChange={val => this.setState({ watts: Number(val) })}
                            number={this.state.watts}
                            unit="watts"
                        />
                        <FixedUnitInput
                            inputLabel="Voltage"
                            onChange={val => this.setState({ voltage: Number(val) })}
                            number={this.state.voltage}
                            unit="volts"
                        />
                        <FixedUnitInput
                            inputLabel="Dollar Cost per kWh"
                            onChange={val => this.setState({ kWhCost: Number(val) })}
                            number={this.state.kWhCost}
                            unit="dollars"
                        />
                        <FixedUnitInput
                            inputLabel="Hours On per Day"
                            onChange={val => this.setState({ hoursOnPerDay: Number(val) })}
                            number={this.state.hoursOnPerDay}
                            unit="hours"
                        />
                        <FixedUnitInput
                            inputLabel="Light Count"
                            onChange={val => this.setState({ lightCount: Number(val) })}
                            number={this.state.lightCount}
                            unit="plants"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Total Amperage"
                            number={defaultRound(this.getAmps())}
                            unit="amps"
                        />
                        <FixedUnitOutput
                            outputLabel="Power per Day"
                            number={defaultRound(this.getKWhPerDay())}
                            unit="kWh/day"
                        />
                        <FixedUnitOutput
                            outputLabel="Cost/Day"
                            number={defaultRound(this.getCostPerDay())}
                            unit=""
                            prefix="$"
                        />
                        <FixedUnitOutput
                            outputLabel="Power per Month"
                            number={defaultRound(this.getKWhPerDay() * 31)}
                            unit="kWh/mo"
                        />
                        <FixedUnitOutput
                            outputLabel="Cost/Month"
                            number={defaultRound(this.getCostPerDay() * 31)}
                            unit=""
                            prefix="$"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
