import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class NpkToTDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 25,
            p: 4,
            k: 2,
            mlPerL: 1,
            sg: 1.0,
        };
    }

    getN() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const elementalNinN = 1;
        const finalPercent = percentMixture * this.state.n; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * elementalNinN * this.state.sg; // apply elemental and S.G. correction
    }

    getP() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const elementalPhosphorusInP2O5 = 0.43641;
        const finalPercent = percentMixture * this.state.p; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * elementalPhosphorusInP2O5 * this.state.sg; // apply elemental and S.G. correction
    }

    getK() {
        const percentMixture = this.state.mlPerL / 1000; // 0.00 - 1.00
        const elementalPotassiumInK20 = 0.83014;
        const finalPercent = percentMixture * this.state.k; // 0 - 100
        const finalPPM = finalPercent * 10000; // ppm conversion
        return finalPPM * elementalPotassiumInK20 * this.state.sg; // apply elemental and S.G. correction
    }

    render() {
        return (
            <div>
                <p>
                    Assumes elementals present as N, P₂O₅ and K₂O. For true elemental P & K,
                    multiply by 2.2914 and 1.2046 respectively to correct.
                </p>
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
                <i>
                    *In cases of a %w/v solution, enter the specific gravity of the fertilizer to
                    correct for non-1.0 S.G. conversions.
                </i>
            </div>
        );
    }
}
