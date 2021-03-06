import React from "react";

import { FixedUnitInput, FixedUnitOutput, EquationBlock } from "app/calculators/components/io";
import { defaultRound } from "app/utils/math";

export default class NpkToTDS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nPPM: 250000,
            nMP: 1,
            pPPM: 17500,
            pMP: 0.43641,
            kPPM: 16600,
            kMP: 0.83014,
        };
    }

    getN() {
        const naivePercentage = this.state.nPPM / 10000; // 1 - 100
        return naivePercentage / this.state.nMP;
    }

    getP() {
        const naivePercentage = this.state.pPPM / 10000; // 1 - 100
        return naivePercentage / this.state.pMP;
    }

    getK() {
        const naivePercentage = this.state.kPPM / 10000; // 1 - 100
        return naivePercentage / this.state.kMP;
    }

    render() {
        return (
            <div>
                <p>
                    Convert from nitrogen, phosphorus, and potassium as elemental PPM of a solution
                    to delivery-molecule-bound mass percentages (&quot;NPK&quot; numbers on
                    fertilizer).
                </p>
                <EquationBlock equations={["Element Percentage = (PPM / 10000) / Mass Percent"]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Fert. PPM N"
                            number={this.state.nPPM}
                            onChange={val => this.setState({ nPPM: Number(val) })}
                            unit="PPM"
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM P"
                            number={this.state.pPPM}
                            onChange={val => this.setState({ pPPM: Number(val) })}
                            unit="PPM"
                        />
                        <FixedUnitInput
                            inputLabel="Fert. PPM K"
                            number={this.state.kPPM}
                            onChange={val => this.setState({ kPPM: Number(val) })}
                            unit="PPM"
                        />
                        <hr />
                        <i>
                            Mass percentage composition of elemental NPK in molecular NPK delivery
                            substance; percentage given 0.00 - 1.00 inclusive. Presets assume
                            elementals present as N, P₂O₅, and K₂O.
                        </i>
                        <FixedUnitInput
                            inputLabel="N Mass Fraction"
                            number={this.state.nMP}
                            onChange={val => this.setState({ nMP: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="P Mass Fraction"
                            number={this.state.pMP}
                            onChange={val => this.setState({ pMP: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="K Mass Fraction"
                            number={this.state.kMP}
                            onChange={val => this.setState({ kMP: Number(val) })}
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
