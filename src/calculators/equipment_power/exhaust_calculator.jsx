import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput
} from "app/calculators/components/io";
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
            exchangeTime: 3
        };
    }

    getRoomVolume() {
        return (
            this.state.growSpaceWidthFt *
            this.state.growSpaceLengthFt *
            this.state.growSpaceHeightFt
        );
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
                    Note that this is for pure airflow; this does not account
                    for pressure lost due to bends in ducting, dust, etc. which
                    is highly duct- and layout-specific.
                </p>
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
                                    growSpaceLengthFt: Number(val)
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceLengthFt}
                        />
                        <GenericInput
                            inputLabel="Room Height"
                            onChange={val =>
                                this.setState({
                                    growSpaceHeightFt: Number(val)
                                })
                            }
                            conversionFactors={ConversionFactors.basicDistance}
                            number={this.state.growSpaceHeightFt}
                        />
                        <FixedUnitInput
                            inputLabel="Fan Count"
                            onChange={val =>
                                this.setState({ fanCount: Number(val) })
                            }
                            number={this.state.fanCount}
                            unit="fans"
                        />
                        <FixedUnitInput
                            inputLabel="Exchange Time"
                            onChange={val =>
                                this.setState({ exchangeTime: Number(val) })
                            }
                            number={this.state.exchangeTime}
                            unit="minutes to total air flush"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Room Volume"
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
                    </div>
                </div>
            </div>
        );
    }
}
