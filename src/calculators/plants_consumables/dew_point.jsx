import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    GenericOutput,
    EquationBlock,
} from "app/calculators/components/io";

import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class DewPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 25,
            relHumidity: 65,
        };

        this.CONSTANTS = {
            A: 6.112,
            B: 17.67,
            C: 243.5,
        };
    }

    vapPressureHelper(relHumidity, temp) {
        return Math.log(relHumidity / 100) + this.CONSTANTS.B * temp / (this.CONSTANTS.C + temp);
    }

    getDewPoint() {
        const vapPressure = this.vapPressureHelper(this.state.relHumidity, this.state.temperature);
        return this.CONSTANTS.C * vapPressure / (this.CONSTANTS.B - vapPressure);
    }

    render() {
        return (
            <div>
                <p>Determine dew point.</p>
                <EquationBlock
                    equations={[
                        "Magnus formula:",
                        "Dew Point Constants are a = 6.112 mb, b = 17.67, c = 243.5 °C (Bolton/Monthly Weather)",
                        "[VaporPressureHelperValue = ln(RelHum. / 100) + ((b * Temp) / (c + Temp))]",
                        "Dew/Frost Point = (c * VaporPressureHelperValue) / (b - VaporPressureHelperValue)",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Temperature"
                            onChange={val => this.setState({ temperature: Number(val) })}
                            conversionFactors={ConversionFactors.temperature}
                            number={this.state.temperature}
                        />
                        <FixedUnitInput
                            inputLabel="Rel. Humidity"
                            number={this.state.relHumidity}
                            onChange={val => this.setState({ relHumidity: Number(val) })}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Dew Point"
                            number={defaultRound(this.getDewPoint())}
                            conversionFactors={ConversionFactors.temperature}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
