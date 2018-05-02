import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    GenericOutput,
} from "app/calculators/components/io";

import ConversionFactors from "app/utils/conversion_factors";

import { defaultRound } from "app/utils/math";

export default class TDSDilution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTDS: 700,
            currentVol: 1,
            targetTDS: 100,
            additiveTDS: 25,
        };
    }

    getVolume() {
        //C1V1 + C2V2 = C3(V1 + V2)
        const additiveVolume =
            (this.state.targetTDS - this.state.currentTDS) *
            this.state.currentVol /
            (this.state.additiveTDS - this.state.targetTDS);
        return additiveVolume;
    }

    render() {
        return (
            <div>
                <p>
                    Compute needed dilution to achieve target dissolved solids.
                    For dilution with pure distilled water, use Additive TDS =
                    0.00.
                </p>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Current TDS"
                            number={this.state.currentTDS}
                            onChange={val =>
                                this.setState({ currentTDS: Number(val) })
                            }
                            unit="ppm TDS"
                        />
                        <GenericInput
                            inputLabel="Current Volume"
                            onChange={val =>
                                this.setState({ currentVol: Number(val) })
                            }
                            conversionFactors={ConversionFactors.volume}
                            number={this.state.currentVol}
                        />
                        <FixedUnitInput
                            inputLabel="Target TDS"
                            number={this.state.targetTDS}
                            onChange={val =>
                                this.setState({ targetTDS: Number(val) })
                            }
                            unit="ppm TDS"
                        />
                        <FixedUnitInput
                            inputLabel="Additive TDS"
                            number={this.state.additiveTDS}
                            onChange={val =>
                                this.setState({ additiveTDS: Number(val) })
                            }
                            unit="ppm TDS"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Additive Vol."
                            number={defaultRound(this.getVolume())}
                            conversionFactors={ConversionFactors.volume}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
