import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class NpkToTDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 250,
            p: 17.5,
            k: 16.6,
            mlPerL: 1
        };
    }

    getN() {
        const percent = this.state.mlPerL * 10;
        return this.state.n / percent;
    }

    getP() {
        const percent = this.state.mlPerL * 10;
        const elementalPhosphorusInP2O5 = 0.43641;
        return this.state.p / elementalPhosphorusInP2O5 / percent;
    }

    getK() {
        const percent = this.state.mlPerL * 10;
        const elementalPotassiumInK20 = 0.83014;
        return this.state.k / elementalPotassiumInK20 / percent;
    }

    render() {
        return (
            <div>
                <p>Assumes elementals present as N, P₂O₅ and K₂O.</p>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Fert. PPM N"
                            number={this.state.n}
                            onChange={val => this.setState({ n: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM P"
                            number={this.state.p}
                            onChange={val => this.setState({ p: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM K"
                            number={this.state.k}
                            onChange={val => this.setState({ k: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Added Amount"
                            number={this.state.mlPerL}
                            onChange={val =>
                                this.setState({ mlPerL: Number(val) })
                            }
                            unit="ml/liter"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Final N"
                            number={defaultRound(this.getN())}
                            unit="PPM TDS"
                        />
                        <FixedUnitOutput
                            outputLabel="Final P"
                            number={defaultRound(this.getP())}
                            unit="PPM TDS"
                        />
                        <FixedUnitOutput
                            outputLabel="Final K"
                            number={defaultRound(this.getK())}
                            unit="PPM TDS"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
