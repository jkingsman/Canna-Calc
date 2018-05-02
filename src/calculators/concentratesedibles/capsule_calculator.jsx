import React from 'react';

import {GenericInput, FixedUnitInput, GenericOutput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class CapsuleCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concentrateVol: 5.7,
            fillerVol: 150,
            containerVol: 30,
            testTHC: 50,
            testTHCa: 0.5,
            testDelta8THC: 0.03,
            testCBD: 2.5,
            testCBN: 5,
            testCBG: .11
        };
    }

    getCannabinoids() {
        const mlTHCInExtract = (this.state.testTHC / 100) * this.state.concentrateVol;
        const mlTHCaInExtract = (this.state.testTHCa / 100) * this.state.concentrateVol;
        const mlDelta8THCInExtract = (this.state.testDelta8THC / 100) * this.state.concentrateVol;
        const mlCBDInExtract = (this.state.testCBD / 100) * this.state.concentrateVol;
        const mlCBNInExtract = (this.state.testCBN / 100) * this.state.concentrateVol;
        const mlCBGInExtract = (this.state.testCBG / 100) * this.state.concentrateVol;

        const capsulePercentOfTotalMix = this.state.containerVol / (this.state.fillerVol + this.state.concentrateVol);
        return [
            mlTHCInExtract * capsulePercentOfTotalMix,
            mlTHCaInExtract * capsulePercentOfTotalMix,
            mlDelta8THCInExtract * capsulePercentOfTotalMix,
            mlCBDInExtract * capsulePercentOfTotalMix,
            mlCBNInExtract * capsulePercentOfTotalMix,
            mlCBGInExtract * capsulePercentOfTotalMix
        ];
    }

    render() {
        return (<div className="container">
            <p>Calculate capsule or cartridge cannabinoid based on laboratory analysis.</p>
            <hr/>
            <div className="row">
                <div className="col-sm">
                    <GenericInput inputLabel="Concentrate Vol.*" onChange={(val) => this.setState({concentrateVol: Number(val)})} conversionFactors={ConversionFactors.tinyVolume} number={this.state.concentrateVol}/>
                    <GenericInput inputLabel="Filler Vol." onChange={(val) => this.setState({fillerVol: Number(val)})} conversionFactors={ConversionFactors.tinyVolume} number={this.state.fillerVol}/>
                    <GenericInput inputLabel="Capsule/Cartridge Vol." onChange={(val) => this.setState({containerVol: Number(val)})} conversionFactors={ConversionFactors.tinyVolume} number={this.state.containerVol}/>
                    <h5>Extract Test Results</h5>
                    <FixedUnitInput inputLabel="THC" onChange={(val) => this.setState({testTHC: Number(val)})} number={this.state.testTHC} unit="%"/>
                    <FixedUnitInput inputLabel="THCa" onChange={(val) => this.setState({testTHCa: Number(val)})} number={this.state.testTHCa} unit="%"/>
                    <FixedUnitInput inputLabel="Δ-8 THC" onChange={(val) => this.setState({testDelta8THC: Number(val)})} number={this.state.testDelta8THC} unit="%"/>
                    <FixedUnitInput inputLabel="CBD" onChange={(val) => this.setState({testCBD: Number(val)})} number={this.state.testCBD} unit="%"/>
                    <FixedUnitInput inputLabel="CBN" onChange={(val) => this.setState({testCBN: Number(val)})} number={this.state.testCBN} unit="%"/>
                    <FixedUnitInput inputLabel="CBG" onChange={(val) => this.setState({testCBG: Number(val)})} number={this.state.testCBG} unit="%"/>
                </div>
                <div className="col-sm">
                    <GenericOutput outputLabel="Cap/Cart THC*" number={defaultRound(this.getCannabinoids()[0])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart THCa*" number={defaultRound(this.getCannabinoids()[1])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart Δ-8 THC*" number={defaultRound(this.getCannabinoids()[2])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart CBD*" number={defaultRound(this.getCannabinoids()[3])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart CBN*" number={defaultRound(this.getCannabinoids()[4])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart CBN*" number={defaultRound(this.getCannabinoids()[4])} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <GenericOutput outputLabel="Cap/Cart Cannabinoids*" number={defaultRound(this.getCannabinoids().reduce((accumulator, currentValue) => accumulator + currentValue))} conversionFactors={ConversionFactors.tinyVolume} showSplitter={false}/>
                    <FixedUnitOutput outputLabel="Caps/Carts Made" number={defaultRound((this.state.concentrateVol + this.state.fillerVol) / this.state.containerVol)} units="units"/>
                </div>
                <i>*1 mL ≈ 1 g for water, which can be used as an approximate conversion if exact volume is not known.</i>
            </div>
        </div>);
    }
}
