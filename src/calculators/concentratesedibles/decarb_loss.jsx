import React from "react";

import {
    GenericInput,
    FixedUnitInput,
    FixedUnitOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class DecarbLoss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalWeight: 25,
            productWeight: 10,
            productPotency: 21,
        };
    }

    getPostDecarbWeight(input) {
        const decarbConstant = 314.45 / 358.4733;
        return input * decarbConstant;
    }

    render() {
        return (
            <div className="container">
                <p>
                    When decarboxylating cannabis, the important reaction is the conversion of
                    tetrahydrocannabinolic acid (THCa) to tetrahydrocannabinol (THC), the actual
                    chemical that is psychoactive. Decarboxylation results in the loss of a carbon
                    dioxide, causing a drop in molecular weight (358.4733 g/mol - 314.45 g/mol =
                    44.0233 g/mol loss (~12.22% loss)). This calculator allows you to determine the
                    remaining THC after decarboxylation given pre-decarb THCa levels. Note that it
                    does not take into account the molar weight loss due to CBDA to CBD, CBGA to
                    CBG, etc. which are less typically accurately known for flower samples.
                </p>
                <EquationBlock
                    equations={[
                        "Post-Decarb THC Content = Product THCa Content * (314.45 / 358.4733)",
                    ]}
                />
                <hr />
                <h5>THCa Loss Only</h5>
                <div className="row">
                    <div className="col-sm">
                        <FixedUnitInput
                            inputLabel="Product THCa Content"
                            onChange={val => this.setState({ totalWeight: Number(val) })}
                            number={this.state.totalWeight}
                            unit="mg"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Post-Decarb THC Content"
                            number={defaultRound(this.getPostDecarbWeight(this.state.totalWeight))}
                            unit="mg/g"
                        />
                    </div>
                </div>
                <hr />
                <h5>Product-Based Loss</h5>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Product Amount"
                            onChange={val => this.setState({ productWeight: Number(val) })}
                            conversionFactors={ConversionFactors.basicWeight}
                            number={this.state.productWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Product THCa Percentage"
                            onChange={val => this.setState({ productPotency: Number(val) })}
                            number={this.state.productPotency}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Pre-Decarb THC"
                            number={defaultRound(
                                this.state.productWeight * this.state.productPotency * 10
                            )}
                            unit="mg"
                        />
                        <FixedUnitOutput
                            outputLabel="Post-Decarb THC"
                            number={defaultRound(
                                this.getPostDecarbWeight(
                                    this.state.productWeight * this.state.productPotency * 10
                                )
                            )}
                            unit="mg"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
