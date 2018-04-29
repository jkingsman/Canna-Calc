import React from 'react';

import {GenericInput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';

export default class PlantCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 20,
            growSpaceLengthFt: 10,
            plantWidthFt: 2.1,
            plantLengthFt: 2.1,
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

    getPlantsPerWidth() {
        return Math.floor(this.state.growSpaceWidthFt / this.state.plantWidthFt);
    }

    getPlantsPerLength() {
        return Math.floor(this.state.growSpaceLengthFt / this.state.plantLengthFt);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Grow Space Width" onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel="Grow Space Length" onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                        <GenericInput inputLabel="Plant Length*" onChange={this.setplantWidthFt} conversionFactors={ConversionFactors.basicDistance} number={this.state.plantWidthFt}/>
                        <GenericInput inputLabel="Plant Width*" onChange={this.setplantLengthFt} conversionFactors={ConversionFactors.basicDistance} number={this.state.plantLengthFt}/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Total Area" number={this.state.growSpaceLengthFt * this.state.growSpaceWidthFt} unit="ft²"/>
                        <FixedUnitOutput outputLabel="Total Plants" number={this.getPlantsPerWidth() * this.getPlantsPerLength()} unit="plants"/>
                        <FixedUnitOutput outputLabel="Grid Layout" number={this.getPlantsPerWidth()} unit="plants wide"/>
                        <FixedUnitOutput noColon number={this.getPlantsPerLength()} unit="plants long"/>
                    </div>
                </div>
                <i>*Remember to add the appropriate spacing between plants, which is counted as part of its size</i>
            </div>
        );
    }
}
