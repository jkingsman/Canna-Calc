import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class CO2Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            volumeReductionFt3: 0,
            ambientPPM: 400,
            desiredPPM: 1500,
            minutesOn: 15,
        };
    }

    getTimeOnFraction() {
        return this.state.minutesOn / 60;
    }

    getRoomVolume() {
        return (
            this.state.growSpaceWidthFt *
                this.state.growSpaceLengthFt *
                this.state.growSpaceHeightFt -
            this.state.volumeReductionFt3
        );
    }

    getAddtlPPM() {
        return this.state.desiredPPM - this.state.ambientPPM;
    }

    getFt3HrFlowRate() {
        return this.getAddtlPPM() * 1e-6 * this.getRoomVolume();
    }

    getTimedFtHrFlowRate() {
        return this.getFt3HrFlowRate() / this.getTimeOnFraction();
    }

    render() {
        return (
            <div className="container">
                <p>
                    Determine CO₂ flow rate necessary for CO₂ supplementation to
                    desired concentation.
                </p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Room Width"
                            onChange={val =>
                                this.setState({ growSpaceWidthFt: Number(val) })
                            }
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
                            inputLabel="Ambient CO₂"
                            onChange={val =>
                                this.setState({ ambientPPM: Number(val) })
                            }
                            number={this.state.ambientPPM}
                            unit="ppm"
                        />
                        <FixedUnitInput
                            inputLabel="Desired CO₂"
                            onChange={val =>
                                this.setState({ desiredPPM: Number(val) })
                            }
                            number={this.state.desiredPPM}
                            unit="ppm"
                        />
                        <FixedUnitInput
                            inputLabel="Minutes On"
                            onChange={val =>
                                this.setState({ minutesOn: Number(val) })
                            }
                            number={this.state.minutesOn}
                            unit="per hour"
                        />
                        <GenericInput
                            inputLabel="Volume Compensation*"
                            onChange={val =>
                                this.setState({
                                    volumeReductionFt3: Number(val),
                                })
                            }
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.volumeReductionFt3}
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Room Volume"
                            number={defaultRound(this.getRoomVolume())}
                            unit="ft³"
                        />
                        <FixedUnitOutput
                            outputLabel="Desired Addtl. CO₂"
                            number={defaultRound(this.getAddtlPPM())}
                            unit="ppm"
                        />
                        <FixedUnitOutput
                            outputLabel="CO₂ Flow Rate"
                            number={defaultRound(this.getTimedFtHrFlowRate())}
                            unit="SCFH (ft³/hr)"
                        />
                        <FixedUnitOutput
                            noColon
                            number={defaultRound(
                                this.getTimedFtHrFlowRate() / 60
                            )}
                            unit="SCFM (ft³/min)"
                        />
                    </div>
                </div>
                <i>
                    *Room volume does not account for space taken by ducting,
                    fans, plant holders, etc. -- enter approximate volume
                    consumed by objects in room here increase volume accuracy.
                    For ducting, use the Cylinder Volume calculator with length
                    of ducting as cylinder height.
                </i>
            </div>
        );
    }
}
