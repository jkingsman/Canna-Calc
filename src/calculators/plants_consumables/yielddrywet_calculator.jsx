import React from 'react';

import {FixedUnitInput, GenericInput, GenericOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class YieldDryWetCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minOz: 1.5,
            avgOz: 2.25,
            maxOz: 3.5,
            plantCount: 10,
            dryingLossPercentage: 65,
        };
    }

    getYield() {
        return [
            (this.state.minOz * this.state.plantCount) * (1 - (this.state.dryingLossPercentage / 100)),
            (this.state.avgOz * this.state.plantCount) * (1 - (this.state.dryingLossPercentage / 100)),
            (this.state.maxOz * this.state.plantCount) * (1 - (this.state.dryingLossPercentage / 100)),
        ];
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Min Wet Yield/Plant" onChange={(val) => this.setState({minOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.minOz}/>
                        <GenericInput inputLabel="Avg Wet Yield/Plant" onChange={(val) => this.setState({avgOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.avgOz}/>
                        <GenericInput inputLabel="Max Wet Yield/Plant" onChange={(val) => this.setState({maxOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.maxOz}/>
                        <FixedUnitInput inputLabel="Plant Count" onChange={(val) => this.setState({plantCount: Number(val)})} number={this.state.plantCount} unit="plants"/>
                        <FixedUnitInput inputLabel="Drying Loss*" onChange={(val) => this.setState({dryingLossPercentage: Number(val)})} number={this.state.dryingLossPercentage} unit="%"/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel="Min Yield" number={this.getYield()[0]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Avg Yield" number={this.getYield()[1]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Max Yield" number={this.getYield()[2]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                    </div>
                </div>
                <i>*This percentage is the amount of dry plant matter compared to wet -- e.g. 30 grams dry from 100 grams wet would mean a 70% Drying Loss. Use our Percentage Change calculator to input expected dry and wet values to arrive at this number</i>
            </div>
        );
    }
}
