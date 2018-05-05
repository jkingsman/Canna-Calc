import React from "react";

import { GenericInput, FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class ExhaustCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            fanCount: 2,
            exchangeTime: 3,
            carbonFactor: 20,
            carbonCount: 0,
            hidLights1kWFactor: 10,
            hidLightsCount: 0,
        };
    }

    getRoomVolume() {
        const trueVolume =
            this.state.growSpaceWidthFt *
            this.state.growSpaceLengthFt *
            this.state.growSpaceHeightFt;
        const correctionFactor =
            this.state.carbonFactor * this.state.carbonCount +
            this.state.hidLights1kWFactor * this.state.hidLightsCount;
        const correctionFactorMultiplied = correctionFactor / 100 + 1;
        return trueVolume * correctionFactorMultiplied;
    }

    getFlowRate() {
        return this.getRoomVolume() / this.state.exchangeTime;
    }

    getSingleFanFlow() {
        return this.getFlowRate() / this.state.fanCount;
    }

    render() {
        return (
            <div className="container">
                <p>
                    Note that this is for pure airflow; this does not account for pressure lost due
                    to bends in ducting, dust, etc. which is highly duct- and layout-specific.
                </p>
                <EquationBlock equations={[
                    "Room Volume = (Width * Length * Height) + (Carbon Filter Count * Carbon Filter Correction) + (HID Light Count * HID Light Correction)",
                    "Min. Total Flow = Room Volume / Exchange Time",
                    "Min. Fan Flow Each = Min. Total Flow / Fan Count"
                ]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Room Width"
                            onChange={val => this.setState({ growSpaceWidthFt: Number(val) })}
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceWidthFt}
                        />
                        <GenericInput
                            inputLabel="Room Length"
                            onChange={val =>
                                this.setState({
                                    growSpaceLengthFt: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceLengthFt}
                        />
                        <GenericInput
                            inputLabel="Room Height"
                            onChange={val =>
                                this.setState({
                                    growSpaceHeightFt: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceHeightFt}
                        />
                        <FixedUnitInput
                            inputLabel="Fan Count"
                            onChange={val => this.setState({ fanCount: Number(val) })}
                            number={this.state.fanCount}
                            unit="fans"
                        />
                        <FixedUnitInput
                            inputLabel="Exchange Time"
                            onChange={val => this.setState({ exchangeTime: Number(val) })}
                            number={this.state.exchangeTime}
                            unit="minutes to total air flush"
                        />
                        <hr />
                        <i>
                            Some sites recommend adding a compensation factor for high-heat or
                            airflow-resistant sources such as HID lights and carbon filters. You can
                            specify the correction and the number of such devices here, if desired;
                            the room volume will be adjusted by the given percentage for each
                            device. Common factors have been provided.
                        </i>
                        <FixedUnitInput
                            inputLabel="Carbon Filter Count"
                            onChange={val => this.setState({ carbonCount: Number(val) })}
                            number={this.state.carbonCount}
                            unit="filters"
                        />
                        <FixedUnitInput
                            inputLabel="Carbon Filter Correction"
                            onChange={val => this.setState({ carbonFactor: Number(val) })}
                            number={this.state.carbonFactor}
                            unit="%"
                        />
                        <FixedUnitInput
                            inputLabel="1kW HID Light Count"
                            onChange={val => this.setState({ hidLightsCount: Number(val) })}
                            number={this.state.hidLightsCount}
                            unit="lights"
                        />
                        <FixedUnitInput
                            inputLabel="1kW HID Light Correction"
                            onChange={val => this.setState({ hidLights1kWFactor: Number(val) })}
                            number={this.state.hidLights1kWFactor}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Room Volume*"
                            number={defaultRound(this.getRoomVolume())}
                            unit="ft³"
                        />
                        <FixedUnitOutput
                            outputLabel="Min. Total Flow"
                            number={defaultRound(this.getFlowRate())}
                            unit="SCFM (ft³/min)"
                        />
                        <FixedUnitOutput
                            outputLabel="Min. Fan Flow Each"
                            number={defaultRound(this.getSingleFanFlow())}
                            unit="SCFM (ft³/min)"
                        />
                        <i>*Corrected for any given filters or HID lamps</i>
                    </div>
                </div>
            </div>
        );
    }
}
