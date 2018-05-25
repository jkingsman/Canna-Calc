import React from "react";

import { GenericInput, FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class DeliveredLightingCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaSqFt: 100,
            light1Lumens: 860,
            light1Count: 4,
            light2Lumens: 2600,
            light2Count: 1,
            light3Lumens: 1000,
            light3Count: 1,
            light4Lumens: 2000,
            light4Count: 1,
        };
    }

    getTotalIllumination() {
        return (this.state.light1Count * this.state.light1Lumens) + (this.state.light2Count * this.state.light2Lumens) + (this.state.light3Count * this.state.light3Lumens) + (this.state.light4Count * this.state.light4Lumens);
    }

    getAreaIllumination() {
        return this.getTotalIllumination() / this.state.areaSqFt;
    }

    render() {
        return (
            <div className="container">
                <p>Determine the lumnens per area for given lights</p>
                <EquationBlock
                    equations={[
                        "Total Illumination = sum(Light X Count * Light X Lumens)",
                        "Illumination per Area = Total Illumination / Area",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Room Area"
                            onChange={val => this.setState({ areaSqFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicArea}
                            number={this.state.areaSqFt}
                        />
                        <FixedUnitInput
                            inputLabel="Light 1 Lumens"
                            onChange={val => this.setState({ light1Lumens: Number(val) })}
                            number={this.state.light1Lumens}
                            unit="lumens"
                        />
                        <FixedUnitInput
                            inputLabel="Light 1 Count"
                            onChange={val => this.setState({ light1Count: Number(val) })}
                            number={this.state.light1Count}
                            unit="lights"
                        />
                        <FixedUnitInput
                            inputLabel="Light 2 Lumens"
                            onChange={val => this.setState({ light2Lumens: Number(val) })}
                            number={this.state.light2Lumens}
                            unit="lumens"
                        />
                        <FixedUnitInput
                            inputLabel="Light 2 Count"
                            onChange={val => this.setState({ light2Count: Number(val) })}
                            number={this.state.light2Count}
                            unit="lights"
                        />
                        <FixedUnitInput
                            inputLabel="Light 3 Lumens"
                            onChange={val => this.setState({ light3Lumens: Number(val) })}
                            number={this.state.light3Lumens}
                            unit="lumens"
                        />
                        <FixedUnitInput
                            inputLabel="Light 3 Count"
                            onChange={val => this.setState({ light3Count: Number(val) })}
                            number={this.state.light3Count}
                            unit="lights"
                        />
                        <FixedUnitInput
                            inputLabel="Light 4 Lumens"
                            onChange={val => this.setState({ light4Lumens: Number(val) })}
                            number={this.state.light4Lumens}
                            unit="lumens"
                        />
                        <FixedUnitInput
                            inputLabel="Light 4 Count"
                            onChange={val => this.setState({ light4Count: Number(val) })}
                            number={this.state.light4Count}
                            unit="lights"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Room Area"
                            number={this.state.areaSqFt}
                            unit="ft²"
                        />
                        <FixedUnitOutput
                            outputLabel="Total Illumination"
                            number={this.getTotalIllumination()}
                            unit="lumens"
                        />
                        <FixedUnitOutput
                            outputLabel="Illumination per ft²"
                            number={defaultRound(this.getAreaIllumination())}
                            unit="lumens/ft²"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
