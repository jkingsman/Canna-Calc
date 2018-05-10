import React from "react";

import {
    FreeInput,
    FixedUnitInput,
    GenericInput,
    GenericOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";

export default class SoilRatioScaling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medium1: "Peat Soil",
            medium1Amt: 0.5,
            medium2: "Perlite",
            medium2Amt: 0.25,
            medium3: "Worm Castings",
            medium3Amt: 0.1,
            medium4: "Bat Guano",
            medium4Amt: 0.1,
            medium5: "Bone Meal",
            medium5Amt: 0.1,
            potCount: 25,
            potSize: 3,
        };
    }

    getPercentage() {
        const totalAmount =
            this.state.medium1Amt +
            this.state.medium2Amt +
            this.state.medium3Amt +
            this.state.medium4Amt +
            this.state.medium5Amt;

        return [
            this.state.medium1Amt / totalAmount,
            this.state.medium2Amt / totalAmount,
            this.state.medium3Amt / totalAmount,
            this.state.medium4Amt / totalAmount,
            this.state.medium5Amt / totalAmount,
        ];
    }

    getTotalSoil() {
        return this.state.potCount * this.state.potSize;
    }

    render() {
        return (
            <div className="container">
                <p>
                    Given certain ratios of soil mix, scale up to provide total amounts for the
                    number of pots (whatever the total of given constituents is will be considered
                    the full blend). For example, you can enter your amounts for a three gallon pot
                    and be provided with the amounts needed to fill the number of new pot sizes with
                    the given proportions. Just enter zero for any soil settings you don&#39;t need
                    to use.
                </p>
                <EquationBlock
                    equations={[
                        "Total = (Amt. per Pot / Sum(Amts. per Pots)) * (Pot Count * Pot Size)",
                    ]}
                />
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
                        <GenericInput
                            inputLabel="Pot Size"
                            onChange={val => this.setState({ potSize: Number(val) })}
                            conversionFactors={ConversionFactors.basicVolume}
                            number={this.state.potSize}
                        />
                    </div>
                    <div className="col-sm">
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium1}`}
                            number={this.getPercentage()[0] * this.getTotalSoil()}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium2}`}
                            number={this.getPercentage()[1] * this.getTotalSoil()}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium3}`}
                            number={this.getPercentage()[2] * this.getTotalSoil()}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium4}`}
                            number={this.getPercentage()[3] * this.getTotalSoil()}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel={`Total ${this.state.medium5}`}
                            number={this.getPercentage()[4] * this.getTotalSoil()}
                            conversionFactors={ConversionFactors.basicVolume}
                            showSplitter={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
