import React from "react";

import { FixedUnitInput, FixedUnitOutput } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class NpkToTDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nPPM: 250000,
            pPPM: 17500,
            kPPM: 16600,
        };
    }

    getN() {
        const naivePercentage = this.state.nPPM / 10000; // 1 - 100
        const elementalNinN = 1;
        return naivePercentage / elementalNinN;
    }

    getP() {
        const naivePercentage = this.state.pPPM / 10000; // 1 - 100
        const elementalPhosphorusInP2O5 = 0.43641;
        return naivePercentage / elementalPhosphorusInP2O5;
    }

    getK() {
        const naivePercentage = this.state.kPPM / 10000; // 1 - 100
        const elementalPotassiumInK20 = 0.83014;
        return naivePercentage / elementalPotassiumInK20;
    }

    render() {
        return (
            <div>
                <p>Assumes elementals present as N, P₂O₅ and K₂O.</p>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Fert. PPM N"
                            number={this.state.nPPM}
                            onChange={val => this.setState({ nPPM: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM P"
                            number={this.state.pPPM}
                            onChange={val => this.setState({ pPPM: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM K"
                            number={this.state.kPPM}
                            onChange={val => this.setState({ kPPM: Number(val) })}
                            unit=""
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="N"
                            number={defaultRound(this.getN())}
                            unit="%"
                        />
                        <FixedUnitOutput
                            outputLabel="P"
                            number={defaultRound(this.getP())}
                            unit="%"
                        />
                        <FixedUnitOutput
                            outputLabel="K"
                            number={defaultRound(this.getK())}
                            unit="%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
