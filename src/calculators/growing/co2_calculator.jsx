import React from 'react';

import {GenericInput, FixedUnitInput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class CO2Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            ambientPPM: 400,
            desiredPPM: 1500,
            minutesOn: 15,
        }

        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.setAmbientPPM = this.setAmbientPPM.bind(this);
        this.setDesiredPPM = this.setDesiredPPM.bind(this);
        this.setMinutesOn = this.setMinutesOn.bind(this);
    }

    setWidth(growSpaceWidthFt) {
        this.setState({growSpaceWidthFt: Number(growSpaceWidthFt)});
    }

    setLength(growSpaceLengthFt) {
        this.setState({growSpaceLengthFt: Number(growSpaceLengthFt)});
    }

    setHeight(growSpaceHeightFt) {
        this.setState({growSpaceHeightFt: Number(growSpaceHeightFt)});
    }

    setAmbientPPM(ambientPPM) {
        this.setState({ambientPPM: Number(ambientPPM)});
    }

    setDesiredPPM(desiredPPM) {
        this.setState({desiredPPM: Number(desiredPPM)});
    }

    setMinutesOn(minutesOn) {
        this.setState({minutesOn: Number(minutesOn)});
    }

    getTimeOnFraction() {
        return this.state.minutesOn / 60;
    }

    getRoomVolume() {
        return this.state.growSpaceWidthFt * this.state.growSpaceLengthFt * this.state.growSpaceHeightFt;
    }

    getAddltPPM() {
        return this.state.desiredPPM - this.state.ambientPPM;
    }

    getFt3HrFlowRate() {
        return (this.getAddltPPM() * 1e-6) * this.getRoomVolume();
    }

    getTimedFtHrFlowRate() {
        return this.getFt3HrFlowRate() / this.getTimeOnFraction();
    }

    render() {
        return (
            <div>
                <p>Sane presets for ambient and target levels have been preset.</p>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel={'Room Width'} onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel={'Room Length'} onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                        <GenericInput inputLabel={'Room Height'} onChange={this.setHeight} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceHeightFt}/>
                        <FixedUnitInput inputLabel={'Ambient CO₂'} onChange={this.setAmbientPPM} number={this.state.ambientPPM} unit="ppm"/>
                        <FixedUnitInput inputLabel={'Desired CO₂'} onChange={this.setDesiredPPM} number={this.state.desiredPPM} unit="ppm"/>
                        <FixedUnitInput inputLabel={'Minutes On'} onChange={this.setMinutesOn} number={this.state.minutesOn} unit="per hour"/>
                    </div>
                    <div className="col-sm">
                        <div className='form-group'>
                            <label htmlFor="cubicFootage" className="text-label">Room Volume:&nbsp;</label>
                            <input type='number' value={this.getRoomVolume()} disabled className='calc-input-width' id="cubicFootage"/> ft³
                        </div>
                        <div className='form-group'>
                            <label htmlFor="co2Increase" className="text-label">Desired Addtl. CO₂:&nbsp;</label>
                            <input type='number' value={this.getAddltPPM()} disabled className='calc-input-width' id="co2Increase"/> ppm
                        </div>
                        <div className='form-group'>
                            <label htmlFor="flowRateHr" className="text-label">CO₂ Flow Rate:&nbsp;</label>
                            <input type='number' value={defaultRound(this.getTimedFtHrFlowRate())} disabled className='calc-input-width' id="flowRateHr"/> SCFH (ft³/hr)
                        </div>
                        <div className='form-group'>
                            <label htmlFor="flowRateMin" className="text-label"></label>
                            <input type='number' value={defaultRound(this.getTimedFtHrFlowRate() / 60)} disabled className='calc-input-width' id="flowRateMin"/> SCFM (ft³/min)
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
