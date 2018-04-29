import React from 'react';

import {FixedUnitInput, GenericInput, FixedUnitOutput, GenericOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class ExtractionEfficiency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedWeight: 500,
            feedTHCPercentage: 25,
            extractWeight: 96,
            extractTHCPercentage: 85
        }

        this.setFeedWeight = this.setFeedWeight.bind(this);
        this.setFeedTHCPercentage = this.setFeedTHCPercentage.bind(this);
        this.setExtractWeight = this.setExtractWeight.bind(this);
        this.setExtractTHCPercentage = this.setExtractTHCPercentage.bind(this);
    }

    setFeedWeight(feedWeight) {
        this.setState({feedWeight: Number(feedWeight)});
    }

    setFeedTHCPercentage(feedTHCPercentage) {
        this.setState({feedTHCPercentage: Number(feedTHCPercentage)});
    }

    setExtractWeight(extractWeight) {
        this.setState({extractWeight: Number(extractWeight)});
    }

    setExtractTHCPercentage(extractTHCPercentage) {
        this.setState({extractTHCPercentage: Number(extractTHCPercentage)});
    }

    getYield() {
        return (this.state.extractWeight / this.state.feedWeight) * 100;
    }

    getFeedTHC() {
        return (this.state.feedTHCPercentage / 100) * this.state.feedWeight;
    }

    getExtractTHC() {
        return (this.state.extractTHCPercentage / 100) * this.state.extractWeight;
    }

    getEfficiency() {
        return (this.getExtractTHC() / this.getFeedTHC()) * 100;
    }

    render() {
        return (
            <div className="container">
                <p>When making extracts, the efficiency of the process (how much extract is produced per unit of feedstock) is important, but far overshadowed by extraction efficiency -- how much of the THC present in the feedstock makes it into the extract. For example, a process may produce less extract but contain a higher concentration of THC than a different process since it pulls more THC and less waste (chlorophyll, etc.) from the plant. Extraction efficiency determines the percentage of THC extracted, producing a more reliable metric for evaluating extraction processes.</p>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Feedstock Weight" onChange={this.setFeedWeight} conversionFactors={ConversionFactors.weight} number={this.state.feedWeight}/>
                        <FixedUnitInput inputLabel="Feedstock THC Content" onChange={this.setFeedTHCPercentage} number={this.state.feedTHCPercentage} unit="%"/>
                        <GenericInput inputLabel="Extract Quantity" onChange={this.setExtractWeight} conversionFactors={ConversionFactors.weight} number={this.state.extractWeight}/>
                        <FixedUnitInput inputLabel="Extract THC Content" onChange={this.setExtractTHCPercentage} number={this.state.extractTHCPercentage} unit="%"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Weight Yield" number={defaultRound(this.getYield())} unit="%"/>
                        <GenericOutput outputLabel="Total Feedstock THC" number={defaultRound(this.getFeedTHC())} conversionFactors={ConversionFactors.weight} showSplitter={false}/>
                        <GenericOutput outputLabel="Total Extract THC" number={defaultRound(this.getExtractTHC())} conversionFactors={ConversionFactors.weight} showSplitter={false}/>
                        <FixedUnitOutput outputLabel="Extraction Efficiency" number={defaultRound(this.getEfficiency())} unit="%"/>
                    </div>
                </div>
            </div>
        );
    }
}
