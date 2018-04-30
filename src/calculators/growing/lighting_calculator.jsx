import React from 'react';

import {GenericInput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class LightingCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lumensNeededSqFt: 8000,
            wattageNeededSqFt: 45,
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 8,
        }

        this.setLumens = this.setLumens.bind(this);
        this.setWatts = this.setWatts.bind(this);
        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
    }

    setLumens(lumensNeededSqFt) {
        this.setState({lumensNeededSqFt: Number(lumensNeededSqFt)});
    }

    setWatts(wattageNeededSqFt) {
        this.setState({wattageNeededSqFt: Number(wattageNeededSqFt)});
    }

    setWidth(growSpaceWidthFt) {
        this.setState({growSpaceWidthFt: Number(growSpaceWidthFt)});
    }

    setLength(growSpaceLengthFt) {
        this.setState({growSpaceLengthFt: Number(growSpaceLengthFt)});
    }

    getArea() {
        return this.state.growSpaceWidthFt * this.state.growSpaceLengthFt;
    }

    getLumensNeeded() {
        const lumensNeeded = this.getArea() * this.state.lumensNeededSqFt;
        return Math.round(lumensNeeded);
    }

    getWattsNeeded() {
        const wattsNeeded = this.getArea() * this.state.wattageNeededSqFt;
        return Math.round(wattsNeeded);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Lumens*" onChange={this.setLumens} conversionFactors={ConversionFactors.basicArea} number={this.state.lumensNeededSqFt} per/>
                        <GenericInput inputLabel="Watts" onChange={this.setWatts} conversionFactors={ConversionFactors.basicArea} number={this.state.wattageNeededSqFt} per/>
                        <GenericInput inputLabel="Grow Area Width" onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel="Grow Area Length" onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Illumination Needed" number={this.getLumensNeeded()} unit="lumens"/>
                        <FixedUnitOutput outputLabel="Watts Needed" number={this.getWattsNeeded()} unit="watts"/>
                    </div>
                    <i>*Although lumens are a more precise measure of actual light ouput, watts have become a de facto standard -- when in doubt, use watts and disregard lumens.</i>
                </div>
            </div>
        );
    }
}
