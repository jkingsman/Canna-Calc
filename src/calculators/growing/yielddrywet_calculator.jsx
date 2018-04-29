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
        }

        this.setMin = this.setMin.bind(this);
        this.setAvg = this.setAvg.bind(this);
        this.setMax = this.setMax.bind(this);
        this.setPlantCount = this.setPlantCount.bind(this);
        this.setDryingLossPercentage = this.setDryingLossPercentage.bind(this);
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

    setDryingLossPercentage(dryingLossPercentage) {
        this.setState({dryingLossPercentage: Number(dryingLossPercentage)});
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
                        <GenericInput inputLabel="Min Wet Yield/Plant" onChange={this.setMin} conversionFactors={ConversionFactors.basicWeight} number={this.state.minOz}/>
                        <GenericInput inputLabel="Avg Wet Yield/Plant" onChange={this.setAvg} conversionFactors={ConversionFactors.basicWeight} number={this.state.avgOz}/>
                        <GenericInput inputLabel="Max Wet Yield/Plant" onChange={this.setMax} conversionFactors={ConversionFactors.basicWeight} number={this.state.maxOz}/>
                        <FixedUnitInput inputLabel="Plant Count" onChange={this.setPlantCount} number={this.state.plantCount} unit="plants"/>
                        <FixedUnitInput inputLabel="Drying Loss*" onChange={this.setDryingLossPercentage} number={this.state.dryingLossPercentage} unit="%"/>
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
