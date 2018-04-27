import React from 'react';

import {GenericInput, FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class CO2Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            volumeReductionFt3: 0,
            ambientPPM: 400,
            desiredPPM: 1500,
            minutesOn: 15
        }

        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.setVolumeReduction = this.setVolumeReduction.bind(this);
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

    setVolumeReduction(volumeReductionFt3) {
        this.setState({volumeReductionFt3: Number(volumeReductionFt3)});
    }

    getTimeOnFraction() {
        return this.state.minutesOn / 60;
    }

    getRoomVolume() {
        return (this.state.growSpaceWidthFt * this.state.growSpaceLengthFt * this.state.growSpaceHeightFt) - this.state.volumeReductionFt3;
    }

    getAddtlPPM() {
        return this.state.desiredPPM - this.state.ambientPPM;
    }

    getFt3HrFlowRate() {
        return (this.getAddtlPPM() * 1e-6) * this.getRoomVolume();
    }

    getTimedFtHrFlowRate() {
        return this.getFt3HrFlowRate() / this.getTimeOnFraction();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel={'Room Width'} onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel={'Room Length'} onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                        <GenericInput inputLabel={'Room Height'} onChange={this.setHeight} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceHeightFt}/>
                        <FixedUnitInput inputLabel={'Ambient CO₂'} onChange={this.setAmbientPPM} number={this.state.ambientPPM} unit="ppm"/>
                        <FixedUnitInput inputLabel={'Desired CO₂'} onChange={this.setDesiredPPM} number={this.state.desiredPPM} unit="ppm"/>
                        <FixedUnitInput inputLabel={'Minutes On'} onChange={this.setMinutesOn} number={this.state.minutesOn} unit="per hour"/>
                        <GenericInput inputLabel={'Volume Reduction*'} onChange={this.setVolumeReduction} conversionFactors={ConversionFactors.basicVolume} number={this.state.volumeReductionFt3}/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Room Volume" number={defaultRound(this.getRoomVolume())} unit="ft³"/>
                        <FixedUnitOutput outputLabel="Desired Addtl. CO₂" number={defaultRound(this.getAddtlPPM())} unit="ppm"/>
                        <FixedUnitOutput outputLabel="CO₂ Flow Rate" number={defaultRound(this.getTimedFtHrFlowRate())} unit="SCFH (ft³/hr)"/>
                        <FixedUnitOutput noColon number={defaultRound(this.getTimedFtHrFlowRate() / 60)} unit="SCFM (ft³/min)"/>
                    </div>
                </div>
                <i>*Room volume does not account for space taken by ducting, fans, plant holders, etc. -- enter approximate volume consumed by objects in room here increase volume accuracy. For ducting, use the Cylinder Volume calculator with length of ducting as cylinder height.</i>
            </div>
        );
    }
}
