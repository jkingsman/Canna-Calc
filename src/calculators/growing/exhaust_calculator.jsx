import React from 'react';

import {GenericInput, FixedUnitInput, FixedUnitOutput} from 'app/calculators/components/io';
import ConversionFactors from 'app/utils/conversion_factors';
import {defaultRound} from 'app/utils/math';

export default class ExhaustCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growSpaceWidthFt: 10,
            growSpaceLengthFt: 10,
            growSpaceHeightFt: 8,
            fanCount: 2,
            exchangeTime: 3
        }

        this.setWidth = this.setWidth.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.setFanCount = this.setFanCount.bind(this);
        this.setExchangeTime = this.setExchangeTime.bind(this);
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

    setFanCount(fanCount) {
        this.setState({fanCount: Number(fanCount)});
    }

    setExchangeTime(exchangeTime) {
        this.setState({exchangeTime: Number(exchangeTime)});
    }

    getRoomVolume() {
        return (this.state.growSpaceWidthFt * this.state.growSpaceLengthFt * this.state.growSpaceHeightFt);
    }

    getFlowRate() {
        return this.getRoomVolume() / this.state.exchangeTime;
    }

    getSingleFanFlow() {
        return this.getFlowRate() / this.state.fanCount;
    }

    render() {
        return (
            <div>
                <p>Note that this is for pure airflow; this does not account for pressure lost due to bends in ducting, dust, etc. which is highly duct- and layout-specific.</p>
                <div className="row">
                    <div className="col-sm">
                        <GenericInput inputLabel="Room Width" onChange={this.setWidth} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceWidthFt}/>
                        <GenericInput inputLabel="Room Length" onChange={this.setLength} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceLengthFt}/>
                        <GenericInput inputLabel="Room Height" onChange={this.setHeight} conversionFactors={ConversionFactors.basicDistance} number={this.state.growSpaceHeightFt}/>
                        <FixedUnitInput inputLabel="Fan Count" onChange={this.setFanCount} number={this.state.fanCount} unit="fans"/>
                        <FixedUnitInput inputLabel="Exchange Time" onChange={this.setExchangeTime} number={this.state.exchangeTime} unit="minutes to total air flush"/>
                    </div>
                    <div className="col-sm">
                        <FixedUnitOutput outputLabel="Room Volume" number={defaultRound(this.getRoomVolume())} unit="ft³"/>
                        <FixedUnitOutput outputLabel="Min. Total Flow" number={defaultRound(this.getFlowRate())} unit="CFM (ft³/min)"/>
                        <FixedUnitOutput outputLabel="Min. Fan Flow Each" number={defaultRound(this.getSingleFanFlow())} unit="CFM (ft³/min)"/>
                    </div>
                </div>
            </div>
        );
    }
}
