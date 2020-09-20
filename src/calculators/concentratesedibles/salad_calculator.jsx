import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    GenericOutput,
    FixedUnitOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class Salad extends React.Component {
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
                <h5>Fixed Input</h5>
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
                    </div>
                </div>
            </div>
        );
    }
}
