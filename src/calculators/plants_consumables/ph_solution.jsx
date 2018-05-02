import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    GenericOutput,
    FixedUnitOutput,
} from "app/calculators/components/io";

import ConversionFactors from "app/utils/conversion_factors";

export default class pHConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startpH: 8,
            startVolume: 10,
            additivepH: 6,
            desiredpH: 7,
        };
    }

    getVolume() {
        const startMolarity = Math.pow(10, this.state.startpH * -1);
        const additiveMolarity = Math.pow(10, this.state.additivepH * -1);
        const desiredMolarity = Math.pow(10, this.state.desiredpH * -1);

        const additiveVolume =
            (desiredMolarity - startMolarity) *
            this.state.startVolume /
            (additiveMolarity - startMolarity);
        return additiveVolume;
    }

    render() {
        return (
            <div>
                <p>
                    Adjust pH of solution up or down with a known additive pH. Some common additive
                    pHs:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>pH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lemon (down)</td>
                            <td>~1</td>
                        </tr>
                        <tr>
                            <td>Vinegar (down)</td>
                            <td>~2.4</td>
                        </tr>
                        <tr>
                            <td>Calcium nitrate (down)</td>
                            <td>~5.75</td>
                        </tr>
                        <tr>
                            <td>Sodium bicarbonate (up)&nbsp;</td>
                            <td>~9</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Start pH"
                            number={this.state.startpH}
                            onChange={val => this.setState({ startpH: Number(val) })}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Start Volume"
                            onChange={val => this.setState({ startVolume: Number(val) })}
                            conversionFactors={ConversionFactors.volume}
                            number={this.state.startVolume}
                        />
                        <FixedUnitInput
                            inputLabel="Desired pH"
                            number={this.state.desiredpH}
                            onChange={val => this.setState({ desiredpH: Number(val) })}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Adjuster pH"
                            number={this.state.additivepH}
                            onChange={val => this.setState({ additivepH: Number(val) })}
                            unit=""
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Start Mol."
                            number={Math.pow(10, this.state.startpH * -1) / 1e-6}
                            unit="µmol"
                        />
                        <FixedUnitOutput
                            outputLabel="Additive Mol."
                            number={Math.pow(10, this.state.additivepH * -1) / 1e-6}
                            unit="µmol"
                        />
                        <FixedUnitOutput
                            outputLabel="Desire Mol."
                            number={Math.pow(10, this.state.desiredpH * -1) / 1e-6}
                            unit="µmol"
                        />
                        <GenericOutput
                            outputLabel="Additive Vol."
                            number={this.getVolume()}
                            conversionFactors={ConversionFactors.volume}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
