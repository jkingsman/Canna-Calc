import React from 'react';

import {GenericInput, FixedUnitInput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class CO2Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            ambientPPM: 300,
            desiredPPM: 1500,
            timeOnMins: 15
        }

        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    setWidth(growSpaceWidthFt) {
        this.setState({growSpaceWidthFt: growSpaceWidthFt});
    }

    setLength(growSpaceLengthFt) {
        this.setState({growSpaceLengthFt: growSpaceLengthFt});
    }

    setHeight(growSpaceHeightFt) {
        this.setState({growSpaceHeightFt: growSpaceHeightFt});
    }

    setAmbientPPM(ambientPPM) {
        this.setState({ambientPPM: ambientPPM});
    }

    setDesiredPPM(desiredPPM) {
        this.setState({desiredPPM: desiredPPM});
    }

    setTimeOnMins(timeOnMins) {
        this.setState({timeOnMins: timeOnMins});
    }

    getRoomVolume() {
        return this.state.growSpaceWidthFt * this.state.growSpaceLengthFt * this.state.growSpaceHeightFt;
    }

    render() {
        return (
            <div className="container">
                <p>Sane presets for lumens and wattage have been set for you. Although lumens are a more precise measure of actual light ouput, watts have become a de facto standard -- when in doubt, use watts and disregard lumens.</p>
                <GenericInput inputLabel={'Room Width'} onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                <GenericInput inputLabel={'Room Length'} onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                <GenericInput inputLabel={'Room Height'} onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                <FixedUnitInput inputLabel={'Ambient CO₂'} onChange={this.setAmbientPPM} number={this.state.ambientPPM} unit="ppm"/>
                <FixedUnitInput inputLabel={'Desired CO₂'} onChange={this.setDesiredPPM} number={this.state.desiredPPM} unit="ppm"/>
                <FixedUnitInput inputLabel={'Time on'} onChange={this.setTimeOnMins} number={this.state.timeOnMins} unit="minutes per hour"/>
            </div>
        );
    }
}
