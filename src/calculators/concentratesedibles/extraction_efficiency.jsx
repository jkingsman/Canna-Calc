import React from "react";

import {
    FixedUnitInput,
    GenericInput,
    FixedUnitOutput,
    GenericOutput,
    EquationBlock,
} from "app/calculators/components/io";
import ConversionFactors from "app/utils/conversion_factors";
import { defaultRound } from "app/utils/math";

export default class ExtractionEfficiency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedWeight: 500,
            feedTHCPercentage: 25,
            extractWeight: 96,
            extractTHCPercentage: 85,
        };
    }

    getYield() {
        return this.state.extractWeight / this.state.feedWeight * 100;
    }

    getFeedTHC() {
        return this.state.feedTHCPercentage / 100 * this.state.feedWeight;
    }

    getExtractTHC() {
        return this.state.extractTHCPercentage / 100 * this.state.extractWeight;
    }

    getEfficiency() {
        return this.getExtractTHC() / this.getFeedTHC() * 100;
    }

    render() {
        return (
            <div className="container">
                <p>
                    When making extracts, the efficiency of the process (how much extract is
                    produced per unit of feedstock) is important, but far overshadowed by extraction
                    efficiency -- how much of the THC present in the feedstock makes it into the
                    extract. For example, a process may produce less extract but contain a higher
                    concentration of THC than a different process since it pulls more THC and less
                    waste (chlorophyll, etc.) from the plant. Extraction efficiency determines the
                    percentage of THC extracted, producing a more reliable metric for evaluating
                    extraction processes.
                </p>
                <EquationBlock
                    equations={[
                        "Weight Yield = Extract Weight / Feedstock Weight",
                        "Total Feedstock THC = Feedstock THC Content * Feedstock Weight",
                        "Total Extract THC = Extract THC Content * Extract Weight",
                        "Extraction Efficiency = Total Extract THC / Total Feedstock THC",
                    ]}
                />
                <hr />
                <div className="row">
                    <div className="col-sm">
                        <GenericInput
                            inputLabel="Feedstock Weight"
                            onChange={val => this.setState({ feedWeight: Number(val) })}
                            conversionFactors={ConversionFactors.weight}
                            number={this.state.feedWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Feedstock THC Content"
                            onChange={val =>
                                this.setState({
                                    feedTHCPercentage: Number(val),
                                })
                            }
                            number={this.state.feedTHCPercentage}
                            unit="%"
                        />
                        <GenericInput
                            inputLabel="Extract Weight"
                            onChange={val => this.setState({ extractWeight: Number(val) })}
                            conversionFactors={ConversionFactors.weight}
                            number={this.state.extractWeight}
                        />
                        <FixedUnitInput
                            inputLabel="Extract THC Content"
                            onChange={val =>
                                this.setState({
                                    extractTHCPercentage: Number(val),
                                })
                            }
                            number={this.state.extractTHCPercentage}
                            unit="%"
                        />
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput
                            outputLabel="Weight Yield"
                            number={defaultRound(this.getYield())}
                            unit="%"
                        />
                        <GenericOutput
                            outputLabel="Total Feedstock THC"
                            number={defaultRound(this.getFeedTHC())}
                            conversionFactors={ConversionFactors.weight}
                            showSplitter={false}
                        />
                        <GenericOutput
                            outputLabel="Total Extract THC"
                            number={defaultRound(this.getExtractTHC())}
                            conversionFactors={ConversionFactors.weight}
                            showSplitter={false}
                        />
                        <FixedUnitOutput
                            outputLabel="Extraction Efficiency"
                            number={defaultRound(this.getEfficiency())}
                            unit="%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
