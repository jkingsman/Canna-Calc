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

        }

        this.setMin = this.setMin.bind(this);
        this.setAvg = this.setAvg.bind(this);
        this.setMax = this.setMax.bind(this);
        this.setPlantCount = this.setPlantCount.bind(this);
    }

    setMin(minOz) {
        this.setState({minOz: Number(minOz)});
    }

    setAvg(avgOz) {
        this.setState({avgOz: Number(avgOz)});
    }

    setMax(maxOz) {
        this.setState({maxOz: Number(maxOz)});
    }

    setPlantCount(plantCount) {
        this.setState({plantCount: Number(plantCount)});
    }

    setHoursOnPerDay(hoursOnPerDay) {
        this.setState({hoursOnPerDay: Number(hoursOnPerDay)});
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
                        <GenericInput inputLabel={'Min Yield/Plant'} onChange={this.setMin} conversionFactors={ConversionFactors.basicWeight} number={this.state.minOz}/>
                        <GenericInput inputLabel={'Avg Yield/Plant'} onChange={this.setAvg} conversionFactors={ConversionFactors.basicWeight} number={this.state.avgOz}/>
                        <GenericInput inputLabel={'Max Yield/Plant'} onChange={this.setMax} conversionFactors={ConversionFactors.basicWeight} number={this.state.maxOz}/>
                        <FixedUnitInput inputLabel={'Plant Count'} onChange={this.setPlantCount} number={this.state.plantCount} unit="plants"/>
                    </div>
                    <div className="col-sm">
                        <GenericOutput outputLabel={`Min Yield`} number={this.getYield()[0]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel={`Avg Yield`} number={this.getYield()[1]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                        <GenericOutput outputLabel={`Max Yield`} number={this.getYield()[2]} conversionFactors={ConversionFactors.basicWeight} showSplitter={false}/>
                    </div>
                </div>
            </div>
        );
    }
}
