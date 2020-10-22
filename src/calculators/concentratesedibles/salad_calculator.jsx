import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    GenericOutput,
    FixedUnitOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import newId from "app/utils/unique_key";
import { defaultRound } from "app/utils/math";

export class Salad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product1Weight: 0,
            product1THC: 0,
            product1CBD: 0,

            product2Weight: 0,
            product2THC: 0,
            product2CBD: 0,

            product3Weight: 0,
            product3THC: 0,
            product3CBD: 0,

            product4Weight: 0,
            product4THC: 0,
            product4CBD: 0,
        };
    }

    getTotalWeight() {
        return (
            this.state.product1Weight +
            this.state.product2Weight +
            this.state.product3Weight +
            this.state.product4Weight
        );
    }

    getTotalTHC() {
        return (
            (this.state.product1Weight * this.state.product1THC +
                this.state.product2Weight * this.state.product2THC +
                this.state.product3Weight * this.state.product3THC +
                this.state.product4Weight * this.state.product4THC) /
            this.getTotalWeight()
        );
    }

    getTotalCBD() {
        return (
            (this.state.product1Weight * this.state.product1CBD +
                this.state.product2Weight * this.state.product2CBD +
                this.state.product3Weight * this.state.product3CBD +
                this.state.product4Weight * this.state.product4CBD) /
            this.getTotalWeight()
        );
    }

    render() {
        return (
            <div className="container">
                <h5>Known Ingredients</h5>
                <p>Determine the amount and potency of a final salad given known inputs.</p>
                <EquationBlock
                    equations={[
                        "Total weight = Σ(weight)",
                        "Potency = Σ(Single ingredient potency * Single ingredient amount) / Total weight",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Product 1"
                            onChange={val => this.setState({ product1Weight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.product1Weight}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product1THC: Number(val) })}
                            number={this.state.product1THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product1CBD: Number(val) })}
                            number={this.state.product1CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <GenericInput
                            inputLabel="Product 2"
                            onChange={val => this.setState({ product2Weight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.product2Weight}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product2THC: Number(val) })}
                            number={this.state.product2THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product2CBD: Number(val) })}
                            number={this.state.product2CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <GenericInput
                            inputLabel="Product 3"
                            onChange={val => this.setState({ product3Weight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.product3Weight}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product3THC: Number(val) })}
                            number={this.state.product3THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product3CBD: Number(val) })}
                            number={this.state.product3CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <GenericInput
                            inputLabel="Product 4"
                            onChange={val => this.setState({ product4Weight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.product4Weight}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product4THC: Number(val) })}
                            number={this.state.product4THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product4CBD: Number(val) })}
                            number={this.state.product4CBD}
                            unit="% CBD"
                            noColon={true}
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel="Final Product"
                            number={this.getTotalWeight()}
                            conversionFactors={ConversionFactors.basicWeight}
                            showSplitter={false}
                        />
                        <FixedUnitOutput
                            outputLabel=""
                            number={defaultRound(this.getTotalTHC())}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitOutput
                            outputLabel=""
                            number={defaultRound(this.getTotalCBD())}
                            unit="% CBD"
                            noColon={true}
                        />
                        <FixedUnitOutput
                            outputLabel="Ratio: 1THC to"
                            number={defaultRound(this.getTotalCBD() / this.getTotalTHC())}
                            unit="CBD"
                            noColon={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export class SaladGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product1Weight: 0,
            product1THC: 0,
            product1CBD: 0,

            product2Weight: 0,
            product2THC: 0,
            product2CBD: 0,

            product3Weight: 0,
            product3THC: 0,
            product3CBD: 0,

            product4Weight: 0,
            product4THC: 0,
            product4CBD: 0,

            cbdRatio: 1.5,

            maxElements: 4,
            minThc: 7,
        };
    }

    // https://stackoverflow.com/a/32544026
    combRep(arr, l) {
        if (l === void 0) l = arr.length;
        var data = Array(l),
            results = [];
        (function f(pos, start) {
            if (pos === l) {
                results.push(data.slice());
                return;
            }
            for (var i = start; i < arr.length; ++i) {
                data[pos] = arr[i];
                f(pos + 1, i);
            }
        })(0, 0);
        return results;
    }

    getArrayOfOptions() {
        let options = [];

        // HACK this is just the absolute worst
        for (let i = 1; i <= 4; i++) {
            if (this.state[`product${i}Weight`] !== 0) {
                options.push({
                    weight: this.state[`product${i}Weight`],
                    thc: this.state[`product${i}THC`],
                    cbd: this.state[`product${i}CBD`],
                });
            }
        }

        return options;
    }

    getCombos() {
        let combinations = this.combRep(this.getArrayOfOptions(), this.state.maxElements);
        const distance = (a, t) => Math.abs(t - a);

        let noZeroAmts = combinations
            .map(option => option.filter(details => details.weight > 0))
            .filter(combination => combination.length > 0);

        return noZeroAmts
            .map(combo => ({
                combination: combo.filter(constituent => constituent.weight > 0),
                thc: defaultRound(
                    combo.reduce((accum, curr) => accum + curr.thc * curr.weight, 0) /
                        combo.reduce((accum, curr) => accum + curr.weight, 0)
                ),
                cbd: defaultRound(
                    combo.reduce((accum, curr) => accum + curr.cbd * curr.weight, 0) /
                        combo.reduce((accum, curr) => accum + curr.weight, 0)
                ),
                cbdRatio: defaultRound(
                    combo.reduce((accum, curr) => accum + curr.cbd * curr.weight, 0) /
                        combo.reduce((accum, curr) => accum + curr.thc * curr.weight, 0) || 0
                ),
            }))
            .filter(combo => combo.thc >= this.state.minThc)
            .sort(
                (a, b) => {
                    let ratioDistance = distance(a.cbdRatio, this.state.cbdRatio) - distance(b.cbdRatio, this.state.cbdRatio);
                    if (ratioDistance == 0) {
                        return a.combination.length - b.combination.length;
                    }

                    return ratioDistance;
                })
            .slice(0, 5);
    }

    renderCombos() {
        let combos = this.getCombos();
        if (combos.length == 0) {
            return <h2>Can&apos;t make that blend!</h2>;
        }

        return combos.map(combo => (
            <li key={newId()}>
                1THC:{combo.cbdRatio}CBD ({combo.thc}% THC, {combo.cbd}% CBD)<ul>
                    {combo.combination.map(comboEntry => (
                        <li key={newId()}>
                            {comboEntry.weight}g {comboEntry.thc}% THC, {comboEntry.cbd}% CBD
                        </li>
                    ))}
                </ul>
            </li>
        ));
    }

    render() {
        return (
            <div className="container">
                <h5>Salad Generator</h5>
                <p>Determine the blend of options most closely approximating the desired ratio.</p>
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="1 THC to"
                            onChange={val => this.setState({ cbdRatio: Number(val) })}
                            number={this.state.cbdRatio}
                            unit="CBD"
                        />
                        <FixedUnitInput
                            inputLabel="Max Elements"
                            onChange={val => this.setState({ maxElements: Number(val) })}
                            number={this.state.maxElements}
                            unit=""
                        />
                        <FixedUnitInput
                            inputLabel="Min. THC"
                            onChange={val => this.setState({ minThc: Number(val) })}
                            number={this.state.minThc}
                            unit="%"
                        />
                        <hr />
                        <FixedUnitInput
                            inputLabel="Product 1"
                            onChange={val => this.setState({ product1Weight: Number(val) })}
                            number={this.state.product1Weight}
                            unit="g"
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product1THC: Number(val) })}
                            number={this.state.product1THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product1CBD: Number(val) })}
                            number={this.state.product1CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <FixedUnitInput
                            inputLabel="Product 2"
                            onChange={val => this.setState({ product2Weight: Number(val) })}
                            number={this.state.product2Weight}
                            unit="g"
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product2THC: Number(val) })}
                            number={this.state.product2THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product2CBD: Number(val) })}
                            number={this.state.product2CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <FixedUnitInput
                            inputLabel="Product 3"
                            onChange={val => this.setState({ product3Weight: Number(val) })}
                            number={this.state.product3Weight}
                            unit="g"
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product3THC: Number(val) })}
                            number={this.state.product3THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product3CBD: Number(val) })}
                            number={this.state.product3CBD}
                            unit="% CBD"
                            noColon={true}
                        />

                        <FixedUnitInput
                            inputLabel="Product 4"
                            onChange={val => this.setState({ product4Weight: Number(val) })}
                            number={this.state.product4Weight}
                            unit="g"
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product4THC: Number(val) })}
                            number={this.state.product4THC}
                            unit="% THC"
                            noColon={true}
                        />
                        <FixedUnitInput
                            inputLabel=""
                            onChange={val => this.setState({ product4CBD: Number(val) })}
                            number={this.state.product4CBD}
                            unit="% CBD"
                            noColon={true}
                        />
                    </div>
                    <div className="col-sm">{this.renderCombos()}</div>
                </div>
            </div>
        );
    }
}
