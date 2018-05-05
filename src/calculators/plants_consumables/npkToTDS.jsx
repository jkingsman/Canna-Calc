import React from "react";

import { FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class NpkToTDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 25,
            nMP: 1,
            p: 4,
            pMP: 0.43641,
            k: 2,
            kMP: 0.83014,
            mlPerL: 1,
            sg: 1.0,
        };
    }

    getN() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const finalPercent = percentMixture * this.state.n; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * this.state.nMP * this.state.sg; // apply elemental and S.G. correction
    }

    getP() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const finalPercent = percentMixture * this.state.p; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * this.state.pMP * this.state.sg; // apply elemental and S.G. correction
    }

    getK() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const finalPercent = percentMixture * this.state.k; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * this.state.kMP * this.state.sg; // apply elemental and S.G. correction
    }

    render() {
        return (
            <div>
                <p>
                    Convert from delivery-molecule-bound nitrogen, phosphorus, and potassium
                    percentages (&quot;NPK&quot; values on fertilizer) to PPM TDS at a given
                    dilution ration.
                </p>
                <EquationBlock equations={[
                    "[Percent Mixture = Added Amount / 1000]",
                    "[Final Percent = Percent Mixture * Fertilizer N]",
                    "[Final PPM = Final Percent * 10000]",
                    "Diluted Element = Final PPM * Mass Percent * S.G. Override"
                ]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Fertilizer N"
                            number={this.state.n}
                            onChange={val => this.setState({ n: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fertilizer P"
                            number={this.state.p}
                            onChange={val => this.setState({ p: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fertilizer K"
                            number={this.state.k}
                            onChange={val => this.setState({ k: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Added Amount"
                            number={this.state.mlPerL}
                            onChange={val => this.setState({ mlPerL: Number(val) })}
                            unit="ml/liter"
                        />
                        <FixedUnitInput
                            inputLabel="S.G. Override*"
                            number={this.state.sg}
                            onChange={val => this.setState({ sg: Number(val) })}
                            unit=""
                        />
                        <i>
                            *In cases of a %w/v solution, enter the specific gravity of the
                            fertilizer to correct for non-1.0 S.G. conversions.
                        </i>
                        <hr />
                        <i>
                            Mass percentage composition of elemental NPK in molecular NPK delivery
                            substance; percentage given 0.00 - 1.00 inclusive. Presets assume
                            elementals present as N, P₂O₅ and K₂O. If you don&#39;t know what this
                            means, don&#39;t touch it.
                        </i>
                        <FixedUnitInput
                            inputLabel="N Mass Percent"
                            number={this.state.nMP}
                            onChange={val => this.setState({ nMP: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="P Mass Percent"
                            number={this.state.pMP}
                            onChange={val => this.setState({ pMP: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="K Mass Percent"
                            number={this.state.kMP}
                            onChange={val => this.setState({ kMP: Number(val) })}
                            unit=""
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Diluted N"
                            number={defaultRound(this.getN())}
                            unit="PPM TDS"
                        />
                        <FixedUnitOutput
                            outputLabel="Diluted P"
                            number={defaultRound(this.getP())}
                            unit="PPM TDS"
                        />
                        <FixedUnitOutput
                            outputLabel="Diluted K"
                            number={defaultRound(this.getK())}
                            unit="PPM TDS"
                        />
                        <FixedUnitOutput
                            outputLabel="Total Diluted"
                            number={defaultRound(this.getN() + this.getP() + this.getK())}
                            unit="PPM TDS"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
