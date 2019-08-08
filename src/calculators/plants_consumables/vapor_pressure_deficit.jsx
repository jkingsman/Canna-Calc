import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput,
    EquationBlock,
} from "app/calculators/components/io";

import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class VaporPressureDeficit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 20,
            leafTemperature: 19,
            relHumidity: 60,
        };
    }

    getVPSat(temp) {
        return 610.78 * Math.pow(Math.E, temp / (temp + 238.2) * 17.2694) / 1000;
    }

    getVPDAir() {
        return this.getVPSat(this.state.temperature) * (1 - this.state.relHumidity / 100);
    }

    getLeafVPD() {
        return (
            this.getVPSat(this.state.leafTemperature) -
            this.getVPSat(this.state.temperature) * this.state.relHumidity / 100
        );
    }

    render() {
        return (
            <div>
                <p>
                    Vapor pressure deficit is the difference between the present and saturated
                    moisture content of the air and affects plant transpiration. For most plants, a
                    VPD of between 0.4kPa and 0.1.25kPa is ideal; ideal conditions for cannabis vary
                    wildly depending on source but generally reside around 0.8kPa to 0.12kPa.
                </p>
                <EquationBlock
                    equations={[
                        "AirVPSat = 610.78 * e^(roomTempC / (roomTempC + 238.2) * 17.2694) / 1000",
                        "LeafVPSat = 610.78 * e^(leafTempC / (leafTempC + 238.2) * 17.2694) / 1000",
                        "Naive VPD = AirVPSat * (1 - relHumidity / 100)",
                        "Leaf VPD = LeafVPSat - AirVPSat * relHumidity / 100",
                        "Sourced from https://getpulse.co/blog/vpd",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Air Temperature"
                            onChange={val => this.setState({ temperature: Number(val) })}
                            conversionFactors={ConversionFactors.temperature}
                            number={this.state.temperature}
                        />
                        <GenericInput
                            inputLabel="Leaf Temperature"
                            onChange={val => this.setState({ leafTemperature: Number(val) })}
                            conversionFactors={ConversionFactors.temperature}
                            number={this.state.leafTemperature}
                        />
                        <FixedUnitInput
                            inputLabel="Rel. Humidity"
                            number={this.state.relHumidity}
                            onChange={val => this.setState({ relHumidity: Number(val) })}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Air VPSat"
                            number={defaultRound(this.getVPSat(this.state.temperature))}
                            unit="kPa"
                        />
                        <FixedUnitOutput
                            outputLabel="Leaf VPSat"
                            number={defaultRound(this.getVPSat(this.state.leafTemperature))}
                            unit="kPa"
                        />
                        <FixedUnitOutput
                            outputLabel="Naive VPD"
                            number={defaultRound(this.getVPDAir())}
                            unit="kPa"
                        />
                        <FixedUnitOutput
                            outputLabel="Leaf VPD"
                            number={defaultRound(this.getLeafVPD())}
                            unit="kPa"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
