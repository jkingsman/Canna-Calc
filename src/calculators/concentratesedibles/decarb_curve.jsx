import React from "react";

import { GenericInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class DecarbCurve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 150,
        };
    }

    getDecarbTime() {
        return 4e12 * Math.pow(this.state.temperature, -5.117);
    }

    render() {
        return (
            <div className="container">
                <p>
                    This determines the approximate amount of time to completely decarboxylate dry
                    cannabis material based on data from scientific sources (more info in equation
                    block). These numbers are an estimate, and may vary based on plant potency,
                    density, and hydration. No data available for temperatures less than 100°C;
                    results are unreliable below that point.
                </p>
                <EquationBlock
                    equations={[
                        "Log best-fit curve determined from following sources' (identified by DOI and author) datapoints:",
                        "10.1016/j.forsciint.2015.07.019 (Taschwer et. al., 2016)",
                        "   180min @ 100°C",
                        "   60min @ 150°C",
                        "10.1055/s-0031-1298334 (Eichler, et. al.)",
                        "   12min @ 140°C",
                        "   5min @ 210°C",
                        "US7344736B2 (Patent)",
                        "   240min @ 105°C",
                        "   120min @ 120°C",
                        "   60min @ 140°C",
                        "",
                        "Power best-fit: Time [minutes] = 4e+12 * (Temperature [°C])^-5.117",
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
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="~100% Decarb Time"
                            number={defaultRound(this.getDecarbTime())}
                            unit="minutes"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
