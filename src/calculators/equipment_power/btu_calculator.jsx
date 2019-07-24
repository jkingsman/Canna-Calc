import React from "react";

import { FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class BTUCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightWattage: 700,
            lightCount: 10,
            co2BTUs: 17000,
            co2Count: 1,
            dehumWattage: 300,
            dehumCount: 1,
        };
    }

    getBTUs() {
        const BTUsPerWatt = 3.412;

        const lightWattage = this.state.lightWattage * this.state.lightCount;
        const co2BTUs = this.state.co2BTUs * this.state.co2Count;
        const dehumWattage = this.state.dehumWattage * this.state.dehumCount;

        return (lightWattage + dehumWattage) * BTUsPerWatt + co2BTUs;
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
                <p>BTU calculations assume 3.412 BTUs/Watt</p>
                <EquationBlock
                    equations={[
                        "[BTUs per Watt = 3.4.12]",
                        "[Total Light Wattage = Single Light Wattage * Light Count]",
                        "[Total CO₂ BTUs = CO₂ Generator BTUs * CO₂ Generator Count]",
                        "[Total Dehumidifier Wattage = Dehumidifier Wattage * Dehumidifier Count]",
                        "BTUs per Hour = (Total Light Wattage + Total Dehumidifier Wattage) * BTUs per Watt + Total CO₂ BTUs",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Single Light Wattage"
                            onChange={val => this.setState({ lightWattage: Number(val) })}
                            number={this.state.lightWattage}
                            unit="watts"
                        />
                        <FixedUnitInput
                            inputLabel="Light Count"
                            onChange={val => this.setState({ lightCount: Number(val) })}
                            number={this.state.lightCount}
                            unit="lights"
                        />
                        <FixedUnitInput
                            inputLabel="CO₂ Generator BTUs"
                            onChange={val => this.setState({ co2BTUs: Number(val) })}
                            number={this.state.co2BTUs}
                            unit="BTUs"
                        />
                        <FixedUnitInput
                            inputLabel="CO₂ Generators"
                            onChange={val => this.setState({ co2Count: Number(val) })}
                            number={this.state.co2Count}
                            unit="generators"
                        />
                        <FixedUnitInput
                            inputLabel="Dehumidifier Wattage"
                            onChange={val => this.setState({ dehumWattage: Number(val) })}
                            number={this.state.dehumWattage}
                            unit="watts"
                        />
                        <FixedUnitInput
                            inputLabel="Dehumidifiers"
                            onChange={val => this.setState({ dehumCount: Number(val) })}
                            number={this.state.dehumCount}
                            unit="dehumidifiers"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="BTUs/Hr"
                            number={defaultRound(this.getBTUs())}
                            unit="BTUs"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
