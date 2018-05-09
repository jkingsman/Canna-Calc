import React from "react";

import { GenericInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";

export default class LightingCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lumensNeededSqFt: 8000,
            wattageNeededSqFt: 45,
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 8,
        };
    }

    getArea() {
        return this.state.growSpaceWidthFt * this.state.growSpaceLengthFt;
    }

    getLumensNeeded() {
        const lumensNeeded = this.getArea() * this.state.lumensNeededSqFt;
        return Math.round(lumensNeeded);
    }

    getWattsNeeded() {
        const wattsNeeded = this.getArea() * this.state.wattageNeededSqFt;
        return Math.round(wattsNeeded);
    }

    render() {
        return (
            <div className="container">
                <p>Determine necessary illumination for a given area.</p>
                <EquationBlock
                    equations={[
                        "Illumination Needed = Grow Area Width * Grow Area Length * Desired Lumens",
                        "Watts Needed = Grow Area Width * Grow Area Length * Desired Wattage",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Desired Lumens*"
                            onChange={val => this.setState({ lumensNeededSqFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicArea}
                            number={this.state.lumensNeededSqFt}
                            per
                        />
                        <GenericInput
                            inputLabel="Desired Watts"
                            onChange={val =>
                                this.setState({
                                    wattageNeededSqFt: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicArea}
                            number={this.state.wattageNeededSqFt}
                            per
                        />
                        <GenericInput
                            inputLabel="Grow Area Width"
                            onChange={val => this.setState({ growSpaceWidthFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceWidthFt}
                        />
                        <GenericInput
                            inputLabel="Grow Area Length"
                            onChange={val =>
                                this.setState({
                                    growSpaceLengthFt: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceLengthFt}
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Illumination Needed"
                            number={this.getLumensNeeded()}
                            unit="lumens"
                        />
                        <FixedUnitOutput
                            outputLabel="Watts Needed"
                            number={this.getWattsNeeded()}
                            unit="watts"
                        />
                    </div>
                    <i>
                        *Although lumens are a more precise measure of actual light output, watts
                        have become a de facto standard -- when in doubt, use watts and disregard
                        lumens.
                    </i>
                </div>
            </div>
        );
    }
}
