import React from 'react';

import {FixedUnitInput, GenericInput, GenericOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class YieldCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minOz: 1.5,
            avgOz: 2.25,
            maxOz: 3.5,
            plantCount: 10,
        };
    }

    getYield() {
        return [
            this.state.minOz * this.state.plantCount,
            this.state.avgOz * this.state.plantCount,
            this.state.maxOz * this.state.plantCount
        ];
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Min Yield/Plant" onChange={(val) => this.setState({minOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.minOz}/>
                        <GenericInput inputLabel="Avg Yield/Plant" onChange={(val) => this.setState({avgOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.avgOz}/>
                        <GenericInput inputLabel="Max Yield/Plant" onChange={(val) => this.setState({maxOz: Number(val)})} conversionFactors={ConversionFactors.basicWeight} number={this.state.maxOz}/>
                        <FixedUnitInput inputLabel="Plant Count" onChange={(val) => this.setState({plantCount: Number(val)})} number={this.state.plantCount} unit="plants"/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel="Min Yield" number={this.getYield()[0]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Avg Yield" number={this.getYield()[1]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel="Max Yield" number={this.getYield()[2]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                    </div>
                </div>
            </div>
        );
    }
}
