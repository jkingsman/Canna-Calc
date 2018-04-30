import React from 'react';

import {GenericInput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class PlantCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 17,
            growSpaceLengthFt: 8,
            plantWidthFt: 3,
            plantLengthFt: 2,
        }

        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setplantWidthFt = this.setplantWidthFt.bind(this);
        this.setplantLengthFt = this.setplantLengthFt.bind(this);
    }

    setWidth(growSpaceWidthFt) {
        this.setState({growSpaceWidthFt: Number(growSpaceWidthFt)});
    }

    setLength(growSpaceLengthFt) {
        this.setState({growSpaceLengthFt: Number(growSpaceLengthFt)});
    }

    setplantWidthFt(plantWidthFt) {
        this.setState({plantWidthFt: Number(plantWidthFt)});
    }

    setplantLengthFt(plantLengthFt) {
        this.setState({plantLengthFt: Number(plantLengthFt)});
    }

    getPlantLayout() {
        const stdWCount = Math.floor(this.state.growSpaceWidthFt / this.state.plantWidthFt);
        const stdLCount = Math.floor(this.state.growSpaceLengthFt / this.state.plantLengthFt);

        const swapWCount = Math.floor(this.state.growSpaceWidthFt / this.state.plantLengthFt);
        const swapLCount = Math.floor(this.state.growSpaceLengthFt / this.state.plantWidthFt);

        if (stdWCount * stdLCount > swapWCount * swapLCount) {
            return [stdWCount, stdLCount];
        } else {
            return [swapLCount, swapWCount];
        }
    }

    getWastedSpace() {
        const usedSpace = (this.getPlantLayout()[0] * this.getPlantLayout()[1]) * (this.state.plantWidthFt * this.state.plantLengthFt);
        const totalSpace = this.state.growSpaceLengthFt * this.state.growSpaceWidthFt;
        return totalSpace - usedSpace;
    }

    render() {
        return (
            <div>
                <p>This calculator works best with square or near-square plants. For non-square plants, it may be possible to place additional plants in the leftover space.</p>
                <hr/>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Grow Space Width" onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel="Grow Space Length" onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                        <GenericInput inputLabel="Plant Width*" onChange={this.setplantLengthFt} conversionFactors={ConversionFactors.basicDistance} number={this.state.plantLengthFt}/>
                        <GenericInput inputLabel="Plant Length*" onChange={this.setplantWidthFt} conversionFactors={ConversionFactors.basicDistance} number={this.state.plantWidthFt}/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Total Area" number={this.state.growSpaceLengthFt * this.state.growSpaceWidthFt} unit="ft²"/>
                        <FixedUnitOutput outputLabel="Total Plants" number={this.getPlantLayout()[0] * this.getPlantLayout()[1]} unit="plants"/>
                        <FixedUnitOutput outputLabel="Grid Layout" number={this.getPlantLayout()[0]} unit="plants wide by"/>
                        <FixedUnitOutput noColon number={this.getPlantLayout()[1]} unit="plants long"/>
                        <FixedUnitOutput outputLabel="Wasted Space" number={this.getWastedSpace()} unit="ft²"/>
                    </div>
                </div>
                <i>*Remember to add the appropriate spacing between plants, which is counted as part of its size</i>
            </div>
        );
    }
}
