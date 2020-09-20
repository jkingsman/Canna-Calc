import React from "react";

import {
    FreeInput,
    FixedUnitInput,
    GenericInput,
    GenericOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";

export default class SoilCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medium1: "Peat Soil",
            medium1Amt: 0.5,
            medium2: "Perlite",
            medium2Amt: 0.25,
            medium3: "",
            medium3Amt: 0,
            medium4: "",
            medium4Amt: 0,
            medium5: "",
            medium5Amt: 0,
            potCount: 25,
        };
    }

    getAmounts() {
        return [
            this.state.medium1Amt * this.state.potCount,
            this.state.medium2Amt * this.state.potCount,
            this.state.medium3Amt * this.state.potCount,
            this.state.medium4Amt * this.state.potCount,
            this.state.medium5Amt * this.state.potCount,
        ];
    }

    render() {
        return (
            <div className="container">
                <p>
                    Determine soil and soil amendment amounts, scaled up per-pot. Just enter zero
                    for any soil settings you don&#39;t need to use.
                </p>
                <EquationBlock equations={["Total = Amt. per Pot * Pot Count"]} />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <FreeInput
                            inputLabel="Soil 1 Name"
                            onChange={val => this.setState({ medium1: val })}
                            val={this.state.medium1}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Soil 1 Amt./Pot"
                            onChange={val => this.setState({ medium1Amt: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.medium1Amt}
                        />
                        <FreeInput
                            inputLabel="Soil 2 Name"
                            onChange={val => this.setState({ medium2: val })}
                            val={this.state.medium2}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Soil 2 Amt./Pot"
                            onChange={val => this.setState({ medium2Amt: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.medium2Amt}
                        />
                        <FreeInput
                            inputLabel="Soil 3 Name"
                            onChange={val => this.setState({ medium3: val })}
                            val={this.state.medium3}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Soil 3 Amt./Pot"
                            onChange={val => this.setState({ medium3Amt: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.medium3Amt}
                        />
                        <FreeInput
                            inputLabel="Soil 4 Name"
                            onChange={val => this.setState({ medium4: val })}
                            val={this.state.medium4}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Soil 4 Amt./Pot"
                            onChange={val => this.setState({ medium4Amt: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.medium4Amt}
                        />
                        <FreeInput
                            inputLabel="Soil 5 Name"
                            onChange={val => this.setState({ medium5: val })}
                            val={this.state.medium5}
                            unit=""
                        />
                        <GenericInput
                            inputLabel="Soil 5 Amt./Pot"
                            onChange={val => this.setState({ medium5Amt: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.medium5Amt}
                        />
                        <FixedUnitInput
                            inputLabel="Pot Count"
                            onChange={val => this.setState({ potCount: Number(val) })}
                            number={this.state.potCount}
                            unit="pots"
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium1}`}
                            number={this.getAmounts()[0]}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                            shouldHide={this.state.medium1.length == 0}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium2}`}
                            number={this.getAmounts()[1]}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                            shouldHide={this.state.medium2.length == 0}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium3}`}
                            number={this.getAmounts()[2]}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                            shouldHide={this.state.medium3.length == 0}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium4}`}
                            number={this.getAmounts()[3]}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                            shouldHide={this.state.medium4.length == 0}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium5}`}
                            number={this.getAmounts()[4]}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                            shouldHide={this.state.medium5.length == 0}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
