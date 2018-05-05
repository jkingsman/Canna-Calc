import React from "react";

import { FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import { defaultRound, round } from "app/utils/math";

export default class WaterCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gphPerPlant: 2,
            hoursOnPerDay: 1,
            waterCost: 0.13,
            plantCount: 10,
        };
    }

    getGallonsPerDay() {
        return this.state.gphPerPlant * this.state.hoursOnPerDay * this.state.plantCount;
    }

    getCubicFeetPerDay() {
        return this.getGallonsPerDay() * 0.133680556;
    }

    getCostPerDay() {
        return round(this.getCubicFeetPerDay() * this.state.waterCost, 2);
    }

    render() {
        return (
            <div className="container">
                <p>Determine water usage and cost for a given number of plants and flow rate</p>
                <EquationBlock
                    equations={[
                        "Water Used per Day = Water Rate per Plant * Hours on per Day * Plant Count",
                        "Cost per Day = Water Used per Day * Water Cost",
                        "Water Used per Month = Water Used per Day * 31",
                        "Cost per Month = Water Used per Month * Water Cost",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Water Rate per Plant"
                            onChange={val => this.setState({ gphPerPlant: Number(val) })}
                            number={this.state.gphPerPlant}
                            unit="gal/hr (GPH)"
                        />
                        <FixedUnitInput
                            inputLabel="Hours On per Day"
                            onChange={val => this.setState({ hoursOnPerDay: Number(val) })}
                            number={this.state.hoursOnPerDay}
                            unit="hours"
                        />
                        <FixedUnitInput
                            inputLabel="Plant Count"
                            onChange={val => this.setState({ plantCount: Number(val) })}
                            number={this.state.plantCount}
                            unit="plants"
                        />
                        <FixedUnitInput
                            inputLabel="Water Cost"
                            onChange={val => this.setState({ waterCost: Number(val) })}
                            number={this.state.waterCost}
                            unit="dollars per ft³"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Water Used/Day"
                            number={defaultRound(this.getGallonsPerDay())}
                            unit="gal/day"
                        />
                        <FixedUnitOutput
                            outputLabel="Cost/Day"
                            prefix="$"
                            number={this.getCostPerDay()}
                        />
                        <FixedUnitOutput
                            outputLabel="Water Used/Month*"
                            number={defaultRound(this.getGallonsPerDay() * 31)}
                            unit="gal/mo"
                        />
                        <FixedUnitOutput
                            outputLabel="Cost/Month*"
                            prefix="$"
                            number={this.getCostPerDay() * 31}
                        />
                        <i>*Month assumes 31 days</i>
                    </div>
                </div>
            </div>
        );
    }
}
